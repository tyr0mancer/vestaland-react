import React from "react";
import {LebensmittelPicker} from "./LebensmittelPicker";
import {CustomArrayHelper, CustomSelect, CustomTextField} from "../generic";
import {Grid, IconButton} from "@mui/material";
import {Einheit} from "../../../../shared-types/enum";
import {EinheitProperties} from "../../../../util/format/enum-properties/EinheitProperties";
import {useField} from "formik";
import {Zutat} from "../../../../shared-types/models/Zutat";
import {Lebensmittel} from "../../../../shared-types/models/Lebensmittel";

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
  const [{value}, , helpers] = useField<Zutat>(name)

  const handleChange = (newValue: Lebensmittel | null) => {
    if (!newValue) {
      return arrayHelper.handleDelete(index)
    }
    value.einheit = newValue.defaultEinheit
    return helpers.setValue(value)
  }


  return (<Grid container>
    <Grid item xs={7}>
      <LebensmittelPicker
        name={`${name}[lebensmittel]`}
        handleChange={handleChange}
      />
    </Grid>
    <Grid item xs={2}>
      <CustomTextField size={'small'} name={`${name}[menge]`} type={'number'} label={'Menge'}/>
    </Grid>
    <Grid item xs={2}>
      <CustomSelect<Einheit>
        size={'small'}
        name={`${name}[einheit]`}
        options={Object.values(Einheit)}
        getKey={(einheit: Einheit) => einheit}
        getLabel={(einheit: Einheit) => EinheitProperties[einheit].fullName}
      />
    </Grid>

    <Grid item xs={1}>
      <IconButton
        style={{height: 10}}
        onClick={() => arrayHelper.handleMoveUp(index)}
      >/\</IconButton>
      <br/>
      <IconButton
        style={{height: 10}}
        onClick={() => arrayHelper.handleMoveDown(index)}
      >\/</IconButton>


    </Grid>


  </Grid>)
}
