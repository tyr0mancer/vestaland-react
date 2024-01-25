import React from "react";
import {Box, FormGroup, Grid, Paper} from "@mui/material";

import {Kochschritt} from "../../../../shared-types/models/Kochschritt";
import {
  UtensilienPicker,
  BetriebsartPicker,
  ZeitenPicker
} from "../../../common/form-elements/specific";

import {CustomArrayHelper, CustomTextField} from "../../../common/form-elements/generic";

import {ZutatenArray} from "./ZutatenArray";
import {AktionenArray} from "./AktionenArray";


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

    {/* Aktionen - Utensilien - Betriebsart */}
    <Grid item xs={6} md={3}>
      <Paper elevation={5}>
        <AktionenArray name={`${name}[aktionen]`}/>
        <UtensilienPicker name={`${name}[utensilien]`}/>
        <BetriebsartPicker name={`${name}`}/>
      </Paper>
    </Grid>

    {/* Zutaten - Desktop Ansicht */}
    <Grid item xs={12} md={6} display={{xs: 'none', md: 'block'}}>
      <Paper elevation={5}>
        <ZutatenArray name={`${name}[zutaten]`} variant={'desktop'} tabIndex={2}/>
      </Paper>
    </Grid>

    {/* Zeiten - Freitext - Quellen (URL) */}
    <Grid item xs={6} md={3}>
      <Paper elevation={5}>
        <ZeitenPicker name={`${name}`} variant={'kochschritt'}/>
        <Box mt={1}>
          <FormGroup>
            <CustomTextField name={`${name}[beschreibung]`} label={'Freitext'}/>
          </FormGroup>
        </Box>
        <Box mt={1}>
          <FormGroup>
            <CustomTextField name={`${name}[quelleUrl]`} label={'URL'}/>
          </FormGroup>
        </Box>
      </Paper>
    </Grid>

    {/* Zutaten - Mobile Ansicht */}
    <Grid item xs={12} md={6} display={{xs: 'block', md: 'none'}}>
      <Paper elevation={5}>
        <ZutatenArray name={`${name}[zutaten]`} variant={'mobile'} tabIndex={2}/>
      </Paper>
    </Grid>

  </Grid>

}

