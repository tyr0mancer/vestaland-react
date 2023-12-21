import {apiClient} from "./index";
import {Rezept} from "../../models/rezept.model";

export const rezeptSuche = async (searchQuery: string): Promise<Rezept[]> => {
  const response = await apiClient.get(`/rezept?name=${searchQuery}`)
  return response.data;
};

export const rezeptDetail = async (rezeptId: string): Promise<Rezept> => {
  const response = await apiClient.get(`/rezept/${rezeptId}`)
  return response.data;
};
