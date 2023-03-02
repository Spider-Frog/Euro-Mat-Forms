import {ObjectId} from "mongodb";

export type EventDTO = {
  _id: ObjectId;
  code: string;
  name: string;
  start_date?: Date;
  end_date?: Date;
  closed?: boolean;
  invitation_required?: boolean;
  invitation_mail?: string;
  page_content?: string;
  meta?: {
    [key: string]: {
      name: string,
      type: string,
      required?: boolean,
      choices?: string[] | number[],
    }
  };
  created_at: number;
  last_modified: number;
}
