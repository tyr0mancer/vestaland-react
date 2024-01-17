import {BenutzerRolle} from "./enum";

/* Auth Types */
type LoginResponseType = {
  _id: string,
  name: string,
  email: string,
  rollen: BenutzerRolle[],
  authtoken: string,
  refreshtoken: string,
}
type AuthTokenType =
  & Omit<LoginResponseType, "authtoken" | "refreshtoken">
  & { isAdmin?: boolean }

/* API Calls */
type ApiErrorResponse = {
  status: number,
  message: string,
  description?: string,
  error?: any
}


type ObjectId = string //@todo ObjectId
type Ref<T> = T
/*
  | T
  | ObjectId
*/

