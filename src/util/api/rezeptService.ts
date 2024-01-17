import {apiClient} from "./apiClient";
import {Rezept} from "../../shared-types/models/Rezept";
import {KochschrittAktion} from "../../shared-types/models/KochschrittAktion";

import {RezeptSucheType} from "../../shared-types/schemas/rezept-schema";

export const rezeptSuche = (query: RezeptSucheType): Promise<Rezept[]> => {
  console.log(query)
  /*
    if (query.zutaten)
      queryString += `zutaten=${query.zutaten.toString()}`
  */

  return new Promise<Rezept[]>(resolve =>
    apiClient.get(`/rezept`)
      .then(({data}) => resolve(data))
  )
}

export const kochschrittConfigFindService = async (searchQuery: string): Promise<KochschrittAktion[]> =>
  apiClient.get(`/config/aktionen/?aktionName=${searchQuery}`).then(res => res.data)

export const kochschrittConfigPostService = async (body: KochschrittAktion): Promise<KochschrittAktion> =>
  apiClient.post(`/config/aktionen/`, body).then(res => res.data)
