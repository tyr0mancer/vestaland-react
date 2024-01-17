import React from "react";
import {ErrorScreen} from "./ErrorScreen";

type AccessDeniedScreenProps = {}

/**
 * @component
 */
export function AccessDeniedScreen({}: AccessDeniedScreenProps): React.ReactElement {
  return <ErrorScreen error={{status: 403, message: "Keine Berechtigung"}}/>
}
