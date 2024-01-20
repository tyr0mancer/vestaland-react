import React from "react";
import {LebensmittelPicker} from "./LebensmittelPicker";
import {CustomArrayHelper, CustomSelect, CustomTextField} from "../generic";
import {Grid} from "@mui/material";
import {Einheit} from "../../../../shared-types/enum";
import {EinheitProperties} from "../../../../util/format/enum-properties/EinheitProperties";

type ZutatPickerProps = {
  name: string,
  label?: string,
  index: number,
  variant: 'mobile' | 'desktop',
  arrayHelper: CustomArrayHelper
}

/**
 * TS Doc Info
 * @component ZutatPicker
 */
export function ZutatPicker({index, name, arrayHelper}: ZutatPickerProps): React.ReactElement {

  const handleDelete = () => {
    arrayHelper.handleDelete(index)
  }

  return (<Grid container>
    <Grid item xs={7}>{name}
      <LebensmittelPicker name={`${name}[lebensmittel]`} handleDelete={handleDelete}/>
    </Grid>
    <Grid item xs={2}>
      <CustomTextField size={'small'} name={`${name}[menge]`} type={'number'} label={'Menge'}/>
    </Grid>
    <Grid item xs={3}>
      <CustomSelect<Einheit>
        size={'small'}
        name={`${name}[einheit]`}
        label={'Einheit'}
        options={Object.values(Einheit)}
        getLabel={einheit => EinheitProperties[einheit].fullName}
      />
    </Grid>


  </Grid>)
}
