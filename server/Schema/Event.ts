import {z} from "zod";

const Event = {
  code: z.string().min(4).max(12).trim(),
  name: z.string().min(1).max(32),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  closed: z.boolean().optional(),
  invitation_required: z.boolean(),
  invitation_mail: z.string().optional(),
  page_content: z.string().optional(),
  meta: z.record(z.object({
    name: z.string().min(1).max(16),
    type: z.string(),
    required: z.boolean(),
    choices: z.array(z.string()).optional(),
  })).optional()
}

export const EventCreateSchema = z.object({
  ...Event
})

export const EventUpdateSchema = z.object({
  ...Event
})
