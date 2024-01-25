import React from "react";
import {CustomArrayHelper, CustomSelect, CustomTextField} from "../generic";
import {
  Delete as DeleteIcon
} from '@mui/icons-material';

import {Grid, IconButton, Typography} from "@mui/material";
import {Einheit} from "../../../../shared-types/enum";
import {EinheitProperties} from "../../../../util/format/enum-properties/EinheitProperties";
import {useField} from "formik";
import {Zutat} from "../../../../shared-types/models/Zutat";

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
  const [{value}] = useField<Zutat>(name)


  return (<Grid container spacing={1}>
    <Grid item xs={1} mt={1}>
      <IconButton
        onClick={() => arrayHelper.handleDelete(index)}>
        <DeleteIcon/>
      </IconButton>
    </Grid>
    <Grid item xs={6}>
      <Typography variant={'body1'}>
        {value?.lebensmittel?.name}
      </Typography>
    </Grid>
    <Grid item xs={2}>
      <CustomTextField
        tabIndex={1}
        autoFocus={true}
        size={'small'}
        name={`${name}[menge]`}
        type={'number'}
        label={'Menge'}

      />
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
