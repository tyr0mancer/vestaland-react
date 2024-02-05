import React from "react";
import {AktionIcon} from "../../../shared-types/enum";
import {AktionIconProperties} from "../../../shared-types/enum/AktionIconProperties";

interface AktionIconImageProps {
  aktionIcon?: AktionIcon | undefined
  size?: number
}

/**
 * TS Doc Info
 * @component AktionIconImage
 */
export function AktionIconImage({aktionIcon, size = 20}: AktionIconImageProps) {

  let icon = require('../../../assets/images/icons/dummy.png')
  try {
    if (aktionIcon)
      icon = require('../../../assets/images/icons/' + AktionIconProperties[aktionIcon].icon)
  } catch (e) {
    return <div style={{marginRight: 15}}>{icon}</div>
  }

  return <img loading="lazy" src={icon} height={size} width={size} alt={'Icon'} style={{marginRight: '5px'}} />
}
