import React from "react";
import {Box, FormGroup, Grid, Paper} from "@mui/material";

import {Kochschritt} from "../../../../shared-types/models/Kochschritt";
import {
  AktionenPicker,
  UtensilienPicker,
  BetriebsartPicker,
  ZwischenergebnissePicker,
  ZeitenPicker
} from "../../../common/form-elements/specific";

import {CustomArrayHelper, CustomTextField} from "../../../common/form-elements/generic";

import {ZutatenArray} from "./ZutatenArray";


interface KochschrittFormProps {

  name: string,
  index: number,
  value: Kochschritt,
  arrayHelper: CustomArrayHelper
}

export function KochschrittForm({
                                  name,
                                }: KochschrittFormProps) {
  return <Grid container spacing={1}>
    <Grid item xs={6} md={3}>
      <Paper elevation={5}>
        <AktionenPicker name={`${name}[aktionen]`}/>
        <UtensilienPicker name={`${name}[utensilien]`}/>
        <BetriebsartPicker name={`${name}`}/>
      </Paper>
    </Grid>

    <Grid item xs={12} md={6} display={{xs: 'none', md: 'block'}}>
      <Paper elevation={5}>
        <ZutatenArray name={`${name}[zutaten]`} variant={'desktop'}/>
        <ZwischenergebnissePicker name={`${name}[zutaten]`}/>
      </Paper>
    </Grid>

    <Grid item xs={6} md={3}>
      <Paper elevation={5}>
        <ZeitenPicker name={`${name}`} variant={'kochschritt'}/>
        <Box mt={1}>
          <FormGroup>
            <CustomTextField name={`${name}[freitext]`} label={'Freitext'}/>
          </FormGroup>
        </Box>
        <Box mt={1}>
          <FormGroup>
            <CustomTextField name={`${name}[quelleUrl]`} label={'URL'}/>
          </FormGroup>
        </Box>
      </Paper>
    </Grid>

    <Grid item xs={12} md={6} display={{xs: 'block', md: 'none'}}>
      <Paper elevation={5}>
        <ZutatenArray name={`${name}[zutaten]`} variant={'mobile'}/>
        <ZwischenergebnissePicker name={`${name}[zutaten]`}/>
      </Paper>
    </Grid>

  </Grid>

}

