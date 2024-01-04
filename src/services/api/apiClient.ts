import axios from 'axios';
import {ApiErrorResponse} from "../auth/types";
import config from "../../config";
import {z} from "zod";

const baseURL = config.apiBaseUrl
const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});
const refreshClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

apiClient.interceptors.response.use(
  (response) => {
    if (config.devMode)
      console.log(response)
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // @todo einschränken: ist token abgelaufen, wurde gar keines gesetzt? existiert ein cookie?
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      refreshClient.post('https://api.vestaland.de/api/auth/refresh')
        .then(response => {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authtoken}`;
          originalRequest.headers['Authorization'] = `Bearer ${response.data.authtoken}`;
          return apiClient(originalRequest); // Retry the original request with the new token
        })
        .catch(error => console.error('Error while trying to refresh Token', error.response || error))
    }


    if (error.response && error.response.status === 400) {
      /* check for ZOD Errors */

      try {
        const zodErrorSchema = z.object({
          error: z.string(),
          details: z.array(z.string()),
        });

        const parsedError = zodErrorSchema.parse(error.response.data);

        console.error('Zod Error:', parsedError);

      } catch (zodError) {

        // That was no ZOD
        console.error('Error parsing Zod error:', zodError);
      }
    }


    return Promise.reject(error);
  }
);

function isApiErrorResponse(obj: any): obj is ApiErrorResponse {
  return obj
    && typeof obj.status === 'number'
    && typeof obj.message === 'string';
}

export {apiClient, isApiErrorResponse}
