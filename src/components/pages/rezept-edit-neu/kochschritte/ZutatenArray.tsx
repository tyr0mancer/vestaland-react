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
  //const [activeIndex, setActiveIndex] = useState(0)
  const newValue = new Zutat()

  return (<CustomFieldArray<Zutat>
    newValue={newValue}
    name={`${name}`}
    render={(arrayHelper, values) => (<Box mt={2}>
      {(values ?? []).map((zutat, index) =>
          <ZutatPicker key={index} name={`${name}[${index}]`} variant={variant} arrayHelper={arrayHelper}
                       index={index}/>
        /*        (activeIndex === index)
                  ?
                  : <div key={index} onClick={() => setActiveIndex(index)}><ZutatViewer zutat={zutat}/></div>*/
      )}
      <hr/>
      <Button onClick={() => arrayHelper.handleInsert(values?.length)}>Zutat hinzufügen</Button>
    </Box>)}
  />)
}
