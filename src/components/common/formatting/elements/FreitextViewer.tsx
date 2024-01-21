import React from "react";

type FreitextViewerProps = {
  freitext?: string
}

/**
 * Formatiert 'Freitext' zur Darstellung
 */
export function FreitextViewer({freitext}: FreitextViewerProps): React.ReactElement {
  return (<pre>freitext: "{freitext}"</pre>)
}
