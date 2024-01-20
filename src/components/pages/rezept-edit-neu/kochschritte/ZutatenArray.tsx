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
  return (<CustomFieldArray<Zutat>
    newValue={new Zutat()}
    name={`${name}`}
    render={(arrayHelper, values) => (<>
      {(values ?? []).map((zutat, index) => <Box key={index}>

          <ZutatPicker name={`${name}[${index}]`} variant={variant} arrayHelper={arrayHelper} index={index}/>
          <Button onClick={() => arrayHelper.handleInsert(index + 1)}>neu</Button>
          <Button onClick={() => arrayHelper.handleDelete(index)}>delete</Button>

        </Box>
      )}
      <hr/>
      <Button onClick={() => arrayHelper.handleInsert(values?.length)}>Zutat hinzufügen</Button>
    </>)}
  />)
}
