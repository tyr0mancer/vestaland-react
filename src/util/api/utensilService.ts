import {apiClient} from "./apiClient";
import {Utensil} from "../../models/utensil.model";

export const utensilienSucheService = async (searchQuery: string): Promise<Utensil[]> => {
  const response = await apiClient.get(`/utensil/?utensilienName=${searchQuery}`)
  return response.data;
};

export const utensilPostService = async (utensil: Utensil): Promise<Utensil> =>
  apiClient.post(`/utensil/`, utensil).then(res => res.data)
