import {Field, FieldArray, FieldArrayRenderProps} from "formik";
import {Kochschritt} from "../../../models/rezept.model";
import Box from "@mui/material/Box";
import React from "react";
import {ZutatenForm} from "./ZutatenForm";
import {HilfsmittelForm} from "./HilfsmittelForm";

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
        <div>
          {kochschritte.map((item: Kochschritt, index: number) => (

            <Box style={{backgroundColor: "#ccc", border: "2px solid green", margin: "20px 0"}} key={index}>
              <p>Aktion: <Field name={`${name}[${index}][name]`}/></p>
              <p>Beschreibung: <Field name={`${name}[${index}][beschreibung]`}/></p>
              <p>Dauer: <Field type="number" name={`${name}[${index}][gesamtdauer]`}/></p>
              <p>Arbeitszeit: <Field type="number" name={`${name}[${index}][arbeitszeit]`}/></p>
              <p>Wartezeit: <Field type="number" name={`${name}[${index}][wartezeit]`}/></p>

              {/*
              public meta?: KochschrittMeta;
              */}

              <ZutatenForm name={`${name}[${index}][zutaten]`} values={item.zutaten}/>
              <HilfsmittelForm name={`${name}[${index}][hilfsmittel]`} values={item.hilfsmittel}/>
              <button type="button" onClick={() => arrayHelpers.remove(index)}>
                - Kochschritt entfernen
              </button>

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
        </div>
      )}
    />
  );
}
