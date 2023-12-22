import React, {createContext, useContext, useState} from 'react';
import {BenutzerRolle, LoginResponse} from "./types";

type AuthContextType = {
  authInfo: LoginResponse | null,
  isAuthorized: (requiredRole?: BenutzerRolle) => boolean,
  logout: (LogoutFn?: () => Promise<void>) => void
  login: (LoginFn: () => Promise<LoginResponse>) => void
}

const AuthContext = createContext<AuthContextType>({
  authInfo: null,
  logout: () => {
  },
  login: () => {
  },
  isAuthorized: () => false
});

export const AuthProvider = ({children}: any) => {
  const [authInfo, setAuthInfo] = useState<LoginResponse | null>(null);

  function login(LoginFn?: () => Promise<LoginResponse>) {
    if (!LoginFn) return
    LoginFn().then(res => {
      setAuthInfo(res)
    })
  }

  async function logout(LogoutFn?: () => Promise<void>) {
    if (LogoutFn)
      await LogoutFn()
    setAuthInfo(null)
  }

  function isAuthorized(role?: BenutzerRolle) {
    if (authInfo === null) return false
    if (!role)
      return true
    if (authInfo.rollen && authInfo.rollen.includes(BenutzerRolle.ADMIN))
      return true
    return (authInfo.rollen && authInfo.rollen.includes(role))
  }


  return (
    <AuthContext.Provider value={{
      authInfo,
      logout,
      login,
      isAuthorized
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
