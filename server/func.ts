import bcrypt from "bcrypt"
import {UserDTO} from "~/server/DTO/UserDTO";
import User from "~/server/BLL/User";
import {H3Event} from "h3";
import {userDAL} from "~/server/init";

export type Response = {
  statusCode: number,
  statusMessage: string | null,
  message?: string,
  data?: object,
}

export const StatusCodes: Record<number, string> = {
  200: "Ok",
  201: "Resource has been created/updated/deleted.",
  202: "Request has been accepted.",
  204: "Request accepted has no content",

  400: "Invalid Request.",
  401: "Access denied, Not authorized for this request.",
  402: "Payment required.",
  403: "Access denied, Insufficient permissions",
  404: "Resource has not been found",
  405: "Method is not allowed.",
  408: "Request has timed out.",
  409: "Resource conflicts with existing resource.",
  418: "I'm a Teapot",

  500: "Internal server error.",
  504: "Internal server error.",
}

function FetchStatusMessage(statusCode: number) {
  const message = StatusCodes[statusCode];

  if (message === undefined) {
    return null;
  }

  return message;
}

export function SendResponse(
  event: H3Event,
  data: object | null,
  statusCode = 200,
  message: string | null = null,
): Response {
  const output = {} as Response

  event.res.statusCode = statusCode
  output.statusCode = statusCode
  output.statusMessage = FetchStatusMessage(statusCode)

  if (data) {
    output.data = data
  }

  if (message) {
    output.message = message
  }

  return output
}

export function SendError(
  event: H3Event,
  data: object | null,
  statusCode = 400,
  message: string | null = null,
  ): Response {
  const output = {} as Response

  event.res.statusCode = statusCode
  output.statusCode = statusCode
  console.log(FetchStatusMessage(statusCode))
  output.statusMessage = FetchStatusMessage(statusCode)

  if (data) {
    output.data = data
  }

  if (message) {
    output.message = message
  }

  return output
}

export async function generatePasswordHash(password: string) {
  const salt = await bcrypt.genSalt(6);
  return await bcrypt.hash(password, salt);
}

// compare the password user entered with hashed pass.
export async function checkPasswordHash(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

export function GetAuthToken(event: H3Event): User | null {
  const cookies = parseCookies(event);

  if (!cookies.hasOwnProperty('auth_token')) {
    return null;
  }

  const userDTO = JSON.parse(cookies["auth_token"]) as UserDTO;

  const user = new User(userDAL)
  user.Load(userDTO)

  return user;
}

export function IsLoggedIn(event: H3Event): boolean {
  return !!GetAuthToken(event);
}

export function IsAdmin(event: H3Event): boolean {
  const auth_token = GetAuthToken(event)

  if (!auth_token) {
    return false;
  }

  return auth_token.admin
}
