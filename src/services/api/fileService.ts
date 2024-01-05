import {Rezept} from "../../models/rezept.model";
import {apiClient} from "./apiClient";
import {Datei} from "../../models/datei.model";
import config from "../../config";

const DUMMY = 'https://api.vestaland.de/public/platzhalter.jpg'

export function getFileUrl(filename?: string) {
  if (!filename)
    return DUMMY
  return config.imgBaseUrl + filename
}

export const loescheBild = async (bildId: string): Promise<Rezept> => {
  const response = await apiClient.delete(`/datei/${bildId}`)
  return response.data;
};

export const uploadeBildService = async (bildId: string): Promise<Rezept> => {
  const response = await apiClient.post(`/datei/${bildId}`)
  return response.data;
};


export const fileUploadService = async (datei: File): Promise<Datei> => {
  const formData = new FormData();
  formData.append("file", datei, datei.name);
  return apiClient.post(`/datei`, formData, {headers: {"Content-Type": "multipart/form-data",}}).then(res => res.data)
}
