import React from "react";
import {AktionIcon} from "../../../shared-types/enum";
import {AktionIconProperties} from "../../../util/rezept-helper/enum-properties/AktionIconProperties";

interface AktionIconImageProps {
  aktion?: AktionIcon | undefined
  size?: number
}

/**
 * TS Doc Info
 * @component AktionIconImage
 */
export function AktionIconImage({aktion, size = 20}: AktionIconImageProps) {
  let icon = require('../../../assets/images/icons/dummy.png')
  try {
    if (aktion)
      icon = require('../../../assets/images/icons/' + AktionIconProperties[aktion].icon)
  } catch (e) {
  }
  return <img src={icon} height={size} width={size} alt={'Icon'}/>
}
