import React, {createContext, useContext, useEffect, useState} from 'react';
import {AuthService} from "./AuthService";
import {config} from "../config";

import {BenutzerRolle} from "../../shared-types/enum";
import {ApiErrorResponse, LoginResponseType} from "../../shared-types/types";
import {LoginType} from "../../shared-types/schemas/benutzer-schema";

type AuthContextType = {
  authInfo: LoginResponseType | null,
  isAuthorized: (requiredRole?: BenutzerRolle) => boolean,
  isOwner: (userId?: string) => boolean,
  logout: () => Promise<any>,
  handleLogin: (loginInfo?: LoginType) => Promise<any>,
  error?: ApiErrorResponse | null
}

const AuthContext = createContext<AuthContextType>({
  authInfo: null,
  logout: () => new Promise(() => {
  }),
  handleLogin: () => new Promise(() => {
  }),
  isAuthorized: () => false,
  isOwner: () => false

});

/**
 * Context Provider um useAuth in darin befindlichen Komponenten bereitzustellen
 *
 * @param children
 *
 * @see refresh
 *
 */
export const AuthProvider = ({children}: any) => {

  const [authInfo, setAuthInfo] = useState<LoginResponseType | null>(null);
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
      if (config.devMode) {
        console.log(error)
      }

    })
  }, [])

  /*
    Das Refresh-Token wird als HTTP-only unter der Domain des express Servers gesendet, sofern der User noch eingeloggt war.
  */
  function refresh(refreshFn: () => Promise<LoginResponseType>) {
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


  /**
   *
   * @see LoginSchema
   *
   * @param loginInfo
   */
  async function handleLogin(loginInfo?: LoginType) {
    return new Promise<LoginResponseType>((resolve) => {
      AuthService.login(loginInfo)
        .then(authInfo => {
          setAuthInfo(authInfo)
          resolve(authInfo)
        })
        .catch(error => {
          if (isAuthError(error.response?.data))
            setError(error.response?.data)
          else
            setError(error)
        })
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
      handleLogin: handleLogin,
      logout: handleLogout,
      isAuthorized,
      error,
      isOwner
    }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom Hook um in Komponenten auf den Auth-Status zugreifen zu können
 *
 * @example
 * const {isAuthorized} = useAuth()
 * { isAuthorized(BenutzerRolle.ADMIN) && <AdminComponent /> }
 */
export const useAuth = () => useContext(AuthContext);


function isAuthError(obj: any): obj is ApiErrorResponse {
  return obj
    && typeof obj.status === 'number'
    && typeof obj.message === 'string';
}
