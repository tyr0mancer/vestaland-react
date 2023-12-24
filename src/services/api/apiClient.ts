import axios from 'axios';
import {ApiErrorResponse} from "../auth/types";

// @ todo use .env
//require('dotenv').config()
//baseURL: 'http://167.172.190.167:3000/api'
const apiClient = axios.create({
  baseURL: 'https://api.vestaland.de/api',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});
const refreshClient = axios.create({
  baseURL: 'https://api.vestaland.de/api',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

apiClient.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;


    // @todo einschränken: ist token abgelaufen, wurde gar keines gesetzt? existiert ein cookie? console.log entfernen
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      refreshClient.post('https://api.vestaland.de/api/auth/refresh')
        .then(response => {
          console.log('could refresh Token', response.data)
          originalRequest.headers['Authorization'] = `Bearer ${response.data.authtoken}`;
          return apiClient(originalRequest); // Retry the original request with the new token
        })
        .catch(error => {
          console.log('Error while trying to refresh Token', error.response || error)
        })
    }
    console.log('Other Error', error.response || error)
    return Promise.reject(error);
  }
);

function isApiErrorResponse(obj: any): obj is ApiErrorResponse {
  return obj
    && typeof obj.status === 'number'
    && typeof obj.message === 'string';
}

export {apiClient, isApiErrorResponse}
