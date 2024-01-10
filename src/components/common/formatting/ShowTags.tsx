import React from "react";
import {Tags} from "../../../shared-types/enum/Tags";
import {TagProperties} from "../../../util/rezept-helper/enum-properties/TagProperties";

interface ShowTagsProps {
  tags: Tags[],
  size: 'small' | 'large'
}

/**
 * TS Doc Info
 * @component ShowTags
 */
export function ShowTags({tags}: ShowTagsProps): React.ReactElement {
  return <>{tags.map((tag, index) => (
    <span key={index} className={`tag-label ${TagProperties[tag].color}`}>{TagProperties[tag].label}</span>
  ))}</>

}
