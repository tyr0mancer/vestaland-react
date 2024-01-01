import {Rezept} from "../../models/rezept.model";
import {apiClient} from "./apiClient";

const BASE_URL = 'https://api.vestaland.de/public/uploads/'
const DUMMY = 'https://api.vestaland.de/public/platzhalter.jpg'

export function getFileUrl(filename?: string) {
  if (!filename)
    return DUMMY
  return BASE_URL + filename
}

export const loescheBild = async (bildId: string): Promise<Rezept> => {
  const response = await apiClient.delete(`/datei/${bildId}`)
  return response.data;
};

export const uploadeBildService = async (bildId: string): Promise<Rezept> => {
  const response = await apiClient.post(`/datei/${bildId}`)
  return response.data;
};
