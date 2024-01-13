import React from "react";
import {Field, useFormikContext} from "formik";
import {Box, Grid, MenuItem, Select, Slider, TextField, Typography} from "@mui/material";
import {Rezept} from "../../../../shared-types/model/Rezept";
import {CustomFilePicker} from "../../../common/form-elements/specific/CustomFilePicker";
import {Datei} from "../../../../shared-types/model/Datei";
import {Tags} from "../../../../shared-types/enum/Tags";


/**
 * Form Fields für Rezept Properties außer kochschritte

 * @component RezeptFieldsAllgemeines
 *
 * @see RezeptEditorForm
 * @see RezeptFieldsKochschritte
 */
export function AllgemeinesFields(): React.ReactElement {
  const formik = useFormikContext<Rezept>();

  return (<>
    <Grid columnSpacing={1} rowSpacing={2} container mt={1}>
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


      {/* File Picker */}
      <Grid item xs={12} md={4}>
        <CustomFilePicker name={'bild'} values={formik.values.bild || new Datei()}/>
      </Grid>


      {/* Zeitangaben */}
      <Grid item xs={6} md={2}>
        <Field as={TextField} type="number" variant="outlined" fullWidth
               name="realeGesamtdauer" label="reale Gesamtdauer"/>
        <Box mt={2}>
          <Field as={TextField} type="number" variant="outlined" fullWidth
                 disabled name="berechneteGesamtdauer" label="berechnet"/>
        </Box>
        <Box mt={2}>
          <Field as={TextField} type="number" variant="outlined" fullWidth
                 name="extraPortionGesamtdauer" label="extra Zeit"/>
        </Box>
      </Grid>
      <Grid item xs={6} md={2}>
        <Field as={TextField} type="number" variant="outlined" fullWidth
               name="realeArbeitszeit" label="reale Arbeitszeit"/>
        <Box mt={2}>
          <Field as={TextField} type="number" variant="outlined" fullWidth
                 disabled name="berechneteArbeitszeit" label="berechnet"/>
        </Box>
        <Box mt={2}>

          <Field as={TextField} type="number" variant="outlined" fullWidth
                 name="extraPortionArbeitszeit" label="extra Zeit"/>
        </Box>
      </Grid>


      <Grid item xs={12} md={4}>
        {/* Schwierigkeitsgrad */}
        <Typography variant="h5">
          Schwierigkeitsgrad
        </Typography>
        <Field as={Slider} type="number" variant="outlined"
               defaultValue={3} step={1} min={1} max={5}
               marks={[
                 {value: 2, label: "leicht"},
                 {value: 3, label: "mittel"},
                 {value: 4, label: "schwer"},
               ]}
               name="schwierigkeitsgrad" label="Schwierigkeitsgrad"/>

        {/* Tags */}
        <Typography variant="h5" mt={2}>
          Tags
        </Typography>
        <Field
          as={Select}
          multiple={true}
          name={"tags"}
          labelId="Tags"
        >
          {Object.entries(Tags).map(([key, value]) =>
            <MenuItem key={key} value={value}>{value}</MenuItem>)}
        </Field>

        {/*
        <Typography variant="h5" mt={2}>
          Quellen
        </Typography>
        public quelleUrl: string[] = [];
*/}


      </Grid>

      {/* Freitext */}
      <Field as={TextField} type="text" variant="outlined" fullWidth multiline
             name="freitext" label="Freitext"/>


    </Grid>
  </>)
}
