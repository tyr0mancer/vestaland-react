import {apiClient} from "./apiClient";
import {LoginResponse} from "../auth/types";


//@todo move to shared-types
export type RegisterUserType = {
  name: string,
  email: string,
  password: string
}

export class AuthService {
  static async login(username: string, password: string): Promise<LoginResponse> {
    return new Promise<LoginResponse>((resolve, reject) => {
      apiClient.post('/auth/login', {username, password})
        .then(response => {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authtoken}`;
          resolve(response.data as LoginResponse)
        })
        .catch(reject)
    })
  }

  static async refresh(): Promise<LoginResponse> {
    return new Promise<LoginResponse>((resolve, reject) => {
      apiClient.post('/auth/refresh')
        .then(response => {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authtoken}`;
          resolve(response.data as LoginResponse)
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

  static async register(newUser: RegisterUserType): Promise<LoginResponse> {
    return new Promise<LoginResponse>((resolve, reject) => {
      apiClient.post('/auth/register', newUser)
        .then(response => {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authtoken}`;
          resolve(response.data as LoginResponse)
        })
        .catch(reject)
    })
  }

}
