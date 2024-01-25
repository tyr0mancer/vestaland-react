import {CachePayloadType} from "./reducers";
import {GlobalState} from "./types";

// @hausarbeit
export function updateCacheReducer(state: GlobalState, payload: CachePayloadType): GlobalState {

  const dataSync = {...state.dataSync}

  switch (payload.key) {
    case "lebensmittel":
      dataSync["lebensmittel"] = payload.data
      break
    case "einkaufslisten":
      dataSync["einkaufslisten"] = payload.data
      break
    case "rezeptSuche":
      dataSync["rezeptSuche"] = payload.data
      break
    case "rezeptEdit":
      dataSync["rezeptEdit"] = payload.data
      break
  }

  return {...state, dataSync}

  /*
  // @ts-ignore
  dataSync[payload.key] = payload.data
  */
}
