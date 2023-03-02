import {readBody} from "h3";
import {GetAuthToken, SendError, SendResponse} from "~/server/func";
import {UserPasswordSchema} from "~/server/Schema/User";


export default defineEventHandler(async (event) => {
  const currentUser = GetAuthToken(event);

  if (!currentUser) {
    return SendError(event, null, 401, "You need to be authenticated to perform this action.")
  }

  // Fetch the JSON body.
  const body = await readBody(event)

  // Parse the JSON body with zod.
  const parsing = UserPasswordSchema.safeParse(body)

  // If parsing failed return an error response.
  if (!parsing.success) {
    return SendError(event, parsing, 400, "Form data is not correct.")
  }

  await currentUser.UpdatePassword(parsing.data)

  return SendResponse(event, null, 201, "Password has been changed.")
});
