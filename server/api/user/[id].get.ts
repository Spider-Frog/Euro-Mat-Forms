import {SendError, SendResponse} from "~/server/func";
import { userContainer } from "~/server/init";

export default defineEventHandler(async (event) => {
  try {
    if (!/^[a-f0-9]{24}$/.test(event.context.params.id)) {
      return SendError(event, null, 400, "Invalid Object id.")
    }

    // Fetch the user from the database
    const user = await userContainer.Get(event.context.params.id);

    // If user does not exist return error response 404
    if (!user) {
      return SendError(event, null, 404)
    }

    // Send back response with the user
    return SendResponse(event, user.ToJson())
  } catch (e: any) {
    const config = useRuntimeConfig()

    if (config.public.mode === "Development") {
      console.log(e)
    }

    return SendError(event, null,500, e.message)
  }
})
