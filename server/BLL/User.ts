import {ObjectId} from "mongodb";
import IUserDAL from "~/server/Interface/IUserDAL";
import {UserDTO} from "~/server/DTO/UserDTO";
import {UserUpdateSchema, UserPasswordSchema} from "~/server/Schema/User";
import {z} from "zod";
import {checkPasswordHash} from "~/server/func";


export default class User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  created_at?: Date;
  last_modified?: Date;
  private DAL: IUserDAL;

  constructor(dal: IUserDAL, name: string, email: string, password: string, admin: boolean) {
    this.DAL = dal;
    this.name = name;
    this.email = email;
    this.password = password;
    this.admin = admin;
  }

  async Update(user: z.infer<typeof UserUpdateSchema>) {
    this.name = user.name;
    this.email = user.email;
    this.admin = user.admin;
    this.last_modified = new Date()

    await this.DAL.Update(this.ToDTO());
  }

  async ValidatePassword(password: string): Promise<boolean> {
    return await checkPasswordHash(password, this.password)
  }

  async UpdatePassword(password: z.infer<typeof UserPasswordSchema>) {
    if (!await this.ValidatePassword(password.oldPassword)) {
      throw Error("Password does not match.")
    }

    this.password = password.newPassword;

    await this.DAL.Update(this.ToDTO())
  }

  static Load(dal: IUserDAL, user: UserDTO): User {
    const newObj = new User(dal, user.name, user.email, user.password, user.admin);

    newObj.created_at = (user.created_at) ? new Date(user.created_at * 1000) : undefined;
    newObj.last_modified = (user.last_modified) ? new Date(user.last_modified * 1000) : undefined;

    return newObj;
  }

  ToDTO(): UserDTO {
    return {
      _id: new ObjectId(this._id),
      name: this.name,
      email: this.email,
      admin: this.admin,
      password: this.password,
      created_at: (this.created_at) ? Math.floor(this.created_at.getTime()/1000) : undefined,
      last_modified: (this.last_modified) ? Math.floor(this.last_modified.getTime()/1000) : undefined,
    } as UserDTO
  }

  Export(): object {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      admin: this.admin,
      created_at: this.created_at,
      last_modified: this.last_modified,
    }
  }

  ToJson(): object {
    return this.Export();
  }

  ToXml(): string {
    let Output = "";

    Object.keys(this.Export()).forEach(key => {

    })

    return Output
  }
}
