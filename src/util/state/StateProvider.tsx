import React, {useReducer} from 'react';

import {ActionTypes, CachePayloadType, DefaultDataSyncNodes, reducer} from "./reducers";
import {Kochstatus, RezeptPartial, GlobalState, StateContextType} from "./types";
import {Rezept} from "../../shared-types/models/Rezept";


const defaultState: GlobalState = {
  rezeptHistory: [],
  kochstatus: {
    meta: [],
    kochschrittFokusIndex: false,
    aktuellerKochschrittIndex: -1
  },
  dataSync: DefaultDataSyncNodes,
}

export enum LocalStorage {
  REZEPT_EDIT = 'REZEPT_EDIT',
  REZEPT_HISTORY = 'REZEPT_HISTORY',
  REZEPT_COOK = 'REZEPT_COOK',
  KOCHSTATUS = 'KOCHSTATUS',
}

export const StateContext = React.createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({children}: any) => {
  const initialState = () => {
    const rezeptEditString = localStorage.getItem(LocalStorage.REZEPT_EDIT);
    const rezeptHistoryString = localStorage.getItem(LocalStorage.REZEPT_HISTORY);
    const rezeptCookingString = localStorage.getItem(LocalStorage.REZEPT_COOK);
    const kochstatusString = localStorage.getItem(LocalStorage.KOCHSTATUS);

    return {
      ...defaultState,
      rezeptEditing: rezeptEditString ? JSON.parse(rezeptEditString) as Rezept : defaultState.rezeptEditing,
      rezeptCooking: rezeptCookingString ? JSON.parse(rezeptCookingString) as Rezept : defaultState.rezeptCooking,
      kochstatus: kochstatusString ? JSON.parse(kochstatusString) as Kochstatus : defaultState.kochstatus,
      rezeptHistory: rezeptHistoryString ? JSON.parse(rezeptHistoryString) as RezeptPartial[] : defaultState.rezeptHistory,
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState());

  const cache = state.dataSync
  const update = (payload: CachePayloadType) => {
    dispatch({type: ActionTypes.UPDATE_CACHE, payload})
  }

  return (
    <StateContext.Provider value={{state, dispatch, cache, update}}>
      {children}
    </StateContext.Provider>
  );
};
