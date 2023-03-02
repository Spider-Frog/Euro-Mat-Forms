import {UserDTO} from "~/server/DTO/UserDTO";

export default interface IUserDAL {
  Update(userDTO: UserDTO): Promise<UserDTO>;
}
