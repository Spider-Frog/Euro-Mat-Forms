import {deleteCookie} from "h3";
import {IsLoggedIn, SendError, SendResponse} from "~/server/func";

export default defineEventHandler(async (event) => {
  if (!IsLoggedIn(event)) {
    return SendError(event, null, 401, "You need to be authenticated to perform this action.")
  }

  deleteCookie(event, 'auth_token')

  return SendResponse(event, null, 200, "Logout successful.")
});
