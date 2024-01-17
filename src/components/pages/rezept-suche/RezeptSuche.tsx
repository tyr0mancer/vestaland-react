import React from 'react';
import {Form, Formik} from 'formik';
import {RezeptSucheForm} from './RezeptSucheForm';
import {RezeptSucheAusgabe} from "./RezeptSucheAusgabe";
import {RezeptSucheSchema, RezeptSucheType} from "../../../shared-types/schemas/rezept-schema";
import {useDataSync} from "../../../util/state/useDataSync";


export function RezeptSuche() {

  const {initialValues, validateForm} = useDataSync<RezeptSucheType>({
    defaultValues: {tags: []},
    contextKey: 'rezeptSuche',
    validationSchema: RezeptSucheSchema,
  })

  return (
    <>
      <Formik<RezeptSucheType>
        initialValues={initialValues}
        onSubmit={(val) => console.log(val)}
        validate={validateForm}
      >
        {({}) => {
          return (<Form><RezeptSucheForm/> </Form>)
        }}
      </Formik>
      <br/>
      <RezeptSucheAusgabe/>
    </>
  )

}


