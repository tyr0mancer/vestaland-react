import React from "react";
import Chip from "@mui/material/Chip";
import {Tooltip} from "@mui/material";
import {UrlViewerProps} from "./types";


/**
 * Formatiert URL String
 * Falls durch ','
 *
 * @see Url
 */
export function UrlViewer({url}: UrlViewerProps): React.ReactElement {
  if (!url) return <></>

  const urlArray = url.split(',')
  return <Tooltip title={urlArray[0]}>
    <a href={'https://' + urlArray[0]} target="_blank" rel="noreferrer">
      <Chip
        label={urlArray[1] || urlArray[0]}
        color="secondary"
      /></a></Tooltip>
}
