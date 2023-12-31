import React, {useContext, useEffect} from "react";
import {Field, useFormikContext} from "formik";
import {Rezept} from "../../../models/rezept.model";
import {Checkbox, FormControlLabel, Grid, TextField} from "@mui/material";
import {ActionTypes, StateContextType} from "../../../services/contexts/types";
import {StateContext} from "../../../services/contexts/StateProvider";
import {getFileUrl} from "../../../services/api/fileService";


export function RezeptEditorForm() {
  const formik = useFormikContext<Rezept>();
  const {dispatch} = useContext(StateContext) as StateContextType


  useEffect(() => {
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: formik.values})
  }, [formik.values, dispatch]);


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
               name="gesamtdauer" label="gesamtdauer"/>
      </Grid>
      <Grid item xs={6} md={2}>
        <Field as={TextField} type="number" variant="outlined" fullWidth
               name="arbeitszeit" label="arbeitszeit"/>
      </Grid>
      <Grid item xs={12} md={8}>
        <Field as={TextField} type="text" variant="outlined" fullWidth
               name="quelleUrl" label="Quelle"/>
      </Grid>

      <Grid item xs={12} md={4} textAlign={'center'}>
        {formik.values?.bild &&
            <img src={getFileUrl(formik.values.bild?.fileName)} height={200}
                 alt={formik.values.bild.name}/>}
        {!formik.values?.bild && <>
            <h2>File Uploader</h2>
        </>}
      </Grid>
      <Grid item xs={12} md={8}>
        <Field
          type="checkbox"
          name="vegetarisch"
          as={FormControlLabel}
          control={<Checkbox/>}
          label="Vegetarisch"
        />

        <Field
          type="checkbox"
          name="healthy"
          as={FormControlLabel}
          control={<Checkbox/>}
          label="Diätisch"
        />

        <Field
          type="checkbox"
          name="soulfood"
          as={FormControlLabel}
          control={<Checkbox/>}
          label="Soulfood"
        />
      </Grid>


    </Grid>

    <hr/>
    <pre>{JSON.stringify(formik.values, null, 2)}</pre>

  </>)

}

/*
public bild?: Datei;
public kochschritte: Kochschritt[] = [];

*/
