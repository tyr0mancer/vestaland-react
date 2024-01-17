import React from "react";
import {ErrorScreen} from "./ErrorScreen";

/**
 * @component
 */
export function AccessDeniedScreen(): React.ReactElement {
  return <ErrorScreen error={{status: 403, message: "Keine Berechtigung"}}/>
}
