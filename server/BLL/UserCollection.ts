import User from "~/server/BLL/User";
import IUserCollectionDAL from "~/server/Interface/IUserCollectionDAL";
import {UserDTO} from "~/server/DTO/UserDTO";
import IUserDAL from "~/server/Interface/IUserDAL";
import {UserCreateSchema} from "~/server/Schema/User";
import { z } from "zod";


export default class UserCollection {
  private DAL: IUserCollectionDAL;
  private DALUser: IUserDAL;

  constructor(dal: IUserCollectionDAL, dalUser: IUserDAL) {
    this.DAL = dal;
    this.DALUser = dalUser;
  }

  async Create(user: z.infer<typeof UserCreateSchema>): Promise<User> {
    const newUserDTO = await this.DAL.Create(user as UserDTO)

    const newUser = new User(this.DALUser);
    newUser.Load(newUserDTO);

    return newUser;
  }

  async Read(filter = {}): Promise<User[]> {
    const users = await this.DAL.Read(filter);
    const output = [] as User[]

    users.forEach(user => {
      const userObj = new User(this.DALUser)
      userObj.Load(user)

      output.push(userObj)
    })

    return output
  }

  async Get(id: string): Promise<User> {
    const user = await this.DAL.Get(id)

    if (!user) {
      return null
    }

    const userObj = new User(this.DALUser)
    userObj.Load(user)

    return userObj;
  }

  async Delete(id: string) {
    await this.DAL.Delete(id);
  }
}
