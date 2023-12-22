import {apiClient} from "./apiClient";
import {Lebensmittel} from "../../models/lebensmittel.model";

export const lebensmittelSuche = async (searchQuery: string): Promise<Lebensmittel[]> => {
  const response = await apiClient.get(`/lebensmittel?name=${searchQuery}`)
  return response.data;
};


export const lebensmittelImport = async (): Promise<any> => {
  return await apiClient.post(`/lebensmittel/import`, [])
};
