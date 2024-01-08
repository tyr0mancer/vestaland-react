import React, {createContext, useContext, useEffect, useState} from 'react';
import {ApiErrorResponse, BenutzerRolle, LoginResponse} from "./types";
import {isApiErrorResponse} from "../api/apiClient";
import {AuthService} from "../api/AuthService";

type AuthContextType = {
  authInfo: LoginResponse | null,
  isAuthorized: (requiredRole?: BenutzerRolle) => boolean,
  isOwner: (userId?: string) => boolean,
  logout: (LogoutFn?: () => Promise<void>) => Promise<any>
  login: (LoginFn: () => Promise<LoginResponse>) => Promise<any>,
  error?: ApiErrorResponse | null
}

const AuthContext = createContext<AuthContextType>({
  authInfo: null,
  logout: () => new Promise(() => {
  }),
  login: () => new Promise(() => {
  }),
  isAuthorized: () => false,
  isOwner: () => false

});

export const AuthProvider = ({children}: any) => {

  const [authInfo, setAuthInfo] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<ApiErrorResponse | null>(null)

  useEffect(() => {
    refresh(() => AuthService.refresh())
      .then(() => {
        //console.log("refreshing Token")
      }).catch(() => {
      //console.log(err.response.data)
    })
  }, [])


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
          console.error(error)
          return reject(error)
        })
    })
  }


  function refresh(refreshFn: () => Promise<LoginResponse>) {
    return new Promise((resolve, reject) => {
      refreshFn().then(res => {
        setAuthInfo(() => res)
        return resolve('RefreshToken')
      })
        .catch(error => {
          return reject(error)
        })
    })
  }


  async function logout(LogoutFn?: () => Promise<void>) {
    return new Promise(async (resolve) => {
      if (LogoutFn)
        await LogoutFn()
      setAuthInfo(null)
      return resolve('LoggedOut')
    })
  }

  function isAuthorized(role?: BenutzerRolle) {
    if (authInfo === null) return false
    if (!role)
      return true
    if (authInfo.rollen && authInfo.rollen.includes(BenutzerRolle.ADMIN))
      return true
    return (authInfo.rollen && authInfo.rollen.includes(role))
  }

  function isOwner(ownerId?: string) {
    if (!authInfo?.rollen) return false
    if (authInfo.rollen.includes(BenutzerRolle.ADMIN)) return true
    if (!authInfo.rollen.includes(BenutzerRolle.BENUTZER)) return false
    return (authInfo._id === ownerId)
  }

  return (
    <AuthContext.Provider value={{
      authInfo,
      logout,
      login,
      isAuthorized,
      error,
      isOwner
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
