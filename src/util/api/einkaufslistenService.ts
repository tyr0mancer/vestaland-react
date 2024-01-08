import {apiClient} from "./apiClient";
import {Einkaufsliste, EinkaufslisteEintrag} from "../../models/einkaufsliste.model";

/**
 * Fragt alle eigenen Einkaufslisten-Einträge und Einträge mit Leserecht in einer Abfrage ab
 *
 * @example
 * queryFn: () => einkaufslistenAbfrageService()
 *
 * @see Einkaufsliste
 *
 * @returns Promise<Einkaufsliste[]>
 */
export const einkaufslistenAbfrageService = async (): Promise<Einkaufsliste[]> =>
  apiClient.get(`/einkaufsliste/`).then(res => res.data)


export const einkaufslistenEintragPostService = async (listeId: string, body: EinkaufslisteEintrag): Promise<EinkaufslisteEintrag> =>
  apiClient.post(`/einkaufsliste/${listeId}/eintrag`, body).then(res => res.data)

export const einkaufslistenEintragPutService = async (id: string, body: EinkaufslisteEintrag): Promise<EinkaufslisteEintrag> =>
  apiClient.put(`/einkaufslisten-eintrag/${id}`, body).then(res => res.data)

export const einkaufslistenEintragDeleteService = async (id: string): Promise<EinkaufslisteEintrag> =>
  apiClient.delete(`/einkaufslisten-eintrag/${id}`).then(res => res.data)
