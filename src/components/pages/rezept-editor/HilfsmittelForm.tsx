import {Hilfsmittel} from "../../../models/hilfsmittel.model";
import {FieldArray} from "formik";
import {HilfsmittelPicker} from "../../form-elements/HilfsmittelPicker";
import React from "react";
import {FieldArrayFormProps} from "./KochSchritteForm";

export function HilfsmittelForm({name, values}: FieldArrayFormProps<Hilfsmittel>) {
  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <div>
          {values.map((hilfsmittel: Hilfsmittel, index: number) => (
            <div key={index}>
              <HilfsmittelPicker
                name={`${name}[${index}]`}
                values={hilfsmittel}
              />
              <button type="button" onClick={() => arrayHelpers.remove(index)}>
                - HM
              </button>
            </div>
          ))}
          <button type="button" onClick={() => arrayHelpers.insert(values.length, new Hilfsmittel())}>
            + HM
          </button>
        </div>
      )}
    />
  );
}
