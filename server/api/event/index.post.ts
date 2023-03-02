import {readBody} from "h3";
import {IsAdmin, SendError, SendResponse} from "~/server/func";
import {eventContainer} from "~/server/init";
import {EventCreateSchema} from "~/server/Schema/Event";

export default defineEventHandler(async (event) => {
  try {
    if (!IsAdmin(event)) {
      return SendError(event, null, 403, "You need to be an administrator to perform this action.")
    }

    // Fetch the JSON body.
    const body = await readBody(event)

    // Parse the JSON body with zod.
    const parsing = EventCreateSchema.safeParse(body)

    // If parsing failed return an error response.
    if (!parsing.success) {
      return SendError(event, parsing, 400, "Form data is not correct.")
    }

    // Check if the user already exist inside the database.
    const eventResults = await eventContainer.Read({code: body.code})

    if (eventResults.length) {
      return SendError(event, null, 409, "Event already exists.")
    }

    // Create the user inside the BLL
    const newEventCreated = await eventContainer.Create(parsing.data);

    // Send back a success response
    return SendResponse(event, newEventCreated.ToJson(), 201, `Event has been created.`)
  } catch (e: any) {
    const config = useRuntimeConfig()

    if (config.public.mode === "Development") {
      console.error(e)
    }

    return SendError(event, null, 500, e.message)
  }
})
