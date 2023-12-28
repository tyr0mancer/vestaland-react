import React, {useContext, useEffect} from 'react';
import {Field, FieldArray, FieldArrayRenderProps, Form, Formik, useFormik,} from 'formik';
import {Kochschritt, KochschrittMeta, Rezept} from "../../models/rezept.model";
import {StateContext} from "../../services/contexts/StateProvider";
import {ActionTypes, StateContextType} from "../../services/contexts/types";
import {Zutat} from "../../models/zutat.model";
import Box from "@mui/material/Box";
import {Hilfsmittel} from "../../models/hilfsmittel.model";
import {useDebounce} from "../../services/hooks/use-debounce";

export const RezeptForm = () => {
  const {state, dispatch} = useContext(StateContext) as StateContextType

  useEffect(() => {
    dispatch({type: ActionTypes.PUSH_REZEPT, payload: 'neu'})
  }, [])

  const debouncedRezept = useDebounce<Rezept | undefined>(state.aktuellesRezept, 200)

  const handleSave = (rezept: Rezept) => {
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: rezept})
    console.log('speichern', rezept)
    if (rezept._id) {
      // Put mutation
    }
    else {
      // Post mutation
    }
  }

  const formik = useFormik<Rezept>({
    initialValues: state.aktuellesRezept || new Rezept(),
    enableReinitialize: true,
    onSubmit: handleSave,
  });

  return (<>
      <Formik<Rezept>
        initialValues={state.aktuellesRezept || new Rezept()}
        onSubmit={rezept => dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: rezept})}
      >
        {({values: rezept}) => (
          <Form>
            <Field name="name"/>
            <Field name="portionen"/>
            <KochSchritteForm name="kochschritte" values={rezept.kochschritte}/>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      <hr/>
      <pre>{JSON.stringify(state.aktuellesRezept)}</pre>
    </>
  );
};


interface FieldArrayFormProps<T> {
  name: string;
  values: T[];
  push?: FieldArrayRenderProps['push'];
  remove?: FieldArrayRenderProps['remove'];
}

function KochSchritteForm({name, values: kochschritte}: FieldArrayFormProps<Kochschritt>) {
  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <div>
          {kochschritte.map((item: Kochschritt, index: number) => (

            <Box style={{backgroundColor: "#ccc", border: "2px solid green", margin: "20px 0"}} key={index}>
              <p>Aktion: <Field name={`${name}[${index}][aktion]`}/></p>
              <p>Beschreibung: <Field name={`${name}[${index}][beschreibung]`}/></p>
              <p>Dauer: <Field name={`${name}[${index}][dauer]`}/></p>

              {/*
              public meta?: KochschrittMeta;
              */}


              <ZutatenForm name={`${name}[${index}][zutaten]`} values={item.zutaten}/>
              <HilfsmittelForm name={`${name}[${index}][hilfsmittel]`} values={item.hilfsmittel}/>
              <button type="button" onClick={() => arrayHelpers.remove(index)}>
                - Kochschritt entfernen
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

function ZutatenForm({name, values: zutaten}: FieldArrayFormProps<Zutat>) {
  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <div>
          {zutaten.map((zutat: Zutat, index: number) => (
            <div key={index}>
              <Field name={`${name}[${index}][menge]`}/>

              <Field name={`${name}[${index}][einheit]`}/>
              <Field name={`${name}[${index}][lebensmittel]`}/>

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


function HilfsmittelForm({name, values}: FieldArrayFormProps<Hilfsmittel>) {
  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <div>
          {values.map((hilfsmittel: Hilfsmittel, index: number) => (
            <div key={index}>

              <HilfsmittelPicker/>

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
};


function HilfsmittelPicker() {
  return (<>
    <b>HilfsmittelPicker</b>
  </>)
}
