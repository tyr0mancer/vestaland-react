const BASE_URL = 'https://api.vestaland.de/public/uploads/'
const DUMMY = 'https://api.vestaland.de/public/platzhalter.jpg'

export function getFileUrl(filename?: string) {
  if (!filename)
    return DUMMY
  return BASE_URL + filename
}
