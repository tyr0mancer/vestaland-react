import React from "react";
import {Box} from "@mui/material";
import {CustomFieldArray} from "../../../common/form-elements/generic";
import {Utensil} from "../../../../shared-types/models/Utensil";

import {UtensilEntryShow} from "./UtensilEntryShow";
import {UtensilPicker} from "../../../common/form-elements/specific";

type UtensilienArrayProps = {
  name: string
}

/**
 * TS Doc Info
 * @component AktionenArray
 */
export function UtensilienArray({name}: UtensilienArrayProps): React.ReactElement {
  const newValue = new Utensil()

  return (<Box mt={1} mb={5} borderBottom={1}>
      <CustomFieldArray<Utensil>
        newValue={newValue}
        name={name}

        renderChild={(customArrayHelper, index, utensil) => (
          <UtensilEntryShow key={index} index={index} utensil={utensil} arrayHelper={customArrayHelper}/>
        )}

        renderFooter={(customArrayHelper, length) => {
          return <UtensilPicker index={length} name={`${name}[${length}]`} label={'Utensil wählen'} arrayHelper={customArrayHelper}/>
        }}

      />
    </Box>
  )

}
