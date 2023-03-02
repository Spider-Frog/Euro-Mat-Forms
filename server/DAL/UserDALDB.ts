import IUserCollectionDAL from "~/server/Interface/IUserCollectionDAL";
import IUserDAL from "~/server/Interface/IUserDAL";
import {UserDTO} from "~/server/DTO/UserDTO";
import MongoDALDB from "~/server/DAL/MongoDALDB";
import {ObjectId} from "mongodb";
import {generatePasswordHash} from "~/server/func";

export default class UserDALDB extends MongoDALDB implements IUserCollectionDAL, IUserDAL {
  collectionName = 'user'

  async Create(userDTO: UserDTO): Promise<UserDTO> {
    userDTO.created_at = Math.floor(Date.now()/1000);
    userDTO.last_modified = Math.floor(Date.now()/1000);
    userDTO.password = await generatePasswordHash(userDTO.password);

    await this.connect();
    const result = await this.collection.insertOne(userDTO);
    await this.close();

    return await this.Get(result.insertedId.toString());
  };

  async Read(filter = {}): Promise<UserDTO[]> {
    await this.connect()
    const result = await this.collection.find(filter).toArray() as UserDTO[]
    await this.close();
    return result;
  }

  async Get(id: string): Promise<UserDTO> {
    await this.connect()
    const result = await this.collection.findOne({_id: new ObjectId(id)}) as UserDTO;
    await this.close();
    return result;
  }

  async Delete(id: string): Promise<void> {
    await this.connect();
    await this.collection.deleteOne({_id: new ObjectId(id)});
    await this.close();
  }

  async Update(userDTO: UserDTO): Promise<UserDTO> {
    await this.connect()

    const userId = userDTO._id.toString()

    const query = { _id: userDTO._id };

    // Remove fields that must not be modified.
    delete userDTO._id;
    delete userDTO.created_at;
    delete userDTO.password;

    // Set modified last field to current date
    userDTO.last_modified = Math.floor(Date.now()/1000);

    await this.collection.updateOne(query, { $set: userDTO });
    await this.close()
    return await this.Get(userId);
  }

  async UpdatePassword(userDTO: UserDTO) {
    await this.connect()

    const query = { _id: userDTO._id };

    userDTO.password = await generatePasswordHash(userDTO.password);

    // Set modified last field to current date
    userDTO.last_modified = Math.floor(Date.now()/1000);

    await this.collection.updateOne(query, { $set: userDTO });
  }
}

