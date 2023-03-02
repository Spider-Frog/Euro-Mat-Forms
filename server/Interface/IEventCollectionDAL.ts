import {EventDTO} from "~/server/DTO/EventDTO";

export default interface IEventCollectionDAL {
  create(
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
  ): Promise<EventDTO>;
  readAll(filter: object): Promise<EventDTO[]>;
  getByCode(code: string): Promise<EventDTO>;
  getById(code: string): Promise<EventDTO>;
  delete(code: string): Promise<void>;
}
