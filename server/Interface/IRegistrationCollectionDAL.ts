import {RegistrationDTO} from "~/server/DTO/RegistrationDTO";

export default interface IRegistrationCollectionDAL {
  Create(event_id: string, registrationDTO: RegistrationDTO): Promise<RegistrationDTO>;
  Read(event_id: string, filter: object): Promise<RegistrationDTO[]>;
  Get(event_id: string, code: string): Promise<RegistrationDTO>;
  Delete(event_id: string, code: string);
}
