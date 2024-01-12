import {CachePayloadType} from "./reducers";
import {GlobalState} from "./types";

export function updateCacheReducer(state: GlobalState, payload: CachePayloadType): GlobalState {

  const dataSync = {...state.dataSync}

  // @ts-ignore
  dataSync[payload.key] = payload.data
  return {...state, dataSync}

  /*

    switch (payload.key) {
      case 'rezeptEdit': {
        console.log(state)
        const dataSync = {...state.dataSync, rezeptEdit: payload.data}
        return {...state, dataSync}
      }
      default:
        return state
    }
  */

}
