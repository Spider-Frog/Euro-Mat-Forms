import {SendError, SendResponse} from "~/server/func";
import { eventContainer } from "~/server/init";

export default defineEventHandler(async (event) => {
  try {
    // Fetch the user from the database
    const eventObj = await eventContainer.Get(event.context.params.code);

    // If event does not exist return error response 404
    if (!eventObj) {
      return SendError(event, null, 404)
    }

    const registrationObj = await eventObj.GetRegistration(event.context.params.registration_code);

    // If registration does not exist return error response 404
    if (!registrationObj) {
      return SendError(event, null, 404)
    }

    // Send back response with the user
    return SendResponse(event, registrationObj.ToJson())
  } catch (e: any) {
    const config = useRuntimeConfig()

    if (config.public.mode === "Development") {
      console.log(e)
    }

    return SendError(event, null,500, e.message)
  }
})
