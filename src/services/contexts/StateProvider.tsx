import React, {useReducer} from 'react';

import {reducer} from "./reducers";
import {RezeptSucheQuery, State, StateContextType} from "./types";


const rezeptSucheQueryDefault: RezeptSucheQuery = {
  rezeptName: ''
}

const defaultState: State = {
  rezeptSucheQuery: rezeptSucheQueryDefault,
  rezeptHistory: [],
  kochstatus: {
    kochschrittFokus: false,
    kochschrittIndex: -1
  }
}


export const StateContext = React.createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({children}: any) => {
  const initialState = () => {
    const rezeptEditString = localStorage.getItem('rezept_editor');
    const rezeptCookingString = localStorage.getItem('rezept_cooking');
    const kochstatusString = localStorage.getItem('kochstatus');

    return {
      ...defaultState,
      rezeptEditing: rezeptEditString ? JSON.parse(rezeptEditString) : defaultState.rezeptEditing,
      rezeptCooking: rezeptCookingString ? JSON.parse(rezeptCookingString) : defaultState.rezeptCooking,
      kochstatus: kochstatusString ? JSON.parse(kochstatusString) : defaultState.kochstatus
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState());


  return (
    <StateContext.Provider value={{state, dispatch}}>
      {children}
    </StateContext.Provider>
  );
};
