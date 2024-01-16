export interface Config {
  devMode: boolean;
  apiBaseUrl: string;
  imgBaseUrl: string;
  tokenRefreshUrl: string;
  host: string;
  port: number;

}

const devMode = Boolean(process.env.REACT_APP_DEV_MODE) || false

if (devMode)
  console.log("DevMode aktiv")


export const config: Config = {
  devMode,
  apiBaseUrl: (devMode ? process.env.REACT_APP_API_BASE_URL_DEV : process.env.REACT_APP_API_BASE_URL) || 'https://api.vestaland.de/api',
  imgBaseUrl: (devMode ? process.env.REACT_APP_IMG_BASE_URL_DEV : process.env.REACT_APP_IMG_BASE_URL) || 'https://api.vestaland.de/public/uploads/',
  tokenRefreshUrl: process.env.REACT_APP_TOKEN_REFRESH_URL || '/auth/refresh',

  host: process.env.REACT_APP_HOST || 'https://app.vestaland.de',
  port: Number(process.env.REACT_APP_PORT) || 80,

};

