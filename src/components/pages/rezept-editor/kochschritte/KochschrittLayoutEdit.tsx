import {CustomFieldProps} from "../../../common/form-elements/types";
import {Kochschritt} from "../../../../shared-types/models/Kochschritt";
import {FormGroup, Grid, TextField} from "@mui/material";
import {ZutatenPicker} from "../../../common/form-elements/specific/ZutatenPicker";
import {UtensilienPicker} from "../../../common/form-elements/specific/UtensilienPicker";
import {AktionenPicker} from "../../../common/form-elements/specific/AktionenPicker";
import Box from "@mui/material/Box";
import {Field, useFormikContext} from "formik";
import React from "react";
import {ZeitangabeFields} from "./ZeitangabeFields";
import {BetriebsartFields} from "./BetriebsartFields";
import {ZwischenergebnisPicker} from "../../../common/form-elements/specific/ZwischenergebnisPicker";
import {Rezept} from "../../../../shared-types/models/Rezept";

/**
 * Form Layout eines Kochschrittes
 *
 * @component KochschrittLayoutEdit
 *
 * @see RezeptFieldsKochschritte
 */
export function KochschrittLayoutEdit({values: kochschritt, name}: CustomFieldProps<Kochschritt>) {
  const formik = useFormikContext<Rezept>()

  return (<Grid container spacing={1}>

    {/* Aktionen / Zeitangabe / Temperatur und Betriebsart / weitere Infos */}
    <Grid item xs={6} md={3}>
      <AktionenPicker name={`${name}[aktionen]`} values={kochschritt.aktionen}/>
      <Box mt={1}>
        <Field as={TextField} type="text" variant="outlined" mt={2}
               fullWidth
               multiline={true}
               name={`${name}[beschreibung]`} label="Kommentar"/>
      </Box>

    </Grid>

    {/* Zutaten /erforderliche KochschritteArray/ Utensilien  */}
    <Grid item xs={12} md={7}>
      <ZutatenPicker name={`${name}[zutaten]`} values={kochschritt.zutaten}/>
      <hr/>
      <ZwischenergebnisPicker name={`${name}[erforderlicheKochschritte]`}
                              values={kochschritt.erforderlicheKochschritte || []}
                              options={formik.values.kochschritte}/>
      <hr/>

      <UtensilienPicker name={`${name}[utensilien]`} values={kochschritt.utensilien}/>

      <FormGroup>
        <Field as={TextField} type="text" variant="outlined" mt={5}
               fullWidth
               name={`${name}[resultatName]`} label="resultatName"/>
      </FormGroup>
    </Grid>

    {/* Aktionen / Zeitangabe / Temperatur und Betriebsart / weitere Infos */}
    <Grid item xs={6} md={2}>
      <ZeitangabeFields name={`${name}`}/>
      <BetriebsartFields name={`${name}`}/>

      {/* Freitext und Quellen */}
      <Box mt={1}>
        <Field as={TextField} type="text" variant="outlined"
               fullWidth
               name={`${name}[videoUrl]`} label="URL"/>
      </Box>
    </Grid>

  </Grid>)
}
