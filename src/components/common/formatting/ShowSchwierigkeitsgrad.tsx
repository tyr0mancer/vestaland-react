import React from "react";

interface ShowSchwierigkeitsgradProps {
  schwierigkeitsgrad?: number
}

/**
 * TS Doc Info
 * @component ShowSchwierigkeitsgrad
 */
export function ShowSchwierigkeitsgrad({schwierigkeitsgrad}: ShowSchwierigkeitsgradProps): React.ReactElement {
  return (<div>ShowSchwierigkeitsgrad: {schwierigkeitsgrad || '9000'}</div>)
}
