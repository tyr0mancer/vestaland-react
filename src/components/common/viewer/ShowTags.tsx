import React from "react";
import {Tag} from "../../../shared-types/enum";
import {TagProperties} from "../../../shared-types/enum/TagProperties";

interface ShowTagsProps {
  tags: Tag[],
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
