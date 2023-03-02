import {EventDTO} from "~/server/DTO/EventDTO";
import {RegistrationDTO} from "~/server/DTO/RegistrationDTO";

export default interface IEventDAL {
  update(
    id: string,
    code: string,
    name: string,
    start_date?: Date,
    end_date?: Date,
    closed?: boolean,
    invitation_required?: boolean,
    invitation_mail?: boolean,
    meta?: {
      [key: string]: {
        name: string,
        type: string,
        required?: boolean,
        choices?: string[] | number[]
      }
    }
  ): Promise<EventDTO>;
}
