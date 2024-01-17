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
 *
 * @param {ConditionalDisplayProps} props - Die Props für die CondDisplay Komponente.
 * @param {boolean | BenutzerRolle[]} [props.restricted] - Wenn `true`, wird ein gültiges Token benötigt. Bei Angabe von Benutzerrollen müssen diese vom Benutzer erfüllt werden.
 * @param {Object} [props.status] - Statusobjekt mit Eigenschaften wie `error`, `loading` und `saving`, um entsprechende Bildschirme anzuzeigen.
 * @param {React.ReactElement} [props.children] - Die Kinderkomponenten, die angezeigt werden, wenn alle Bedingungen erfüllt sind.
 * @param {React.ReactElement} [props.authRedirect] - Alternative Komponente, die angezeigt wird, wenn der Zugriff verweigert wird.
 * @returns {React.ReactElement} - Eine React-Komponente, die auf den gegebenen Bedingungen basiert.
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
