import Event from "~/server/BLL/Event";
import IEventContainerDAL from "~/server/Interface/IEventCollectionDAL";
import {EventDTO} from "~/server/DTO/EventDTO";
import IEventDAL from "~/server/Interface/IEventDAL";
import {EventCreateSchema} from "~/server/Schema/Event";
import { z } from "zod";
import IRegistrationCollectionDAL from "~/server/Interface/IRegistrationCollectionDAL";
import IRegistrationDAL from "~/server/Interface/IRegistrationDAL";


export default class EventCollection {
  private DAL: IEventContainerDAL;
  private DALEvent: IEventDAL
  private DALRegistration: IRegistrationCollectionDAL;
  private DALRegistrationChild: IRegistrationDAL;

  constructor(dal: IEventContainerDAL, dalEvent: IEventDAL, dalRegistration: IRegistrationCollectionDAL, dalRegistrationChild: IRegistrationDAL) {
    this.DAL = dal;
    this.DALEvent = dalEvent;
    this.DALRegistration = dalRegistration;
    this.DALRegistrationChild = dalRegistrationChild;
  }

  async Create(event: z.infer<typeof EventCreateSchema>): Promise<Event> {
    const newDTO = await this.DAL.Create(event as EventDTO)

    const newObj = new Event(this.DALEvent, this.DALRegistration, this.DALRegistrationChild);
    newObj.Load(newDTO);

    return newObj;
  }

  async Read(filter = {}): Promise<Event[]> {
    const events = await this.DAL.readAll(filter);
    const output = [] as Event[]

    events.forEach(event => {
      const eventObj = new Event(this.DALEvent, this.DALRegistration, this.DALRegistrationChild)
      eventObj.Load(event)

      output.push(eventObj)
    })

    return output
  }

  async Get(code: string): Promise<Event> {
    const event = await this.DAL.Get(code)

    if (!event) {
      return null
    }

    const eventObj = new Event(this.DALEvent, this.DALRegistration, this.DALRegistrationChild)
    eventObj.Load(event)

    return eventObj;
  }

  async Delete(code: string) {
    await this.DAL.Delete(code);
  }
}
