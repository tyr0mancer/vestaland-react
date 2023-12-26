import React, {useState} from 'react';
import {Formik, Form, Field, FieldArray,} from 'formik';
import {Kochschritt, Rezept} from "../../models/rezept.model";

// RezeptForm Komponente
export const RezeptForm = () => {

  const [rezept, setRezept] = useState<Rezept>(new Rezept())

  return (<>
      <Formik<Rezept>
        initialValues={rezept}
        onSubmit={values => setRezept(values)}
      >
        {({values}) => (
          <Form>
            <pre>{JSON.stringify(values)}</pre>
            <Field name="name"/>
            <FieldArray name="kochschritte">
              {({push}) => (
                <>
                  {values.kochschritte.length > 0 &&
                    values.kochschritte.map((kochschritt, index) =>
                      <KochSchrittAnzeige key={index} kochschritt={kochschritt}/>)}
                  <KochSchrittNeu/>
                  <button type="submit" onClick={() => push(new Kochschritt())}>add</button>
                </>
              )}
            </FieldArray>
            <button type="submit">Submit</button>
          </Form>


        )}
      </Formik>
      <hr/>
      <pre>{JSON.stringify(rezept)}</pre>
    </>
  );
};


export const KochSchrittAnzeige = ({kochschritt}: { kochschritt: Kochschritt }) => {
  return (<>
    <p>Name: {kochschritt.name}</p>
  </>)
}
export const KochSchrittNeu = () => {
  return (<>
    <p>Name: </p>
  </>)
}
