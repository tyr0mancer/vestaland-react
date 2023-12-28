import {apiClient} from "./apiClient";
import {Hilfsmittel} from "../../models/hilfsmittel.model";

export const hilfsmittelSuche = async (searchQuery: string): Promise<Hilfsmittel[]> => {
  const response = await apiClient.get(`/hilfsmittel?name=${searchQuery}`)
  return response.data;
};
