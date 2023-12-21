// ThemeContext.js
import React from 'react';

type GlobalContextType = {
  rezeptSuche: string
  setRezeptSuche: (s: string) => void
}

const GlobalContext = React.createContext<GlobalContextType>({rezeptSuche: '', setRezeptSuche: (s: string) => {}});

export default GlobalContext;
