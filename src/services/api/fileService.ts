const BASE_URL = 'https://api.vestaland.de/public/uploads/'
const DUMMY = 'https://api.vestaland.de/public/uploads/7f657b4fe779a981.webp'

export function getFileUrl(filename?: string) {
  if (!filename)
    return DUMMY
  return BASE_URL + filename
}
