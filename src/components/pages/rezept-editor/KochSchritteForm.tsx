import {Field, FieldArray, FieldArrayRenderProps} from "formik";
import {Kochschritt, KochschrittTypus} from "../../../models/rezept.model";
import Box from "@mui/material/Box";
import React from "react";
import {ZutatenForm} from "./ZutatenForm";
import {HilfsmittelForm} from "./HilfsmittelForm";
import {Grid, IconButton, MenuItem, Select, TextField} from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

//@todo umziehen
export interface FieldArrayFormProps<T> {
  name: string;
  values: T[];
  push?: FieldArrayRenderProps['push'];
  remove?: FieldArrayRenderProps['remove'];
}

export function KochSchritteForm({name, values: kochschritte}: FieldArrayFormProps<Kochschritt>) {
  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <>
          {kochschritte.map((kochschritt: Kochschritt, index: number) => (

            <Box key={index} className={'kochschritt-form-box'}>

              <Grid container spacing={2}>
                <Grid item xs={2} md={0} textAlign={'center'}>
                  <IconButton aria-label="delete"
                              onClick={() => arrayHelpers.remove(index)}
                  >
                    <RemoveCircleIcon/>
                  </IconButton>

                </Grid>

                <Grid item xs={10} md={6}>
                  <Field
                    name={`${name}[${index}][typus]`}
                    as={Select}>
                    {Object.values(KochschrittTypus).map((key) => (
                      <MenuItem value={key}>
                        <Kochtypus typus={key}/>
                      </MenuItem>
                    ))}
                  </Field>

                  {kochschritt.typus === KochschrittTypus.FREITEXT &&
                      <Field as={TextField} type="text" variant="outlined"
                             name={`${name}[${index}][name]`} label="Freitext"/>
                  }
                </Grid>

              </Grid>

              <ZutatenForm name={`${name}[${index}][zutaten]`} values={kochschritt.zutaten}/>


              <p>Aktion: <Field name={`${name}[${index}][name]`}/></p>
              <p>Beschreibung: <Field name={`${name}[${index}][beschreibung]`}/></p>
              <p>Dauer: <Field type="number" name={`${name}[${index}][gesamtdauer]`}/></p>
              <p>Arbeitszeit: <Field type="number" name={`${name}[${index}][arbeitszeit]`}/></p>
              <p>Wartezeit: <Field type="number" name={`${name}[${index}][wartezeit]`}/></p>

              {/*

              meta.temperatur number
              meta.hitze string

export class Kochschritt {
  public name: string = "";
  public typus: KochschrittTypus = KochschrittTypus.FREITEXT;

  public beschreibung?: string;
  public videoUrl?: string;
  public repeating?: boolean;
  public gesamtdauer?: number;
  public arbeitszeit?: number;
  public wartezeit?: number;
  public zutaten: Zutat[] = [];
  public hilfsmittel: Hilfsmittel[] = [];
  public meta?: KochschrittMeta;
}
              */}


              <HilfsmittelForm name={`${name}[${index}][hilfsmittel]`} values={kochschritt.hilfsmittel}/>


              <button
                type="button"
                onClick={() => arrayHelpers.move(index, index - 1)}
              >
                Move Up
              </button>
              <button
                type="button"
                onClick={() => arrayHelpers.move(index, index + 1)}
              >
                Move Down
              </button>
            </Box>

          ))}
          <hr/>
          <button type="button" onClick={() => arrayHelpers.insert(kochschritte.length, new Kochschritt())}>
            neuer Kochschritt
          </button>
        </>
      )}
    />
  );
}


function Kochtypus({typus}: { typus: KochschrittTypus }) {
  return <>{typus}</>
}
