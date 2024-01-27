import React from "react";
import {CustomArrayHelper, CustomTextField} from "../generic";
import {
  Delete as DeleteIcon,
  ArrowDropUp as MoveUpIcon,
  ArrowDropDown as MoveDownIcon
} from '@mui/icons-material';

import {Grid, IconButton, Typography} from "@mui/material";
import {useField} from "formik";
import {Zutat} from "../../../../shared-types/models/Zutat";
import {EinheitPicker} from "./EinheitPicker";

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
  const [{value: zutat}] = useField<Zutat>(name)


  return (<Grid container spacing={1} mt={1} >
    <Grid item xs={7} className={'align-vertically'}>
      <IconButton
        onClick={() => arrayHelper.handleDelete(index)}>
        <DeleteIcon/>
      </IconButton>
      <Typography variant={'body1'}>
        {zutat.lebensmittel?.name}
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
      <EinheitPicker
        name={`${name}[einheit]`}
        menge={zutat.menge}
        einheit={zutat.einheit}
        lebensmittel={zutat.lebensmittel}
      />
    </Grid>

    <Grid item xs={1}>
      <IconButton
        style={{height: 10}}
        onClick={() => arrayHelper.handleMoveUp(index)}
      ><MoveUpIcon/></IconButton>
      <br/>
      <IconButton
        style={{height: 10}}
        onClick={() => arrayHelper.handleMoveDown(index)}
      ><MoveDownIcon/></IconButton>


    </Grid>


  </Grid>)
}
