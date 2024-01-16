import {apiClient} from "../api/apiClient";
import {LoginProps, RegisterProps} from "./types";
import {LoginResponseType} from "../../shared-types/types";


export class AuthService {
  static async login(loginInfo?: LoginProps): Promise<LoginResponseType> {
    return new Promise<LoginResponseType>((resolve, reject) => {
      apiClient.post('/auth/login', loginInfo)
        .then(response => {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authtoken}`;
          resolve(response.data as LoginResponseType)
        })
        .catch(reject)
    })
  }

  static async refresh(): Promise<LoginResponseType> {
    return new Promise<LoginResponseType>((resolve, reject) => {
      apiClient.post('/auth/refresh')
        .then(response => {
          if (response?.data?.authtoken) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authtoken}`;
            resolve(response.data as LoginResponseType)
          }
          reject('Cant refresh. Token missing?')
        })
        .catch(reject)
    })
  }

  static async logout(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      apiClient.post('/auth/logout')
        .then(() => {
          apiClient.defaults.headers.common['Authorization'] = `Bearer `;
          resolve('OK')
        })
        .catch(reject)
    })
  }

  static async registerAndLogin(newUser: RegisterProps): Promise<LoginResponseType> {
    return new Promise<LoginResponseType>((resolve, reject) => {
      apiClient.post('/auth/register', newUser)
        .then(response => {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authtoken}`;
          resolve(response.data as LoginResponseType)
        })
        .catch(reject)
    })
  }

}
