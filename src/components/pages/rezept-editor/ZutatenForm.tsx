import {Zutat} from "../../../models/zutat.model";
import {Field, FieldArray} from "formik";
import {LebensmittelPicker} from "../../form-elements/LebensmittelPicker";
import {Lebensmittel} from "../../../models/lebensmittel.model";
import React from "react";
import {FieldArrayFormProps} from "./KochSchritteForm";

export function ZutatenForm({name, values: zutaten}: FieldArrayFormProps<Zutat>) {
  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <div>
          {zutaten.map((zutat: Zutat, index: number) => (
            <div key={index}>
              <Field name={`${name}[${index}][menge]`}/>

              <Field name={`${name}[${index}][einheit]`}/>
              <LebensmittelPicker
                name={`${name}[${index}][lebensmittel]`}
                values={zutat.lebensmittel || new Lebensmittel()}
              />
              <button type="button" onClick={() => arrayHelpers.remove(index)}>
                - Zutat
              </button>
            </div>
          ))}
          <button type="button" onClick={() => arrayHelpers.insert(zutaten.length, new Zutat())}>
            + Zutat
          </button>
        </div>
      )}
    />
  )
}
