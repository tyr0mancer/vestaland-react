import React from "react";
import {ConditionalDisplayProps} from "./types";
import {useAuth} from "../../../util/auth/AuthProvider";
import {LoginForm} from "../../pages/benutzer";
import {LoadingScreen} from "./LoadingScreen";
import {ErrorScreen} from "./ErrorScreen";

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
export function ConditionalDisplay({restricted, status, children, authRedirect}: ConditionalDisplayProps): React.ReactElement {
  const {isAuthorized} = useAuth();

  const accessDenied = () => {
    if (authRedirect)
      return <>{authRedirect}</>
    return <LoginForm/>
  }

  // Zugriffsbeschränkung beachten
  if (restricted !== undefined) {
    if (!isAuthorized()) return accessDenied()
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
