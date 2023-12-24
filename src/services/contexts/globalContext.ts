// ThemeContext.js
import React from 'react';
import {globalContextDefaultValue, GlobalContextType} from "./GlobalContextProvider";

const GlobalContext = React.createContext<GlobalContextType>(globalContextDefaultValue);

export default GlobalContext;
