import React from "react";
import {CustomFieldProps} from "./types";
import {Utensil} from "../../../shared-types/models/Utensil";
import {Field, FieldArray} from "formik";
import {Box, Button, Card, Grid, IconButton, TextField} from "@mui/material";
import {UtensilPicker} from "./UtensilPicker";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";
import MenuIcon from "@mui/icons-material/Menu";

/**
 * TS Doc Info
 * @component UtensilienForm
 *
 * @see UtensilForm
 */
export function UtensilienPicker({name, values: utensilien}: CustomFieldProps<Utensil[]>): React.ReactElement {
  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <Box>
          {utensilien?.map((utensil, index) =>

            <UtensilForm key={index} index={index} name={`${name}[${index}]`} values={utensil}
                         arrayHelpers={arrayHelpers}/>
          )}
          {!utensilien?.length &&
              <Button variant="contained"
                      onClick={() => arrayHelpers.insert(utensilien.length, {utensilName: ''} as Utensil)}>
                  neues Utensil
              </Button>
          }
        </Box>
      )}
    />
  )
}


/**
 * TS Doc Info
 * @component UtensilForm
 *
 * @see UtensilienPicker
 */
function UtensilForm({index = 0, name, values, arrayHelpers}: CustomFieldProps<Utensil>) {
  return (<Card style={{paddingTop: 15}}>

    <Grid container>
      <Grid item xs={6} md={6} style={{display: 'flex', alignItems: 'center'}}>
        <IconButton
          tabIndex={1}
          size={'small'}
          aria-label="delete"
          onClick={() => arrayHelpers?.remove(index)}
        ><DeleteForeverIcon color="warning"/></IconButton>

        <UtensilPicker
          name={`${name}`}
          values={values || new Utensil()}
        />
      </Grid>


      <Grid item xs={12} md={1} sx={{display: {xs: 'none', md: 'flex'}}}>
        <IconButton
          size={'small'}
          aria-label="Utensil einfügen"
          onClick={() => arrayHelpers?.insert(index + 1, new Utensil())}
        ><SubdirectoryArrowLeftIcon/></IconButton>
      </Grid>

      <Grid item xs={12} md={5}>
        <Field as={TextField} type="text" variant="standard" fullWidth
               size={'small'} disabled={true}
               name={`${name}[beschreibung]`}/>
        <Field as={TextField} type="text" variant="standard" fullWidth
               size={'small'} disabled={true}
               name={`${name}[volumen]`} label={'Volumen'}/>
      </Grid>

      <Grid item xs={1} md={12} sx={{display: {xs: 'flex', md: 'none'}}}>
        <IconButton
          size={'small'}
          aria-label="Utensil verschieben"

        ><MenuIcon/></IconButton>
      </Grid>


    </Grid>

  </Card>)
}
