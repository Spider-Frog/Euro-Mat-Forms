import {GetAuthToken, IsLoggedIn, SendError} from "~/server/func";

export default defineEventHandler(async (event) => {
  if (!IsLoggedIn(event)) {
    return SendError(event, null, 401, "You need to be authenticated to perform this action.")
  }

  return GetAuthToken(event)
});
