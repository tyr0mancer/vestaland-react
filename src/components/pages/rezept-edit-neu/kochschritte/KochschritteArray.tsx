import React, {useState} from "react";
import {Kochschritt} from "../../../../shared-types/models/Kochschritt";
import {CustomFieldArray} from "../../../common/form-elements/generic";
import {KochschritteArrayHeader} from "./KochschritteArrayHeader";
import {KochschrittEdit} from "./KochschrittEdit";
import {KochschrittView} from "./KochschrittView";
import {Box} from "@mui/material";
import {KochschrittHeader} from "./KochschrittHeader";
import {Zutat} from "../../../../shared-types/models/Zutat";


/**
 * TS Doc Info
 * @component KochschritteArray
 */
export function KochschritteArray(): React.ReactElement {

  const [activeIndex, setActiveIndex] = useState(-1)

  const newKochschritt = new Kochschritt()
  newKochschritt.zutaten = [new Zutat()]

  return (<CustomFieldArray<Kochschritt>
    newValue={newKochschritt}
    name={'kochschritte'}
    activeIndex={activeIndex}
    setActiveIndex={setActiveIndex}
    confirmDelete={{
      title: 'Wirklich löschen?', label: '', confirmLabel: 'löschen'
    }}
    render={(customArrayHelper, kochschritte) => (<Box mt={1} mb={5} borderBottom={1}>

      <KochschritteArrayHeader
        arrayHelper={customArrayHelper}
        setActiveIndex={setActiveIndex}
        length={kochschritte.length}
      />

      {kochschritte.map((kochschritt, index) => <Box key={index}>

          <KochschrittHeader
            arrayHelper={customArrayHelper}
            index={index}
            maxIndex={kochschritte.length - 1}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />

          {(activeIndex === index)
            ? <KochschrittEdit
              index={index}
              name={`kochschritte[${index}]`}
              value={kochschritt}
              arrayHelper={customArrayHelper}
            />
            : <KochschrittView
              index={index}
              kochschritt={kochschritt}
            />}

        </Box>
      )}

    </Box>)}
  />)
}

