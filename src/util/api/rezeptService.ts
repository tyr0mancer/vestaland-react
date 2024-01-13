import {apiClient} from "./apiClient";
import {Rezept} from "../../shared-types/model/Rezept";
import {KochschrittAktion} from "../../shared-types/model/KochschrittAktion";

import {RezeptSucheQuery} from "../state/types";

export const rezeptSuche = (query: RezeptSucheQuery): Promise<Rezept[]> => {

  //@todo iterate over a string[] array
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

export const kochschrittConfigFindService = async (searchQuery: string): Promise<KochschrittAktion[]> =>
  apiClient.get(`/config/aktionen/?aktionName=${searchQuery}`).then(res => res.data)

export const kochschrittConfigPostService = async (body: KochschrittAktion): Promise<KochschrittAktion> =>
  apiClient.post(`/config/aktionen/`, body).then(res => res.data)
