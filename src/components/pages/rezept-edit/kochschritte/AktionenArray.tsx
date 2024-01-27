import React from "react";
import {Box} from "@mui/material";
import {KochschrittAktion} from "../../../../shared-types/models/KochschrittAktion";
import {CustomFieldArray} from "../../../common/form-elements/generic";
import {AktionPicker, AktionEntryShow} from "../../../common/form-elements/specific";

type AktionenArrayProps = {
  name: string
}

/**
 * @see KochschrittForm
 */
export function AktionenArray({name}: AktionenArrayProps): React.ReactElement {
  const newValue = new KochschrittAktion()

  return (<Box mt={1} mb={5} borderBottom={1}>
      <CustomFieldArray<KochschrittAktion>
        newValue={newValue}
        name={name}
        renderChild={(customArrayHelper, index) => (
          <AktionEntryShow key={index} index={index} name={`${name}[${index}]`} arrayHelper={customArrayHelper}/>
        )}
        renderFooter={(customArrayHelper, length) => {
          return <AktionPicker index={length} name={`${name}[${length}]`} arrayHelper={customArrayHelper}/>
        }}
      />
    </Box>
  )

}
