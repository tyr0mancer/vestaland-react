
export enum BenutzerRolle {
  BENUTZER = 'benutzer',
  REDAKTEUR = 'redakteur',
  ADMIN = 'admin'
}

export interface LoginResponse {
  _id: string,
  name: string,
  email: string,
  rollen: BenutzerRolle[],
  authtoken: string,
  refreshtoken: string,
}
export interface ApiErrorResponse {
  status: number,
  message: string,
  description?: string,
  error?: any
}
export type RegisterUserType = {
  name: string,
  email: string,
  password: string
}
