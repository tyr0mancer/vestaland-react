import React, {useState} from 'react';
import GlobalContext from "./globalContext";

export const GlobalContextProvider = ({children}: any) => {
  const [rezeptSuche, setRezeptSuche] = useState('');

  return (
    <GlobalContext.Provider value={{rezeptSuche, setRezeptSuche}}>
      {children}
    </GlobalContext.Provider>
  );
};
