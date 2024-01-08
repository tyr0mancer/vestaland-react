import React from "react";
import {Field, useFormikContext} from "formik";
import {Checkbox, FormControlLabel, Grid, TextField} from "@mui/material";
import {Rezept} from "../../../models/rezept.model";
import {CustomFile} from "../../common/form-elements/CustomFile";
import {Datei} from "../../../models/datei.model";


/**
 * TS Doc Info
 * @component OverviewForm
 */
export function OverviewForm(): React.ReactElement {
  const formik = useFormikContext<Rezept>();

  return (<>
    <Grid columnSpacing={1} rowSpacing={2} container>
      <Grid item xs={12} md={4}>
        <Field as={TextField} type="text" variant="outlined" fullWidth
               name="name" label="Rezeptname"/>
      </Grid>
      <Grid item xs={9} md={7}>
        <Field as={TextField} type="text" variant="outlined" fullWidth
               name="beschreibung" label="Beschreibung"/>
      </Grid>
      <Grid item xs={3} md={1}>
        <Field as={TextField} variant="outlined" fullWidth
               name="portionen" label="Portionen" default={2} type="number"/>
      </Grid>

      <Grid item xs={6} md={2}>
        <Field as={TextField} type="number" variant="outlined" fullWidth
               name="berechneteGesamtdauer" label="Gesamtdauer"/>
      </Grid>
      <Grid item xs={6} md={2}>
        <Field as={TextField} type="number" variant="outlined" fullWidth
               name="berechneteArbeitszeit" label="Arbeitszeit"/>
      </Grid>


      {/* File Picker */}
      <Grid item xs={12} md={4} textAlign={'center'}>
        <CustomFile name={'bild'} values={formik.values.bild || new Datei()} />
      </Grid>


      <Grid item xs={12} md={8}>

        <Field
          type="checkbox"
          as={FormControlLabel}
          value={true}
          name="meta.vegetarisch"
          control={<Checkbox checked={formik.values.meta?.vegetarisch}/>}
          label="Vegetarisch"
        />

        <Field
          type="checkbox"
          as={FormControlLabel}
          value={true}
          name="meta.healthy"
          control={<Checkbox checked={formik.values.meta?.healthy}/>}
          label="Diätisch"
        />

        <Field
          type="checkbox"
          as={FormControlLabel}
          value={true}
          name="meta.soulfood"
          control={<Checkbox checked={formik.values.meta?.soulfood}/>}
          label="Soulfood"
        />
      </Grid>


    </Grid>
  </>)
}
