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
}


export const StateContext = React.createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({children}: any) => {
  const initialState = () => {
    const rezeptCookingString = localStorage.getItem('rezept_cooking');
    const rezeptEditString = localStorage.getItem('rezept_editor');

    //return rezeptCookingString ? {...defaultState, rezeptCooking: JSON.parse(rezeptCookingString)} : defaultState;
    return {
      ...defaultState,
      rezeptCooking: rezeptCookingString ? JSON.parse(rezeptCookingString) : undefined,
      rezeptEditing: rezeptEditString ? JSON.parse(rezeptEditString) : undefined
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState());


  return (
    <StateContext.Provider value={{state, dispatch}}>
      {children}
    </StateContext.Provider>
  );
};
