import React from "react";
import {FieldArray, useFormikContext} from "formik";
import {Kochschritt, Rezept} from "../../../models/rezept.model";
import Box from "@mui/material/Box";
import {Button, Grid, IconButton} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {ZutatenForm} from "./ZutatenForm";
import {Zutat} from "../../../models/zutat.model";

/**
 * TS Doc Info
 * @component KochschritteForm
 */
export function KochschritteForm(): React.ReactElement {
  const formik = useFormikContext<Rezept>()
  const name = 'kochschritte'

  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <>
          {formik.values.kochschritte.map((kochschritt: Kochschritt, index: number) => (

            <Box key={index} className={'kochschritt-form-box'}>
              <IconButton aria-label="delete" onClick={() => arrayHelpers.remove(index)}>
                <RemoveCircleIcon/>
              </IconButton>
              <IconButton aria-label="delete"
                          disabled={index === 0}
                          onClick={() => arrayHelpers.move(index, index - 1)}>
                <ArrowCircleUpIcon/>
              </IconButton>
              <IconButton aria-label="delete"
                          disabled={index === formik.values.kochschritte.length - 1}
                          onClick={() => arrayHelpers.move(index, index + 1)}>
                <ArrowCircleDownIcon/>
              </IconButton>

              <Grid container>
                <Grid item xs={12} md={8}>
                  <ZutatenForm name={`${name}[${index}][zutaten]`} values={kochschritt.zutaten}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  Freitext, Aktion-Picker
                </Grid>
              </Grid>


            </Box>
          ))}
          <hr/>
          <Button variant={'contained'} color={'primary'} startIcon={<AddBoxIcon/>}
                  onClick={() => arrayHelpers.insert(formik.values.kochschritte.length, new Kochschritt([new Zutat()]))}>
            neuer Kochschritt
          </Button>
        </>
      )}
    />
  );
}
