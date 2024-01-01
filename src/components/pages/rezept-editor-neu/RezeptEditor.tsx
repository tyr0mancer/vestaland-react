import {z} from 'zod';
import React from "react";
import {Field, Form, useFormik} from "formik";
import {Benutzer} from "../../../models/benutzer.model";
import {Datei} from "../../../models/datei.model";
import {Zutat} from "../../../models/zutat.model";
import {Hilfsmittel} from "../../../models/hilfsmittel.model";
import {Kochschritt, RezeptMeta} from "../../../models/rezept.model";
import {TextField} from "@mui/material";
import {MongoDocumentFields} from "../../../models/types";

interface RezeptEditorProps {
}

/**
 * TS Doc Info
 * @component RezeptEditor
 */
export function FormikForm({}: RezeptEditorProps): React.ReactElement {

  function handleSubmit(values: Rezept) {
    alert(JSON.stringify(values, null, 2));
  }

  const {touched, errors} = useFormik({
    initialValues: new Rezept(),
    validationSchema: RezeptSchema,
    onSubmit: handleSubmit,
  });


  return (<Form>
    <Field
      as={TextField}
      name="name"
      label="Name"
      error={touched.name && Boolean(errors.name)}
      helperText={touched.name && errors.name}
    />
    <Field
      as={TextField}
      name="beschreibung"
      label="Beschreibung"
      multiline
      error={touched.beschreibung && Boolean(errors.beschreibung)}
      helperText={touched.beschreibung && errors.beschreibung}
    />
    <Field
      as={TextField}
      name="gesamtdauer"
      label="Gesamtdauer (Minuten)"
      type="number"
      error={touched.gesamtdauer && Boolean(errors.gesamtdauer)}
      helperText={touched.gesamtdauer && errors.gesamtdauer}
    />
  </Form>)
}


const RezeptSchema = z.object({
  name: z.string().min(1, "Rezept name is required"),
  beschreibung: z.string().optional(),
  gesamtdauer: z.number().min(0).optional(),
});



export class Rezept extends MongoDocumentFields {
  public name: string = '';
  public quelleUrl: string[] = [];
  public beschreibung?: string;
  public portionen: number = 1;
  public gesamtdauer?: number;
  public arbeitszeit?: number;
  public wartezeit?: number;
  public autor?: Benutzer;
  public bild?: Datei;
  public zutaten: Zutat[] = [];
  public hilfsmittel: Hilfsmittel[] = [];
  public kochschritte: Kochschritt[] = [];
  public meta?: RezeptMeta;
}
