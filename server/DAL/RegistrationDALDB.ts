import IRegistrationContainerDAL from "../Interface/IRegistrationCollectionDAL";
import IRegistrationDAL from "~/server/Interface/IRegistrationDAL";
import {RegistrationDTO} from "~/server/DTO/RegistrationDTO";
import MongoDALDB from "~/server/DAL/MongoDALDB";
import {ObjectId} from "mongodb";

export default class RegistrationDALDB extends MongoDALDB implements IRegistrationContainerDAL, IRegistrationDAL {
  collectionName = 'registration'

  // constructor(connectionString, database) {
  //   super(connectionString, database);
  // }

  async Create(event_id: string, registrationDTO: RegistrationDTO): Promise<RegistrationDTO> {
    registrationDTO.event_id = new ObjectId(event_id);
    registrationDTO.created_at = Math.floor(Date.now()/1000);
    registrationDTO.last_modified = Math.floor(Date.now()/1000);

    await this.connect();
    const result = await this.collection.insertOne(registrationDTO);
    await this.close();
    return await this.Get(event_id, registrationDTO.code);
  };

  async Read(event_id: string, filter = {}): Promise<RegistrationDTO[]> {
    await this.connect()
    const result = await this.collection.find(filter).toArray() as RegistrationDTO[]
    await this.close();
    return result;
  }

  async Get(event_id: string, code: string): Promise<RegistrationDTO> {
    await this.connect()
    const result = await this.collection.findOne({event_id: event_id, code: code}) as RegistrationDTO;
    await this.close();
    return result;
  }

  async Delete(event_id: string, code: string) {
    await this.connect();
    await this.collection.deleteOne({event_id: event_id, code: code});
    await this.close();
  }

  async Update(event_id: string, registrationDTO: RegistrationDTO) {
    await this.connect()

    const registrationId = registrationDTO._id.toString()

    const query = { code: registrationDTO.code };

    // Remove fields that must not be modified.
    delete registrationDTO._id;
    delete registrationDTO.code;
    delete registrationDTO.event_id;
    delete registrationDTO.created_at;

    // Set modified last field to current date
    registrationDTO.last_modified = Math.floor(Date.now()/1000);

    await this.collection.updateOne(query, { $set: registrationDTO });
    await this.close();
    return await this.Get(event_id, registrationDTO.code);
  }
}

