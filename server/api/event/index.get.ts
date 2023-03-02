import { eventContainer } from "~/server/init";
import {SendError, SendResponse} from "~/server/func";

export default defineEventHandler(async (event) => {
  try {
    // Fetch all users from the database
    const results = await eventContainer.Read()
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
