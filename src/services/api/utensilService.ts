import {apiClient} from "./apiClient";
import {Utensil} from "../../models/utensil.model";

export const utensilienSucheService = async (searchQuery: string): Promise<Utensil[]> => {
  const response = await apiClient.get(`/utensilien?utensilienName=${searchQuery}`)
  return response.data;
};
