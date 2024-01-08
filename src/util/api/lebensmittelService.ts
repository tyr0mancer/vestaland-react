import {apiClient} from "./apiClient";
import {Lebensmittel} from "../../models/lebensmittel.model";

/**
 * Sucht Lebensmittel nach Namen
 *
 * @example
 * queryFn: () => lebensmittelSucheService(input)
 *
 * @param searchQuery - Der Name des Lebensmittels
 * @returns Promise<Lebensmittel[]>
 */
export const lebensmittelSucheService = async (searchQuery: string): Promise<Lebensmittel[]> =>
  apiClient.get(`/lebensmittel?name=${searchQuery}`).then(res => res.data)

/**
 * Löscht ein Lebensmittel aus der DB
 *
 * @param id - Die ObjectID des Lebensmittels das gelöscht werden soll
 * @returns Promise<any>
 */
export const lebensmittelDeleteService = async (id: string): Promise<any> =>
  apiClient.delete(`/lebensmittel/` + id).then(res => res.data)


/**
 * Löscht mehrere Lebensmittel aus der DB
 *
 * @param ids: string[] - Die ObjectID der Lebensmittels die gelöscht werden sollen als string array
 * @returns Promise<any>
 */
export const deleteManyLebensmittelSerivce = async (ids: string[]): Promise<any> => {
  return apiClient.delete(`/lebensmittel/many/` + ids.join(','),).then(res => res.data)
}


/**
 * Aktualisiert ein Lebensmittel in der DB
 *
 * @param id - Die ObjectID des Lebensmittels das aktualisiert werden sol
 * @param lebensmittel - Das neue Lebensmittel
 * @returns Promise<Lebensmittel> - Das neue Lebensmittel wie in der DB gespeichert
 */
export const lebensmittelPutService = async (id: string, lebensmittel: Lebensmittel): Promise<Lebensmittel> =>
  apiClient.put(`/lebensmittel/` + id, lebensmittel).then(res => res.data)

/**
 * Speichert neues Lebensmittel
 *
 * @param lebensmittel - Das neue Lebensmittel
 * @returns Promise<Lebensmittel[]>
 */
export const lebensmittelPostService = async (lebensmittel: Lebensmittel): Promise<Lebensmittel> =>
  apiClient.post(`/lebensmittel/`, lebensmittel).then(res => res.data)
