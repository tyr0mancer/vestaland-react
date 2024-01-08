import axios from 'axios';
import {ApiErrorResponse} from "../auth/types";
import {ZodError} from 'zod';
import myConfig from "../../config";

const baseURL = myConfig.apiBaseUrl
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
    if (myConfig.devMode)
      console.log('API Response', response)
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // @todo einschränken: ist token abgelaufen, wurde gar keines gesetzt? existiert ein cookie?
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      refreshClient.post(myConfig.apiBaseUrl + myConfig.tokenRefreshUrl)
        .then(response => {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authtoken}`;
          originalRequest.headers['Authorization'] = `Bearer ${response.data.authtoken}`;
          return apiClient(originalRequest); // Retry the original request with the new token
        })
        .catch(error => console.error('Error while trying to refresh Token', error.response || error))
    }

    if (error.response && isZodError(error.response.data)) {
      handleZodError(error.response.data);
    }

    console.error(error.response.data)
    return Promise.reject(error);
  }
);

function handleZodError(error: any) {
  window.dispatchEvent(new CustomEvent('api-error', {detail: error}));
}


function isZodError(obj: any): obj is ZodError {
  return obj && obj.message && (obj.message === myConfig.zodErrorString)
}

function isApiErrorResponse(obj: any): obj is ApiErrorResponse {
  return obj
    && typeof obj.status === 'number'
    && typeof obj.message === 'string';
}

export {apiClient, isApiErrorResponse}
