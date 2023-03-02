import {setCookie, readBody} from "h3";
import {SendError, SendResponse} from "~/server/func";
import {userContainer} from "~/server/init";


export default defineEventHandler(async (event) => {
  // Fetch the JSON body.
  const body = await readBody(event)

  // Check if the user exists inside the database.
  const user = await userContainer.Read({email: body.email})

  if (!user.length) {
    return SendError(event, null, 401, `Incorrect credentials.`);
  }

  const currentUser = user[0];

  if (!await currentUser.ValidatePassword(body.password)) {
    return SendError(event, null, 401, `Incorrect credentials.`);
  }

  setCookie(event, 'auth_token', JSON.stringify(currentUser.ToJson()));
  console.log("auth successful")
  return SendResponse(event, currentUser.ToJson(), 200, "Authentication Successful.")
});
