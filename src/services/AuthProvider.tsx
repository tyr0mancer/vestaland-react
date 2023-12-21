import React, {createContext, useContext, useState} from 'react';

type AuthContextType = {
  authToken: string | null,
  login: (newToken: string) => void,
  logout: () => void

}

const AuthContext = createContext<AuthContextType>({
  authToken: null, login: (newToken: string) => {
    console.log(newToken)
  }, logout: () => {
  }
});

export const AuthProvider = ({children}: any) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const login = (newToken: string) => {
    setAuthToken(newToken);
  };

  const logout = () => {
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{authToken, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
