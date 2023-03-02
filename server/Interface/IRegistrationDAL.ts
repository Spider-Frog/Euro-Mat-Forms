import {RegistrationDTO} from "~/server/DTO/RegistrationDTO";

export default interface IRegistrationDAL {
    Update(event_id: string, registrationDTO: RegistrationDTO);
}
