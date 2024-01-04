import {apiClient} from "./apiClient";
import {Rezept} from "../../models/rezept.model";
import {KochschrittAktion} from "../../models/kochschritt-aktion.model";

import {RezeptSucheQuery} from "../contexts/types";

export const rezeptSuche = (query: RezeptSucheQuery): Promise<Rezept[]> => {

  let queryString = `name=${query.rezeptName}`
  if (query.vegetarisch)
    queryString += `&vegetarisch=1`
  if (query.healthy)
    queryString += `&healthy=1`
  if (query.myRecipes)
    queryString += `&myRecipes=1`
  if (query.soulfood)
    queryString += `&soulfood=1`
  if (query.zutaten)
    queryString += `zutaten=${query.zutaten.toString()}`

  return new Promise<Rezept[]>(resolve =>
    apiClient.get(`/rezept?${queryString}`)
      .then(({data}) => resolve(data))
  )
}


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


export const kochschrittConfigFindService = async (searchQuery: string): Promise<KochschrittAktion[]> =>
  apiClient.get(`/config/aktionen/?aktionName=${searchQuery}`).then(res => res.data)

export const kochschrittConfigPostService = async (body: KochschrittAktion): Promise<KochschrittAktion> =>
  apiClient.post(`/config/aktionen/`, body).then(res => res.data)
