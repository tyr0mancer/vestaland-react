import React from "react";
import {Box, Button} from "@mui/material";

import {CustomFieldArray} from "../../../common/form-elements/generic";
import {Zutat} from "../../../../shared-types/models/Zutat";
import {ZutatPicker} from "../../../common/form-elements/specific/ZutatPicker";

type ZutatenArrayProps = {
  name: string,
  variant: 'mobile' | 'desktop'
}

/**
 * TS Doc Info
 * @component ZutatenArray
 */
export function ZutatenArray({name, variant = 'desktop'}: ZutatenArrayProps): React.ReactElement {
  const newValue = new Zutat()

  return (<Box mt={2}>

    <CustomFieldArray<Zutat>
      newValue={newValue}
      name={`${name}`}
      renderChild={(arrayHelper, values, index) => (
        <ZutatPicker key={index} name={`${name}[${index}]`} variant={variant} arrayHelper={arrayHelper}
                     index={index}/>
      )}

      renderFooter={(arrayHelper, length) => (
        <Box><Button onClick={() => arrayHelper.handleInsert(length)}>Zutat hinzufügen</Button></Box>
      )}

    />
  </Box>)
}
