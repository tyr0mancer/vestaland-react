import {apiClient} from "./index";

export const rezeptSuche = async (searchQuery: string): Promise<any> => {
  const response = await apiClient.get(`/rezept?name=${searchQuery}`)
  console.log('Called API', 'rezeptSuche',searchQuery)
  return response.data;
};


export const rezeptDetail = async (rezeptId: string): Promise<any> => {
  const response = await apiClient.get(`/rezept/${rezeptId}`)
  console.log('Called API', 'rezeptDetail', rezeptId)
  return response.data;
};
