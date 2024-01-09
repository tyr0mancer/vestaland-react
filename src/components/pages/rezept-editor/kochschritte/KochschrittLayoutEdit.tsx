import {CustomFieldProps} from "../../../common/form-elements/types";
import {Kochschritt} from "../../../../shared-types/models/Kochschritt";
import {Grid, TextField} from "@mui/material";
import {ZutatenPicker} from "../../../common/form-elements/ZutatenPicker";
import {UtensilienPicker} from "../../../common/form-elements/UtensilienPicker";
import {AktionenPicker} from "../../../common/form-elements/AktionenPicker";
import Box from "@mui/material/Box";
import {Field} from "formik";
import React from "react";
import {ZeitangabeFields} from "./ZeitangabeFields";
import {BetriebsartFields} from "./BetriebsartFields";

/**
 * Form Layout eines Kochschrittes
 *
 * @component RezeptFieldsKochschritt
 *
 * @see RezeptFieldsKochschritte
 */
export function KochschrittLayoutEdit({values: kochschritt, name}: CustomFieldProps<Kochschritt>) {

  return (<Grid container spacing={2}>
    {/* Zutaten /erforderliche Kochschritte/ Utensilien  */}
    <Grid item xs={12} md={8}>
      <ZutatenPicker name={`${name}[zutaten]`} values={kochschritt.zutaten}/>
      <hr/>
      <hr/>
      <UtensilienPicker name={`${name}[utensilien]`} values={kochschritt.utensilien}/>
    </Grid>

    {/* Aktionen / Zeitangabe / Temperatur und Betriebsart / weitere Infos */}
    <Grid item xs={12} md={4}>
      <AktionenPicker name={`${name}[aktionen]`} values={kochschritt.aktionen}/>
      <ZeitangabeFields name={`${name}`}/>
      <BetriebsartFields name={`${name}`}/>

      {/* Freitext und Quellen */}
      <Box mt={1}>
        <Field as={TextField} type="text" variant="outlined" mt={2}
               fullWidth
               multiline={true}
               name={`${name}[beschreibung]`} label="Kommentar"/>
      </Box>
      <Box mt={1}>
        <Field as={TextField} type="text" variant="outlined"
               fullWidth
               name={`${name}[videoUrl]`} label="URL"/>
      </Box>

    </Grid>
  </Grid>)
}
