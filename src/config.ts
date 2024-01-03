interface Config {
  apiBaseUrl: string;
  imgBaseUrl: string;

  host: string;
  port: number;
}

const devMode = Boolean(process.env.REACT_APP_DEV_MODE) || false

if (devMode)
  console.log("DevMode aktiv")

const config: Config = {
  apiBaseUrl: (devMode ? process.env.REACT_APP_API_BASE_URL_DEV : process.env.REACT_APP_API_BASE_URL) || 'https://api.vestaland.de/api',
  imgBaseUrl: (devMode ? process.env.REACT_APP_IMG_BASE_URL_DEV : process.env.REACT_APP_IMG_BASE_URL) || 'https://api.vestaland.de/api',

  host: process.env.REACT_APP_HOST || 'https://app.vestaland.de',
  port: Number(process.env.REACT_APP_PORT) || 80,
};

export default config;
