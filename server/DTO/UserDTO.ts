import {ObjectId} from "mongodb";

export type UserDTO = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  created_at?: number;
  last_modified?: number;
}
