import React from "react";
import {Tags} from "../../../shared-types/enum/Tags";

interface ShowTagsProps {
  tags: Tags[],
  size: 'small' | 'large'
}

/**
 * TS Doc Info
 * @component ShowTags
 */
export function ShowTags({tags, size}: ShowTagsProps): React.ReactElement {
  return (<div>{JSON.stringify(tags)} {size}</div>)
}

/*

export function MetaInfoIcons({
                                meta,
                                fontSize = 'medium'
                              }: { meta?: RezeptMeta, fontSize?: 'small' | 'medium' | 'large' }) {

  return (<>
    {meta?.vegetarisch &&
        <span title={'Das Rezept ist vegetarisch'}>
            <LocalFloristIcon color={'primary'} fontSize={fontSize}/>
        </span>
    }
    {meta?.healthy &&
        <span title={'Das Rezept ist diätisch'}>
            <FitnessCenterIcon color={'primary'} fontSize={fontSize}/>
        </span>
    }
    {meta?.soulfood &&
        <span title={'Essen für die Seele'}>
            <FavoriteBorderIcon color={'primary'} fontSize={fontSize}/>
        </span>
    }
  </>)
}
*/
