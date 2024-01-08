import {apiClient} from "./apiClient";

export class APIService {
  static async get<T>(url: string, params?: object): Promise<T> {
    return apiClient.get<T>(url, {params}).then(res => res.data)
  }

  static async post<T, R = T>(url: string, data: T): Promise<R> {
    return apiClient.post<R>(url, data).then(res => res.data)
  }

  static async put<T, R = T>(url: string, data: T): Promise<R> {
    return apiClient.put<R>(url, data).then(res => res.data)
  }

  static async delete<T>(url: string): Promise<T> {
    return apiClient.delete<T>(url).then(res => res.data)
  }
}
