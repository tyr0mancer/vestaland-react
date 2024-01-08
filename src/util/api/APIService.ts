import {apiClient} from "./apiClient";

export class APIService {

  /**
   * Sucht Dokumente in der DB
   *
   * @param routePath - spezifischer Pfad, z.B. 'lebensmittel'
   * @param params - Suchfilter
   *
   * @returns Promise<T[]>
   */
  static async search<T>(routePath: string, params?: object): Promise<T[]> {
    return apiClient.get<T[]>(routePath, {params}).then(res => res.data)
  }

  /**
   * Liest ein Dokument aus der DB
   *
   * @param routePath - spezifischer Pfad, z.B. 'lebensmittel'
   * @param id - Die ObjectID des Dokuments das gelesen werden soll
   *
   * @returns Promise<T>
   */
  static async getById<T>(routePath: string, id: string): Promise<T> {
    return apiClient.get<T>(joinPaths(routePath, id)).then(res => res.data)
  }

  /**
   * Speichert ein neues Dokument in die DB
   *
   * @param routePath - spezifischer Pfad, z.B. 'lebensmittel'
   * @param data - das neue Dokument
   *
   * @returns Promise<R=T>
   */
  static async post<T, R = T>(routePath: string, data: T): Promise<R> {
    return apiClient.post<R>(routePath, data).then(res => res.data)
  }

  /**
   * Ändert ein Dokument in der DB
   *
   * @param routePath - spezifischer Pfad, z.B. 'lebensmittel'
   * @param id - Die ObjectID des Dokuments das geändert werden soll
   * @param data - das neue Dokument
   *
   * @returns Promise<R=T>
   */
  static async put<T, R = T>(routePath: string, id: string, data: T): Promise<R> {
    return apiClient.put<R>(joinPaths(routePath, id), data).then(res => res.data)
  }

  /**
   * Löscht ein Dokument aus der DB
   *
   * @param routePath - spezifischer Pfad, z.B. 'lebensmittel'
   * @param id - Die ObjectID des Dokuments das gelöscht werden soll
   * @returns Promise<any>
   */
  static async delete(routePath: string, id: string): Promise<any> {
    return apiClient.delete(joinPaths(routePath, id))
  }


  /**
   * Löscht mehrere Dokumente aus der DB
   *
   * @param routePath - spezifischer Pfad, z.B. 'lebensmittel'
   * @param ids - Array mit ObjectIDs der Dokumente die gelöscht werden sollen
   * @returns Promise<any>
   */
  static async deleteMany(routePath: string, ids: string[]): Promise<any> {
    return apiClient.delete(joinPaths(routePath, 'many/' + ids.join(','))).then(res => res.data)
  }


}


function joinPaths(basePath: string, relativePath: string): string {
  const normalizedBasePath = basePath.replace(/\/+$/, '');
  const normalizedRelativePath = relativePath.replace(/^\/+/, '');
  return `${normalizedBasePath}/${normalizedRelativePath}`;
}
