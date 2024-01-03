import {apiClient, postServiceWrapper} from "./apiClient";
import {Lebensmittel} from "../../models/lebensmittel.model";

export const lebensmittelSuche = async (searchQuery: string): Promise<Lebensmittel[]> => {
  const response = await apiClient.get(`/lebensmittel?name=${searchQuery}`)
  return response.data;
};

export const lebensmittelDeleteService = async (id: string): Promise<any> => {
  return await apiClient.delete(`/lebensmittel/` + id)
};

export const lebensmittelPutService = async (id: string, lebensmittel: Lebensmittel): Promise<Lebensmittel> => {
  return await apiClient.put(`/lebensmittel/` + id, lebensmittel)
};

export const lebensmittelPostService = postServiceWrapper<Lebensmittel>((lebensmittel: Lebensmittel) => apiClient.post(`/lebensmittel`, lebensmittel))

