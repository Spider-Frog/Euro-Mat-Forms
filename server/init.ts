import UserCollection from "~/server/BLL/UserCollection";
import EventCollection from "~/server/BLL/EventCollection";
import UserDALDB from "~/server/DAL/UserDALDB";
import EventDALDB from "~/server/DAL/EventDALDB";
import RegistrationDALDB from "~/server/DAL/RegistrationDALDB";

const config = useRuntimeConfig()

// Init DAL objects.
// if (config.public.useMemory) {
//   const userDAL = new UserDALMemory(config.dbUrl, config.dbDatabase)
// } else {
//   const userDAL = new UserDALDB(config.dbUrl, config.dbDatabase)
// }
export const userDAL = new UserDALDB(config.dbUrl, config.dbDatabase, "user")
export const eventDAL = new EventDALDB(config.dbUrl, config.dbDatabase, "event")
export const registrationDAL = new RegistrationDALDB(config.dbUrl, config.dbDatabase, "registration")

// Init Model objects.
export const userContainer = new UserCollection(userDAL, userDAL);
export const eventContainer = new EventCollection(eventDAL, eventDAL, registrationDAL, registrationDAL);
