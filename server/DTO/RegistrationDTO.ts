import {ObjectId} from "mongodb";

export type RegistrationDTO = {
  _id: ObjectId;
  code: string;
  event_id: ObjectId,
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
    ],
    meta?: {
      [key: string]: any
    }
  };
  created_at: number;
  last_modified: number;
}
