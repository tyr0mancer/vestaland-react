import React, {createContext, useContext, useState} from 'react';
import {ApiErrorResponse, BenutzerRolle, LoginResponse} from "./types";
import {isApiErrorResponse} from "../api/apiClient";

type AuthContextType = {
  authInfo: LoginResponse | null,
  isAuthorized: (requiredRole?: BenutzerRolle) => boolean,
  logout: (LogoutFn?: () => Promise<void>) => void
  login: (LoginFn: () => Promise<LoginResponse>) => Promise<any>,
  error?: ApiErrorResponse | null
}

const AuthContext = createContext<AuthContextType>({
  authInfo: null,
  logout: () => {
  },
  login: () => new Promise(() => {
  }),
  isAuthorized: () => false
});

export const AuthProvider = ({children}: any) => {
  const [authInfo, setAuthInfo] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<ApiErrorResponse | null>(null)

  function login(LoginFn?: () => Promise<LoginResponse>) {
    return new Promise((resolve, reject) => {
      if (!LoginFn) return reject("LoginFn missing")

      LoginFn().then(res => {
        setAuthInfo(() => res)
        return resolve('LoggedIn')
      })
        .catch(error => {
          if (isApiErrorResponse(error.response?.data)) {
            setError(() => error.response?.data)
            return reject(error)
          }
          alert(error.message)
          return reject(error)
        })
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
      isAuthorized,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
