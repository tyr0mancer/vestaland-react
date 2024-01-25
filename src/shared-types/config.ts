//@todo can only be a workaround until decided on applicable status-code / identifier
export const AUTH_NO_TOKEN_ERROR_MESSAGE = "Client nicht angemeldet (kein Refresh Token gefunden)"

export type ApiRoutePath =
  | 'lebensmittel'
  | 'rezept'
  | 'datei'
  | 'benutzer'
  | 'utensil'
  | 'einkaufsliste'
  | 'essensplan'
  | 'lagerort'
  | 'vorrat'
  | 'aktion'
