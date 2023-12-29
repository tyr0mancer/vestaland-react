import React, {useReducer} from 'react';

import {reducer} from "./reducers";
import {RezeptSucheQuery, State, StateContextType} from "./types";


const rezeptSucheQueryDefault: RezeptSucheQuery = {
  name: '',
  myRecipes: false,
  vegetarian: false,
  healthy: false,
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
    const rezeptCookingString = localStorage.getItem('rezept_cooking');
    const rezeptEditString = localStorage.getItem('rezept_editor');
    const kochstatusString = localStorage.getItem('kochstatus');


    return {
      ...defaultState,
      rezeptCooking: rezeptCookingString ? JSON.parse(rezeptCookingString) : defaultState.rezeptCooking,
      rezeptEditing: rezeptEditString ? JSON.parse(rezeptEditString) : defaultState.rezeptEditing,
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
