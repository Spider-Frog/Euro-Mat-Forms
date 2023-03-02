import {IsAdmin, SendError, SendResponse} from "~/server/func";
import { eventContainer } from "~/server/init";

export default defineEventHandler(async (event) => {
  try {
    if (!IsAdmin(event)) {
      return SendError(event, null, 403, "You need to be an administrator to perform this action.")
    }

    // Fetch the user from the database
    const obj = await eventContainer.Get(event.context.params.id);

    // If user has not been found send error response 404
    if (!obj) {
      return SendError(event, null, 404)
    }

    // Delete user
    await eventContainer.Delete(event.context.params.id)

    return SendResponse(event, null, 201, `Event has been Deleted.`)
  } catch (e: any) {
    const config = useRuntimeConfig()

    if (config.public.mode === "Development") {
      console.log(e)
    }

    return SendError(event, null,500, e.message)
  }
})
