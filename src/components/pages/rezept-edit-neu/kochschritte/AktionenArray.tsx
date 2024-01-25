import React from "react";
import {Box} from "@mui/material";
import {KochschrittAktion} from "../../../../shared-types/models/KochschrittAktion";
import {CustomFieldArray} from "../../../common/form-elements/generic";
import {AktionPicker, AktionEntry} from "../../../common/form-elements/specific";

type AktionenArrayProps = {
  name: string
}

/**
 * TS Doc Info
 * @component AktionenArray
 */
export function AktionenArray({name}: AktionenArrayProps): React.ReactElement {
  const newValue = new KochschrittAktion()

  return (<Box mt={1} mb={5} borderBottom={1}>
      <CustomFieldArray<KochschrittAktion>
        newValue={newValue}
        name={name}
        renderChild={(customArrayHelper, index) => (
          <AktionEntry key={index} index={index} name={`${name}[${index}]`} arrayHelper={customArrayHelper}/>
        )}
        renderFooter={(customArrayHelper, length) => {
          //return <div><Button onClick={() => handleInsert()}>insert</Button></div>
          return <AktionPicker index={length} name={`${name}[${length}]`} arrayHelper={customArrayHelper}/>
        }}
      />
    </Box>
  )

}
