import { z } from "zod";

const Auth = z.object({
  email: z.string().email().max(320),
  password: z.string().min(8).max(128),
})

export default Auth;