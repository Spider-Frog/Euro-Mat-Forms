import {z} from "zod";

const User = {
  name: z.string().min(1).max(64),
  email: z.string().email().max(320),
  password: z.string().min(8).max(128),
  admin: z.boolean()
}

export const UserPasswordSchema = z.object({
  oldPassword: User.password,
  newPassword: User.password
})

export const UserCreateSchema = z.object({
  ...User
})

export const UserUpdateSchema = z.object({
  name: User.name,
  email: User.email,
  admin: User.admin
})