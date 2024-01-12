import React, {useReducer} from 'react';

import {reducer} from "./reducers";
import {Kochstatus, RezeptPartial, RezeptSucheQuery, State, StateContextType} from "./types";
import {Rezept} from "../../shared-types/models/rezept.model";

const rezeptSucheQueryDefault: RezeptSucheQuery = {
  rezeptName: ''
}

const defaultState: State = {
  rezeptSucheQuery: rezeptSucheQueryDefault,
  rezeptHistory: [],
  kochstatus: {
    meta: [],
    kochschrittFokusIndex: false,
    aktuellerKochschrittIndex: -1
  }
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
    const rezeptCookingString = localStorage.getItem(LocalStorage.REZEPT_COOK);
    const rezeptHistoryString = localStorage.getItem(LocalStorage.REZEPT_HISTORY);
    const kochstatusString = localStorage.getItem(LocalStorage.REZEPT_HISTORY);

    return {
      ...defaultState,
      rezeptEditing: rezeptEditString ? JSON.parse(rezeptEditString) as Rezept : defaultState.rezeptEditing,
      rezeptCooking: rezeptCookingString ? JSON.parse(rezeptCookingString) as Rezept : defaultState.rezeptCooking,
      kochstatus: kochstatusString ? JSON.parse(kochstatusString) as Kochstatus : defaultState.kochstatus,
      rezeptHistory: rezeptHistoryString ? JSON.parse(rezeptHistoryString) as RezeptPartial[] : defaultState.rezeptHistory,
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState());


  return (
    <StateContext.Provider value={{state, dispatch}}>
      {children}
    </StateContext.Provider>
  );
};
