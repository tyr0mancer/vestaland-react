import {apiClient} from "../api/apiClient";
import {LoginResponse} from "./types";
import {LoginProps} from "./AuthProvider";


export class AuthService {
  static async login(loginInfo?: LoginProps): Promise<LoginResponse> {
    return new Promise<LoginResponse>((resolve, reject) => {
      apiClient.post('/auth/login', loginInfo)
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

  static async register<T>(newUser: T): Promise<LoginResponse> {
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
