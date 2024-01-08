import {apiClient} from "./apiClient";
import {Datei} from "../../shared-types/models/Datei";
import config from "../../config";

const DUMMY = 'https://api.vestaland.de/public/platzhalter.jpg'

export function getFileUrl(filename?: string) {
  if (!filename)
    return DUMMY
  return config.imgBaseUrl + filename
}

export const fileUploadService = async (datei: File): Promise<Datei> => {
  const formData = new FormData();
  formData.append("file", datei, datei.name);
  return apiClient.post(`/datei`, formData, {headers: {"Content-Type": "multipart/form-data",}}).then(res => res.data)
}
