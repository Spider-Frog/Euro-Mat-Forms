import {IsAdmin, SendError, SendResponse} from "~/server/func";
import { userContainer } from "~/server/init";

export default defineEventHandler(async (event) => {
  try {
    if (!/^[a-f0-9]{24}$/.test(event.context.params.id)) {
      return SendError(event, null, 400, "Invalid Object id.")
    }

    if (!IsAdmin(event)) {
      return SendError(event, null, 403, "You need to be an administrator to perform this action.")
    }

    // Fetch the user from the database
    const user = await userContainer.Get(event.context.params.id);

    // If user has not been found send error response 404
    if (!user) {
      return SendError(event, null, 404)
    }

    // Delete user
    await userContainer.Delete(event.context.params.id)

    return SendResponse(event, null, 201, `User has been Deleted.`)
  } catch (e: any) {
    const config = useRuntimeConfig()

    if (config.public.mode === "Development") {
      console.log(e)
    }

    return SendError(event, null,500, e.message)
  }
})
