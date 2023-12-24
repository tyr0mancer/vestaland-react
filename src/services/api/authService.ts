import {apiClient} from "./apiClient";
import {LoginResponse} from "../auth/types";

export const loginService = async (username: string, password: string): Promise<LoginResponse> => {
  return new Promise<LoginResponse>((resolve, reject) => {
    apiClient.post('/auth/login', {username, password})
      .then(response => {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authtoken}`;
        resolve(response.data as LoginResponse)
      })
      .catch(reject)
  })
};

export const refreshService = async (): Promise<LoginResponse> => {
  return new Promise<LoginResponse>((resolve, reject) => {
    apiClient.post('/auth/refresh')
      .then(response => {
        console.log("#####################################\nREFRESH!!!\n$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authtoken}`;
        resolve(response.data as LoginResponse)
      })
      .catch(reject)
  })
};
