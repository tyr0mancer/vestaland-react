/**
 * Config Struktur
 */
export type ConfigType = {
  devMode: boolean;
  logApi: boolean,

  apiBaseUrl: string;
  authBaseUrl: string;
  imgBaseUrl: string;
  tokenRefreshPath: string; // API Route für Refresh-Token call
  host: string;
  port: number;
}

const devMode = Boolean(process.env.REACT_APP_DEV_MODE) || false

if (devMode)
  console.log("DevMode ist aktiv")


/**
 * Config settings werden aus environment variables geladen und werden hier typsicher mit Fallback Optionen aufbereitet
 */
export const config: ConfigType = {
  devMode,
  logApi: Boolean(process.env.REACT_APP_DEV_LOG_API) || false,

  apiBaseUrl: (devMode ? process.env.REACT_APP_API_BASE_URL_DEV : process.env.REACT_APP_API_BASE_URL) || 'https://api.vestaland.de/api',
  authBaseUrl: (devMode ? process.env.REACT_APP_AUTH_BASE_URL_DEV : process.env.REACT_APP_AUTH_BASE_URL) || 'https://api.vestaland.de/auth',
  imgBaseUrl: (devMode ? process.env.REACT_APP_IMG_BASE_URL_DEV : process.env.REACT_APP_IMG_BASE_URL) || 'https://api.vestaland.de/public/uploads/',
  tokenRefreshPath: process.env.REACT_APP_TOKEN_REFRESH_PATH || '/refresh',

  host: process.env.REACT_APP_HOST || 'https://app.vestaland.de',
  port: Number(process.env.REACT_APP_PORT) || 80,

};

