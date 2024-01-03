import axios from 'axios';
import {ApiErrorResponse} from "../auth/types";
import config from "../../config";


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
  response => response,
  async (error) => {
    const originalRequest = error.config;


    // @todo einschränken: ist token abgelaufen, wurde gar keines gesetzt? existiert ein cookie? console.log entfernen
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      refreshClient.post('https://api.vestaland.de/api/auth/refresh')
        .then(response => {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authtoken}`;
          originalRequest.headers['Authorization'] = `Bearer ${response.data.authtoken}`;
          return apiClient(originalRequest); // Retry the original request with the new token
        })
        .catch(error => {
          console.log('Error while trying to refresh Token', error.response || error)
        })
    }
    console.log(error.response || error)
    return Promise.reject(error);
  }
);

function isApiErrorResponse(obj: any): obj is ApiErrorResponse {
  return obj
    && typeof obj.status === 'number'
    && typeof obj.message === 'string';
}


type ApiFunction<T> = (body: T) => Promise<{ data: T }>;

function postServiceWrapper<T>(apiFunc: ApiFunction<T>): (body: T) => Promise<T> {
  return (body: T) => new Promise<T>((resolve, reject) =>
    apiFunc(body)
      .then(({data}) => resolve(data))
      .catch(error => reject(error))
  );
}

function putServiceWrapper<T>(apiFunc: ApiFunction<T>): (body: T) => Promise<T> {
  return (body: T) => new Promise<T>((resolve, reject) =>
    apiFunc(body)
      .then(({data}) => resolve(data))
      .catch(error => reject(error))
  );
}

export {apiClient, isApiErrorResponse, postServiceWrapper, putServiceWrapper}
