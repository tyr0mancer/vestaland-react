import React from "react";
import {BenutzerRolle} from "../../../shared-types/enum";
import {UseDataSyncReturn} from "../../../util/state/useDataSync";
import {LoadingScreen} from "./LoadingScreen";
import {ErrorScreen} from "./ErrorScreen";
import {useAuth} from "../../../util/auth/AuthProvider";

type StatusWrapperProps<T> = {
  children?: React.ReactNode,
  requiredRole?: BenutzerRolle | 'any',
  dataSync: Partial<UseDataSyncReturn<any>>;
}

// @todo weiterleiten zu login? token dauer prüfen? und wie bzgl. PWA?
// vermutlich nicht hier, aber jetzt schreibe ich schonmal.

/**
 * TS Doc Info
 * @component StatusWrapper
 *
 * @param requiredRole Falls gesetzt erfordert der Zugriff ein gültiges Token. Falls ungleich 'any' prüfe auch die Rolle
 * @param {isLoading, error}
 * @param children
 *
 */
export function StatusWrapper({
                                requiredRole,
                                dataSync: {isLoading, error},
                                children
                              }: StatusWrapperProps<any>): React.ReactElement {

  const {isAuthorized} = useAuth();
  if (requiredRole &&
    (requiredRole === 'any' && !isAuthorized()) || (requiredRole !== 'any' && !isAuthorized(requiredRole))
  ) return <ErrorScreen error={{status: 403, message: "Keine Berechtigung"}}/>

  if (isLoading) return <LoadingScreen/>
  if (error) return <ErrorScreen eror={error}/>

  return <>
    {children}
  </>
}
