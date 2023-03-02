import {readBody} from "h3";
import {IsAdmin, SendError, SendResponse} from "~/server/func";
import {userContainer} from "~/server/init";
import {UserCreateSchema} from "~/server/Schema/User";

export default defineEventHandler(async (event) => {
  try {
    if (!IsAdmin(event)) {
      return SendError(event, null, 403, "You need to be an administrator to perform this action.")
    }

    // Fetch the JSON body.
    const body = await readBody(event)

    // Parse the JSON body with zod.
    const parsing = UserCreateSchema.safeParse(body)

    // If parsing failed return an error response.
    if (!parsing.success) {
      return SendError(event, parsing, 400, "Form data is not correct.")
    }

    // Check if the user already exist inside the database.
    const user = await userContainer.Read({email: body.email})

    if (user.length) {
      return SendError(event, null, 409, "User already exists.")
    }

    // Create the user inside the BLL
    const userCreated = await userContainer.Create(parsing.data);

    // Send back a success response
    return SendResponse(event, userCreated.ToJson(), 201, `User has been created.`)
  } catch (e: any) {
    const config = useRuntimeConfig()

    if (config.public.mode === "Development") {
      console.log(e)
    }

    return SendError(event, null, 500, e.message)
  }
})
