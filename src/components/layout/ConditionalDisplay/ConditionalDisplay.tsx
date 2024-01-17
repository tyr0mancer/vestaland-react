import React from "react";
import {ConditionalDisplayProps} from "./types";
import {useAuth} from "../../../util/auth/AuthProvider";
import {LoadingScreen} from "./LoadingScreen";
import {ErrorScreen} from "./ErrorScreen";
import {LoginScreen} from "./LoginScreen";
import {AccessDeniedScreen} from "./AccessDeniedScreen";

/**
 * `ConditionalDisplay` ist eine Higher-Order Component (HOC), die für die bedingte Anzeige von Komponenten basierend auf Authentifizierungsstatus, Benutzerrollen und Ladestatus verantwortlich ist. Sie ermöglicht es, Komponenteninhalte sicher und kontextabhängig darzustellen.
 *
 * @component
 * @example
 * <ConditionalDisplay restricted={Benutzer.ADMIN} status={{ error, loading, saving }}>
 *     <MainComponent/>
 * </ConditionalDisplay>
 *
 * @example
 * <ConditionalDisplay restricted>
 *     <MainComponent/>
 * </ConditionalDisplay>
 */
export function ConditionalDisplay({
                                     restricted,
                                     status,
                                     children,
                                     loginComponent
                                   }: ConditionalDisplayProps): React.ReactElement {
  const {isAuthorized} = useAuth();

  const loginRequired = () => (loginComponent) ? <>{loginComponent}</> : <LoginScreen/>
  const accessDenied = () => <AccessDeniedScreen/>

  // Zugriffsbeschränkung beachten
  if (restricted !== undefined) {
    if (!isAuthorized()) return loginRequired()
    if (Array.isArray(restricted) &&
      restricted.filter(requiredRole => isAuthorized(requiredRole)).length === 0)
      return accessDenied()
  }

  if (status?.error) return <ErrorScreen eror={status?.error}/>
  if (status?.isLoading) return <LoadingScreen/>
  if (status?.saving) return <LoadingScreen/>

  return <>
    {children}
  </>
}
