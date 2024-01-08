import React from "react";
import {FieldArray} from "formik";
import {Button} from "@mui/material";
import {Zutat} from "../../../models/zutat.model";

interface ArrayFormProps<T> {
  name: string,
  values: T[]

}

// @ts @info
/**
 * Wrapper für Formik-Arrays
 *
 * @example *
 * <ArrayForm<Zutat> name={`${name}[zutaten]`} values={values.zutaten}>
 *   <ZutatenForm />
 * </ArrayForm>
 *
 * @component ArrayForm
 */
export function ArrayForm<T>({name, values}: ArrayFormProps<T>): React.ReactElement {

  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <div>
          {values.map((element: T, index: number) => (


            <div key={index}>
              <Button variant="contained" onClick={() => arrayHelpers.remove(index)}> - </Button>
              <pre>{JSON.stringify(element, null, 2)}</pre>

              {/*{children}*/}
              {/*<ZutatenPicker name={`${name}[${index}]`} values={zutat}/>*/}

              <button type="button" onClick={() => arrayHelpers.insert(index + 1, new Zutat())}>
                + Zutat
              </button>
            </div>
          ))}
          <Button variant="contained" onClick={() => arrayHelpers.insert(values.length, new Zutat())}>
            neues Element
          </Button>
        </div>
      )}
    />
  )
}
