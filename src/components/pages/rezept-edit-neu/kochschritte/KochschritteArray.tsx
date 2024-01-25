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

  const newKochschritt = new Kochschritt()

  return (<Box mt={1} mb={5} borderBottom={1}>
    <CustomFieldArray<Kochschritt>
      newValue={newKochschritt}
      name={'kochschritte'}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      confirmDelete={{
        title: 'Wirklich löschen?', label: '', confirmLabel: 'löschen'
      }}

      renderHeader={(customArrayHelper, length) => <KochschritteArrayHeader
        arrayHelper={customArrayHelper}
        setActiveIndex={setActiveIndex}
        length={length}
      />}


      renderChild={(customArrayHelper, index, kochschritt, length) => (

        <Box key={index}>

          <KochschrittHeader
            arrayHelper={customArrayHelper}
            index={index}
            length={length}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />

          {(activeIndex === index)
            ? <KochschrittForm
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

    />
  </Box>)

}


/*
    renderChild={(customArrayHelper, kochschritte) => (<Box mt={1} mb={5} borderBottom={1}>

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
            ? <KochschrittForm
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
*/
