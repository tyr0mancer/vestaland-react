import {apiClient} from "./apiClient";
import {AxiosResponse} from "axios";
import {ApiRoutePath} from "../../shared-types/config";

/**
 * Service Klasse um API Anfragen mit Hilfe des apiClients zu realisieren.
 * Verwendet generics
 *
 * @example Verwendung mit useQuery
 * queryFn: () => APIService.search<Utensil>('utensil', {utensilienName: input})
 *
 * @example Verwendung in async Funktion
 * const res = await APIService.upload('datei', values)
 */
export class APIService {

  /**
   * Sucht Dokumente in der DB
   *
   * @param routePath - spezifischer Pfad, z.B. 'lebensmittel'
   * @param params - Suchfilter
   *
   * @returns Promise<T[]>
   */
  static async search<T>(routePath: ApiRoutePath, params?: object): Promise<T[]> {
    return new Promise<T[]>((resolve) =>
      apiClient
        .get<T[]>(routePath, {params})
        .then(res => resolve(res?.data || []))
        .catch(handleApiError)
    )
  }

  /**
   * Liest ein Dokument aus der DB
   *
   * @param routePath - spezifischer Pfad, z.B. 'lebensmittel'
   * @param id - Die ObjectID des Dokuments das gelesen werden soll
   *
   * @returns Promise<T>
   */
  static async getById<T>(routePath: ApiRoutePath, id?: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (!id) return reject("ID is required")
      apiClient.get<T>(joinPaths(routePath, id)).then(res => resolve(res.data)).catch(handleApiError)
    })
  }

  /**
   * Speichert ein neues Dokument in die DB
   *
   * @param routePath - spezifischer Pfad, z.B. 'lebensmittel'
   * @param data - das neue Dokument
   *
   * @returns Promise<R=T>
   */
  static async post<T, R = T>(routePath: ApiRoutePath, data: T): Promise<R> {
    return new Promise<R>((resolve) =>
      apiClient.post<R>(routePath, data).then(res => resolve(res.data)).catch(handleApiError)
    )
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
  static async put<T, R = T>(routePath: ApiRoutePath, id: string, data: T): Promise<R> {
    return new Promise<R>((resolve) =>
      apiClient.put<R>(joinPaths(routePath, id), data).then(res => resolve(res.data)).catch(handleApiError)
    )
  }

  /**
   * Ändert ein Dokument in der DB
   *
   * @param routePath - spezifischer Pfad, z.B. 'lebensmittel'
   * @param id - Die ObjectID des Dokuments das geändert werden soll
   * @param updates - Änderungen am Dokument
   *
   * @returns Promise<R=T>
   */
  static async patch<T, U = Partial<T>, R = T>(routePath: ApiRoutePath, id: string, updates: U): Promise<R> {
    return new Promise<R>((resolve) =>
      apiClient.put<R>(joinPaths(routePath, id), updates).then(res => resolve(res.data)).catch(handleApiError)
    )
  }

  /**
   * Löscht ein Dokument aus der DB
   *
   * @param routePath - spezifischer Pfad, z.B. 'lebensmittel'
   * @param id - Die ObjectID des Dokuments das gelöscht werden soll
   * @returns Promise<any>
   */
  static async delete(routePath: ApiRoutePath, id: string): Promise<any> {
    return new Promise<any>((resolve) =>
      apiClient.delete(joinPaths(routePath, id)).then(res => resolve(res.data)).catch(handleApiError)
    )
  }


  /**
   * Setzt Content-Type auf "multipart/form-data" um Dateien zur API zu senden.
   *
   * @param routePath - spezifischer Pfad, z.B. 'datei'
   * @param file - Die Datei die hochgeladen werden soll
   * @param fileKey - verwendeter Name für FormData.append()
   * @returns Promise<T>
   */
  static async upload<T>(routePath: ApiRoutePath, file: File, fileKey: string = 'bild'): Promise<T> {
    const formData = new FormData();
    formData.append(fileKey, file, file.name);

    return new Promise<any>((resolve) =>
      apiClient.post<FormData, AxiosResponse<T>>(routePath, formData, {headers: {"Content-Type": "multipart/form-data",}})
        .then(res => resolve(res.data))
        .catch(handleApiError)
    )
  }


}


function joinPaths(basePath: string, relativePath: string): string {
  const normalizedBasePath = basePath.replace(/\/+$/, '');
  const normalizedRelativePath = relativePath.replace(/^\/+/, '');
  return `${normalizedBasePath}/${normalizedRelativePath}`;
}


function handleApiError(error: any) {
  console.log(error)
}
