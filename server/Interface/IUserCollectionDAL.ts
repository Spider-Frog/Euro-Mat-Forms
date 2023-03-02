import {UserDTO} from "~/server/DTO/UserDTO";

export default interface IUserCollectionDAL {
  Create(userDTO: UserDTO): Promise<UserDTO>;
  Read(filter: object): Promise<UserDTO[]>;
  Get(id: string): Promise<UserDTO>;
  Delete(id: string);
}
