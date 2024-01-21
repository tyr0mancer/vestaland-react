import React from "react";

type UrlViewerProps = {
  url?: string
}

/**
 * Formatiert 'Url' zur Darstellung
 *
 * @see Url
 */
export function UrlViewer({url}: UrlViewerProps): React.ReactElement {
  return (<pre>url: {JSON.stringify(url, null, 1)}</pre>)
}
