import {ObjectId} from "mongodb";
import IEventDAL from "~/server/Interface/IEventDAL";
import {EventDTO} from "~/server/DTO/EventDTO";
import {z} from "zod";
import {EventCreateSchema, EventUpdateSchema} from "~/server/Schema/Event";
import IRegistrationCollectionDAL from "~/server/Interface/IRegistrationCollectionDAL";
import IRegistrationDAL from "~/server/Interface/IRegistrationDAL";
import Registration from "~/server/BLL/Registration";
import {RegistrationDTO} from "~/server/DTO/RegistrationDTO";

export default class Event {
  _id: string;
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
      choices?: string[],
    }
  }
  created_at: Date;
  last_modified: Date;
  private DAL: IEventDAL;
  private RegistrationDAL: IRegistrationCollectionDAL
  private RegistrationChildDAL: IRegistrationDAL

  constructor(dal: IEventDAL, registrationDAL: IRegistrationCollectionDAL, registrationChildDAL: IRegistrationDAL) {
    this.DAL = dal;
    this.RegistrationDAL = registrationDAL;
    this.RegistrationChildDAL = registrationChildDAL
  }

  async Update(event: z.infer<typeof EventUpdateSchema>) {
    const eventDTO = event as EventDTO
    eventDTO._id = new ObjectId(this._id);

    const updatedEventDto = await this.DAL.Update(eventDTO);

    this.Load(updatedEventDto);
  }

  Load(event: EventDTO) {
    this._id = event._id.toString();
    this.code = event.code;
    this.name = event.name;
    this.start_date = new Date(event.start_date);
    this.end_date = new Date(event.end_date);
    this.closed = event.closed;
    this.invitation_required = event.invitation_required;
    this.invitation_mail = event.invitation_mail;
    this.page_content = event.page_content;
    this.meta = event.meta
    this.created_at = new Date(event.created_at * 1000);
    this.last_modified = new Date(event.last_modified * 1000);
  }

  Export(): object {
    return {
      id: this._id,
      code: this.code,
      name: this.name,
      start_date: this.start_date,
      end_date: this.end_date,
      closed: this.closed,
      invitation_required: this.invitation_required,
      invitation_mail: this.invitation_mail,
      page_content: this.page_content,
      meta: this.meta,
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

  IsValidRegistration(registration: RegistrationDTO): boolean {
    if (this.meta !== undefined && (registration.form.meta === undefined || registration.form.meta === null)) {
      return false;
    }
  }

  async CreateRegistration(registration: z.infer<typeof EventCreateSchema>): Promise<Registration> {


    const newDTO = await this.RegistrationDAL.Create(this._id, registration as RegistrationDTO)

    const newObj = new Registration(this.RegistrationChildDAL);
    newObj.Load(newDTO);

    return newObj;
  }

  async ReadRegistration(filter = {}) {
    const registrations = await this.RegistrationDAL.Read(this._id, filter);
    const output = [] as Registration[]

    registrations.forEach(registration => {
      const registrationObj = new Registration(this.RegistrationChildDAL)
      registrationObj.Load(registration)

      output.push(registrationObj)
    })

    return output
  }

  async GetRegistration(code: string) {
    const registration = await this.RegistrationDAL.Get(this._id, code)

    if (!registration) {
      return null
    }

    const registrationObj = new Registration(this.RegistrationChildDAL)
    registrationObj.Load(registration)

    return registrationObj;
  }
}
