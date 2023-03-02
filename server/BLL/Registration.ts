import {ObjectId} from "mongodb";
import IRegistrationDAL from "~/server/Interface/IRegistrationDAL";
import {RegistrationDTO} from "~/server/DTO/RegistrationDTO";

export default class Registration {
  id: string;
  code: string;
  event_id: string;
  form: {
    email: string;
    company_name: string;
    phone_number?: string;
    note: string;
    participants?: [
      {
        email: string;
        first_name: string;
        last_name: string;
        phone_number: string;
        program?: Array<string>;
      }
    ]
  };
  invitation_code?: string;
  created_at: Date;
  last_modified: Date;
  private DAL: IRegistrationDAL;

  constructor(dal: IRegistrationDAL) {
    this.DAL = dal;
  }

  async Update(registration: RegistrationDTO) {
    this.DAL.Update(this.event_id, registration);
  }

  Load(registration: RegistrationDTO) {
    this.id = registration._id.toString()
    this.code = registration.code;
    this.event_id = registration.event_id.toString();
    this.form = registration.form;
    this.created_at = new Date(registration.created_at * 1000);
    this.last_modified = new Date(registration.last_modified * 1000);
  }

  Export(): object {
    return {
      id: this.id,
      code: this.code,
      event_id: this.event_id,
      form: this.form,
      invitation_code: this.invitation_code,
      created_at: this.created_at,
      last_modified: this.last_modified,
    }
  }

  ToJson(): object {
    return this.Export();
  }

  Xml(): string {
    let Output = "";

    Object.keys(this.Export()).forEach(key => {

    })

    return Output
  }
}
