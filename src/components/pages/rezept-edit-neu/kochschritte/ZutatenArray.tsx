import React, {useState} from "react";
import {Box, Button} from "@mui/material";

import {DefaultValues} from "../../../../util/default-values";
import {CustomFieldArray} from "../../../common/form-elements/generic";
import {Zutat} from "../../../../shared-types/models/Zutat";
import {ZutatPicker} from "../../../common/form-elements/specific/ZutatPicker";
import {ZutatViewer} from "../../../common/formatting/elements/ZutatenViewer";

type ZutatenArrayProps = {
  name: string,
  variant: 'mobile' | 'desktop'
}

/**
 * TS Doc Info
 * @component ZutatenArray
 */
export function ZutatenArray({name, variant = 'desktop'}: ZutatenArrayProps): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0)


  return (<CustomFieldArray<Zutat>
    newValue={DefaultValues.zutat}
    name={`${name}`}
    render={(arrayHelper, values) => (<Box mt={2}>
      {(values ?? []).map((zutat, index) =>

        (activeIndex === index)
          ? <ZutatPicker key={index} name={`${name}[${index}]`} variant={variant} arrayHelper={arrayHelper}
                         index={index}/>
          : <div onClick={() => setActiveIndex(index)}><ZutatViewer key={index} zutat={zutat}/></div>
      )}
      <hr/>
      <Button onClick={() => arrayHelper.handleInsert(values?.length)}>Zutat hinzufügen</Button>
    </Box>)}
  />)
}
