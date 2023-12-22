import {apiClient} from "./apiClient";
import {LoginResponse} from "../auth/types";

export const loginService = async (username: string, password: string): Promise<LoginResponse> => {
  return new Promise<LoginResponse>((resolve, reject) => {
    apiClient.post('/auth/login', {username, password})
      .then(response => {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authtoken}`;
        console.log(response.data)
        resolve(response.data as LoginResponse)
      })
      .catch(error => {
        console.log(error.response || error)
        reject(error)
      })
  })

};
