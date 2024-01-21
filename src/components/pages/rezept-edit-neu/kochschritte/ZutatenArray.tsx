import React from "react";
import {Box, Button} from "@mui/material";

import {CustomFieldArray} from "../../../common/form-elements/generic";
import {Zutat} from "../../../../shared-types/models/Zutat";
import {ZutatPicker} from "../../../common/form-elements/specific/ZutatPicker";
import {ZUTAT} from "../../../../shared-types/models/_default";

type ZutatenArrayProps = {
  name: string,
  variant: 'mobile' | 'desktop'
}

/**
 * TS Doc Info
 * @component ZutatenArray
 */
export function ZutatenArray({name, variant = 'desktop'}: ZutatenArrayProps): React.ReactElement {
  return (<CustomFieldArray<Zutat>
    newValue={ZUTAT}
    name={`${name}`}
    render={(arrayHelper, values) => (<Box mt={2}>
      {(values ?? []).map((zutat, index) =>
        <ZutatPicker key={index} name={`${name}[${index}]`} variant={variant} arrayHelper={arrayHelper} index={index}/>
      )}
      <hr/>
      <Button onClick={() => arrayHelper.handleInsert(values?.length)}>Zutat hinzufügen</Button>
    </Box>)}
  />)
}
