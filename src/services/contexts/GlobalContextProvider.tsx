import React, {useState} from 'react';
import GlobalContext from "./globalContext";

// @todo sync with server
export interface RezeptSucheQuery {
  name: string,
  vegetarian: boolean,
  healthy: boolean,
  myRecipes: boolean
}

const rezeptSucheQueryDefault: RezeptSucheQuery = {
  name: '',
  myRecipes: false,
  vegetarian: false,
  healthy: false
}

//@todo getting too big, move to redux
export type GlobalContextType = {
  aktuellesRezept: string | null
  setAktuellesRezept: (s: string) => void
  rezeptSucheQuery: RezeptSucheQuery
  setRezeptSucheQuery: React.Dispatch<React.SetStateAction<RezeptSucheQuery>>
}


export const globalContextDefaultValue: GlobalContextType = {
  rezeptSucheQuery: rezeptSucheQueryDefault,
  setRezeptSucheQuery: () => undefined,
  aktuellesRezept: null,
  setAktuellesRezept: () => undefined,
}


export const GlobalContextProvider = ({children}: any) => {
  const [rezeptSucheQuery, setRezeptSucheQuery] = useState<RezeptSucheQuery>(rezeptSucheQueryDefault);
  const [aktuellesRezept, setAktuellesRezept] = useState<string | null>(null);

  return (
    <GlobalContext.Provider value={{rezeptSucheQuery, setRezeptSucheQuery, aktuellesRezept, setAktuellesRezept}}>
      {children}
    </GlobalContext.Provider>
  );
};
