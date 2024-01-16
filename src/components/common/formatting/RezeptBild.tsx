import React from "react";
import {Datei} from "../../../shared-types/models/Datei";
import {config} from "../../../util/config";

const DUMMY = 'https://api.vestaland.de/public/platzhalter.jpg'

export function getFileUrl(filename?: string) {
  if (!filename)
    return DUMMY
  return config.imgBaseUrl + filename
}

interface RezeptBildProps {
  bild?: Datei,
  alt?: string,
  size?: 'small' | 'medium'
}

/**
 * TS Doc Info
 * @component RezeptBild
 */
export function RezeptBild({bild, alt = 'Bild zu Rezept', size = 'medium'}: RezeptBildProps): React.ReactElement {
  let height = 150
  if (size === 'small')
    height = 100
  return (<img src={getFileUrl(bild?.filename)} height={height} width={'100%'} alt={alt} title={alt}/>)
}
