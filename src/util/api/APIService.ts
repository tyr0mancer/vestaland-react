import {apiClient} from "./apiClient";
import {AxiosResponse} from "axios";

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
  static async getById<T>(routePath: string, id?: string): Promise<T> {
    if (!id) throw new Error("ID is required");
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
   * Ändert ein Dokument in der DB
   *
   * @param routePath - spezifischer Pfad, z.B. 'lebensmittel'
   * @param id - Die ObjectID des Dokuments das geändert werden soll
   * @param updates - Änderungen am Dokument
   *
   * @returns Promise<R=T>
   */
  static async patch<T, U = Partial<T>, R = T>(routePath: string, id: string, updates: U): Promise<R> {
    return apiClient.put<R>(joinPaths(routePath, id), updates).then(res => res.data)
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
   * Setzt Content-Type auf "multipart/form-data" um Dateien zur API zu senden.
   *
   * @param routePath - spezifischer Pfad, z.B. 'datei'
   * @param file - Die Datei die hochgeladen werden soll
   * @param fileKey - verwendeter Name für FormData.append()
   * @returns Promise<T>
   */
  static async upload<T>(routePath: string, file: File, fileKey: string = 'bild'): Promise<T> {
    const formData = new FormData();
    formData.append(fileKey, file, file.name);
    return apiClient.post<FormData, AxiosResponse<T>>(routePath, formData, {headers: {"Content-Type": "multipart/form-data",}}).then(res => res.data)
  }


}


function joinPaths(basePath: string, relativePath: string): string {
  const normalizedBasePath = basePath.replace(/\/+$/, '');
  const normalizedRelativePath = relativePath.replace(/^\/+/, '');
  return `${normalizedBasePath}/${normalizedRelativePath}`;
}
