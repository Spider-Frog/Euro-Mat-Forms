import {readBody} from "h3";
import {GetAuthToken, IsLoggedIn, SendError, SendResponse} from "~/server/func";
import {UserUpdateSchema} from "~/server/Schema/User";


export default defineEventHandler(async (event) => {
  try {
    if (!IsLoggedIn(event)) {
      return SendError(event, null, 403, "You need to be an administrator to perform this action.")
    }

    // Fetch the JSON body.
    const body = await readBody(event)

    // Parse the JSON body with zod.
    const parsing = UserUpdateSchema.safeParse(body)

    // If parsing failed return an error response.
    if (!parsing.success) {
      return SendError(event, parsing, 400, "Form data is not correct.")
    }

    // Fetch the user from the database
    const user = await GetAuthToken(event);

    // If user has not been found send error response 404
    if (!user) {
      return SendError(event, null, 404)
    }

    parsing.data.admin = user.admin;

    // Update the user
    await user.Update(parsing.data);

    // Send back response with the updated user
    return SendResponse(event, user.ToJson(), 201, `Information has been updated.`)
  } catch (e: any) {
    const config = useRuntimeConfig()

    if (config.public.mode === "Development") {
      console.log(e)
    }

    return SendError(event, null, 500, e.message)
  }
})
