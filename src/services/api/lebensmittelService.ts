import {apiClient} from "./index";

export const lebensmittelSuche = async (searchQuery: string): Promise<any> => {
  const response = await apiClient.get(`/lebensmittel?name=${searchQuery}`)
  console.log('Called API', 'lebensmittelSuche')
  return response.data;
};


export const lebensmittelDetail = async (): Promise<any> => {
  const response = await apiClient.get('/lebensmittel');
  return response.data;
};
