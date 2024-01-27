import React from "react";
import {Box, FormGroup, Grid, Paper} from "@mui/material";

import {Kochschritt} from "../../../../shared-types/models/Kochschritt";
import {
  BetriebsartPicker,
  ZeitenPicker
} from "../../../common/form-elements/specific";

import {CustomArrayHelper, CustomTextField} from "../../../common/form-elements/generic";

import {ZutatenArray} from "./ZutatenArray";
import {AktionenArray} from "./AktionenArray";
import {UtensilienArray} from "./UtensilienArray";


interface KochschrittFormProps {
  name: string,
  index: number,
  value: Kochschritt,
  arrayHelper: CustomArrayHelper,
}

/**
 * @see MainForm
 */
export function KochschrittForm({
                                     name,
                                   }: KochschrittFormProps) {


  return (<Grid container spacing={1}>

    {/* Aktionen - Utensilien - Betriebsart */}
    <Grid item xs={6} md={3}>
      <Paper elevation={5}>
        <AktionenArray name={`${name}[aktionen]`}/>
        <UtensilienArray name={`${name}[utensilien]`}/>
        <div className={'form-group'}>
          <BetriebsartPicker name={`${name}[betriebsart]`}/>
          <Box mt={2}>
            <CustomTextField name={`${name}[temperatur]`} label={'Temperatur'} type={'number'} fullWidth/>
          </Box>
        </div>
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
        <ZeitenPicker variant={'kochschritt'} name={`${name}`} />
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
    <Grid item xs={12} md={12} display={{xs: 'block', md: 'none'}}>
      <Paper elevation={5}>
        <ZutatenArray name={`${name}[zutaten]`} variant={'mobile'} tabIndex={2}/>
      </Paper>
    </Grid>

  </Grid>)
}
