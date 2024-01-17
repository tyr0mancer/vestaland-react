import React from "react";
import {AktionIcon} from "../../../shared-types/enum";
import {AktionIconProperties} from "../../../util/format/enum-properties/AktionIconProperties";

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
    if (!aktionIcon || aktionIcon === AktionIcon.DUMMY)
      return <></>
    if (aktionIcon)
      icon = require('../../../assets/images/icons/' + AktionIconProperties[aktionIcon].icon)
  } catch (e) {
    console.log(e)
  }
  return <img loading="lazy" src={icon} height={size} width={size} alt={'Icon'}/>
}
