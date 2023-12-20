import {apiClient} from "./index";

export const lebensmittelSuche = async (): Promise<any> => {
  const response = await apiClient.get('/lebensmittel');
  console.log('Called API')
  return response.data;
};


export const lebensmittelDetail = async (): Promise<any> => {
  const response = await apiClient.get('/lebensmittel');
  return response.data;
};
