import React, {createContext, useContext, useEffect, useState} from 'react';
import {ApiErrorResponse, BenutzerRolle, LoginProps, LoginResponse} from "./types";
import {isApiErrorResponse} from "../api/apiClient";
import {AuthService} from "./AuthService";
import config from "../../config";

type AuthContextType = {
  authInfo: LoginResponse | null,
  isAuthorized: (requiredRole?: BenutzerRolle) => boolean,
  isOwner: (userId?: string) => boolean,
  logout: () => Promise<any>,
  login: (loginInfo?: LoginProps) => Promise<any>,
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

  /*
    Beim ersten Rendern der App: versuche ein auth-token zu erhalten.
  */
  useEffect(() => {
    refresh(() => AuthService.refresh())
      .then(() => {
        if (config.devMode)
          console.log("refreshing Token")
      }).catch((error) => {
      if (config.devMode)
        console.error(error)
    })
  }, [])

  /*
    Das Refresh-Token wird als HTTP-only unter der Domain des express Servers gesendet, sofern der User noch eingeloggt war.
  */
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


  async function handleLogin(loginInfo?: LoginProps) {
    AuthService.login(loginInfo)
      .then(res => {
        setAuthInfo(res)
      })
      .catch(error => {
        if (isApiErrorResponse(error.response?.data)) {
          setError(error.response?.data)
        }
        console.error(error)
      })
  }


  async function handleLogout() {
    AuthService.logout()
      .then(() => setAuthInfo(null))
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
      login: handleLogin,
      logout: handleLogout,
      isAuthorized,
      error,
      isOwner
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
