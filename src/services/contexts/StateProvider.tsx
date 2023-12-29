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
  rezeptHistory: []
}


export const StateContext = React.createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(reducer, defaultState);


  return (
    <StateContext.Provider value={{state, dispatch}}>
      {children}
    </StateContext.Provider>
  );
};
