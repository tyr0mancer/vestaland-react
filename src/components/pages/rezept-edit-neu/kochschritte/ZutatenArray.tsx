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
    name={`${name}[zutaten]`}
    render={(arrayHelper, values) => (<>
      {(values?.length) ? values.map((zutat, index) => <Box key={index}>

          <ZutatPicker name={`${name}[zutaten][${index}]`} variant={variant} arrayHelper={arrayHelper} index={index}/>
          <Button onClick={() => arrayHelper.handleInsert(index)}>neu</Button>
          <Button onClick={() => arrayHelper.handleDelete(index)}>delete</Button>


        </Box>
      ) : (<>
        <Button onClick={() => arrayHelper.handleInsert(0)}>Zutat hinzufügen</Button>
      </>)}
      <hr/>
    </>)}
  />)
}
