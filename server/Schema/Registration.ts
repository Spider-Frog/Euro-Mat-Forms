import {z} from "zod";

const Registration = {
  code: z.string().min(4).max(16).trim(),
  event_id: z.string(),
  form: z.object({
    email: z.string().email().max(320),
    company_name: z.string().min(1).max(64),
    phone_number: z.string().max(15).optional(),
    phone: z.string().max(512).optional(),
    participants: z.array(z.object({
      email: z.string().email().max(320),
      first_name: z.string().min(1).max(320),
      last_name: z.string().min(1).max(320),
      phone_number: z.string().max(15).optional(),
      program: z.array(z.string()),
    })).optional(),
    meta: z.record(z.any())
  })
}

export const RegistrationCheckMeta = z.object({
  form: z.object({
    meta: Registration.form
  })
})

export const RegistrationCheckInvitation = z.object({
  ...Registration
})
