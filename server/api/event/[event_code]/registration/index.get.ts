import { eventContainer } from "~/server/init";
import {IsAdmin, SendError, SendResponse} from "~/server/func";

export default defineEventHandler(async (event) => {
  try {
    if (!await IsAdmin(event)) {
      return SendError(event, null, 403, "You need to be an administrator to perform this action.")
    }

    // Fetch all users from the database
    const eventObj = await eventContainer.Get(event.context.params.event_code)

    // If user does not exist return error response 404
    if (!eventObj) {
      return SendError(event, null, 404)
    }

    const results = await eventObj.ReadRegistration()
    const output = [] as object[];

    // Export all users to JSON and put them inside the list.
    results.forEach((eventObj) => {
      output.push(eventObj.ToJson())
    })

    // Send back response with the user list
    return SendResponse(event, output)
  } catch (e: any) {
    const config = useRuntimeConfig()

    if (config.public.mode === "Development") {
      console.log(e)
    }

    return SendError(event, null,500, e.message)
  }
})
