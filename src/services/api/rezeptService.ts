import {apiClient} from "./apiClient";
import {Rezept} from "../../models/rezept.model";

export const rezeptSuche = (searchQuery: string): Promise<Rezept[]> =>
  new Promise<Rezept[]>(resolve =>
    apiClient.get(`/rezept?name=${searchQuery}`)
      .then(({data}) => resolve(data)
      )
  )


export const rezeptDetail = async (rezeptId: string): Promise<Rezept> => {
  const response = await apiClient.get(`/rezept/${rezeptId}`)
  return response.data;
};


export const rezeptPostService = (rezept?: Rezept): Promise<Rezept> =>
  new Promise<Rezept>((resolve, reject) =>
    apiClient.post(`/rezept`, rezept)
      .then(({data}) => resolve(data))
      .catch(error => reject(error))
  )

export const rezeptPutService = (rezept?: Rezept): Promise<Rezept> =>
  new Promise<Rezept>((resolve, reject) =>
    apiClient.put(`/rezept/${rezept?._id}`, rezept)
      .then(({data}) => resolve(data))
      .catch(error => reject(error))
  )
