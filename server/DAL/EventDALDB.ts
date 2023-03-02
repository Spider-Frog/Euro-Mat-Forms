import IEventCollectionDAL from "~/server/Interface/IEventCollectionDAL";
import IEventDAL from "~/server/Interface/IEventDAL";
import {EventDTO} from "~/server/DTO/EventDTO";
import MongoDALDB from "~/server/DAL/MongoDALDB";
import {ObjectId} from "mongodb";

export default class EventDALDB extends MongoDALDB implements IEventCollectionDAL, IEventDAL {
  databaseName = 'euro-mat-forms'
  collectionName = 'event'

  constructor(connectionString: string, database: string, collection: string) {
    super(connectionString, database, collection);
  }

  async create(
    code: string,
    name: string,
    startDate?: Date,
    endDate?: Date,
    closed?: boolean,
    invitationRequired?: boolean,
    invitationMail?: boolean,
    meta?: {
      [key: string]: {
        name: string,
        type: string,
        required?: boolean,
        choices?: string[] | number[]
      }
    }
  ): Promise<EventDTO> {
    await this.connect();
    await this.collection.insertOne({
      code: code,
      name: name,
      start_date: startDate,
      end_date: endDate,
      closed: closed,
      invitation_required: invitationRequired,
      invitation_mail: invitationMail,
      meta: meta,
      created_at: new Date(),
      last_modified: new Date()
    });
    await this.close();
    return await this.getByCode(code);
  }

  async readAll(filter: object): Promise<EventDTO[]> {
    await this.connect()
    const result = await this.collection.find(filter).toArray() as EventDTO[]
    await this.close();
    return result;
  }

  async getByCode(code: string): Promise<EventDTO> {return await 1}

  async getById(code: string): Promise<EventDTO> {return await 1}

  async delete(code: string): Promise<void> {return await 1}

  async Create(eventDTO: EventDTO): Promise<EventDTO> {
    eventDTO.created_at = Math.floor(Date.now()/1000);
    eventDTO.last_modified = Math.floor(Date.now()/1000);

    await this.connect();
    await this.collection.insertOne(eventDTO);
    await this.close();
    return await this.Get(eventDTO.code);
  };

  async Read(filter = {}): Promise<EventDTO[]> {
    await this.connect()
    const result = await this.collection.find(filter).toArray() as EventDTO[]
    await this.close();
    return result;
  }

  async Get(code: string): Promise<EventDTO> {
    await this.connect()
    const result = await this.collection.findOne({code: code}) as EventDTO;
    await this.close();
    return result;
  }

  async Delete(code: string) {
    await this.connect();
    await this.collection.deleteOne({code: code});
    await this.close();
  }

  async Update(eventDTO: EventDTO) {
    await this.connect()

    const eventCode = eventDTO.code

    const query = { code: eventDTO.code };

    // Remove fields that must not be modified.
    delete eventDTO._id;
    delete eventDTO.code;
    delete eventDTO.created_at;

    // Set modified last field to current date
    eventDTO.last_modified = Math.floor(Date.now()/1000);

    await this.collection.updateOne(query, { $set: eventDTO });
    await this.close()
    return await this.Get(eventCode);
  }
}

