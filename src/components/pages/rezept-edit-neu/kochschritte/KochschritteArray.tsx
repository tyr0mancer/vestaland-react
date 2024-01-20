import React, {useState} from "react";
import {Kochschritt} from "../../../../shared-types/models/Kochschritt";
import {CustomFieldArray} from "../../../common/form-elements/generic";
import {KochschritteArrayHeader} from "./KochschritteArrayHeader";
import {KochschrittForm} from "./KochschrittForm";
import {KochschrittView} from "./KochschrittView";
import {Box} from "@mui/material";
import {KochschrittHeader} from "./KochschrittHeader";


/**
 * TS Doc Info
 * @component KochschritteArray
 */
export function KochschritteArray(): React.ReactElement {

  const [activeIndex, setActiveIndex] = useState(-1)

  return (<CustomFieldArray<Kochschritt>
    newValue={new Kochschritt()}
    name={'kochschritte'}
    render={(arrayHelper, values) => (<>
      <KochschritteArrayHeader arrayHelper={arrayHelper}/>
      {values.map((kochschritt, index) => <Box key={index}>

          <KochschrittHeader
            arrayHelper={arrayHelper}
            index={index}
            maxIndex={values.length - 1}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />

          {(activeIndex === index)
            ? <KochschrittForm
              index={index}
              name={`kochschritte[${index}]`}
              value={kochschritt}
              arrayHelper={arrayHelper}
            />
            : <KochschrittView
              index={index}
              kochschritt={kochschritt}
            />}

        </Box>
      )}
      <hr/>
    </>)}
  />)
}
