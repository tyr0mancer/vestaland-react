import React, {useEffect} from 'react';
import {Field, FieldArray, FieldArrayRenderProps, Form, Formik, useFormikContext,} from 'formik';
import {Kochschritt, Rezept} from "../../models/rezept.model";
import {Zutat} from "../../models/zutat.model";
import Box from "@mui/material/Box";
import {Hilfsmittel} from "../../models/hilfsmittel.model";
import useLocalStorage from "use-local-storage";
import {HilfsmittelPicker} from "../form-elements/HilfsmittelPicker";
import {LebensmittelPicker} from "../form-elements/LebensmittelPicker";
import {Lebensmittel} from "../../models/lebensmittel.model";

export const RezeptForm = () => {
  const [rezeptCache, setRezeptCache] = useLocalStorage<Rezept | null>("rezept_editor", null)

  const handleSave = (rezept: Rezept) => {
    rezept.zutaten = []
    rezept.hilfsmittel = []

    rezept.kochschritte.forEach((k => {
      k.zutaten.map(z => rezept.zutaten.push(z))
      k.hilfsmittel.map(hm => rezept.hilfsmittel.push(hm))
    }))

    if (!rezept._id) {
    } else {
      //rezept._id = 'neueIDxzy'
    }

    setRezeptCache(() => rezept)
  }


  return (<>
      <Formik<Rezept>
        initialValues={rezeptCache || new Rezept()}
        onSubmit={handleSave}
        enableReinitialize
      >
        <InnerForm/>
      </Formik>
      <pre>{JSON.stringify(rezeptCache, null, 2)}</pre>
    </>
  );
};

const InnerForm = () => {
  const formik = useFormikContext<Rezept>();

  // speichert aktuellen Stand lokal und offline Verfügbar
  const [, setRezeptCache] = useLocalStorage<Rezept | null>("rezept_editor", null)
  useEffect(() => {
    setRezeptCache(formik.values)
  }, [formik.values, setRezeptCache]);

  return (<Form>
      <Field name="name"/>
      <Field name="portionen"/>
      <KochSchritteForm name="kochschritte" values={formik.values.kochschritte}/>
      <button type="submit">Speichern</button>
    </Form>
  )
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


function HilfsmittelForm({name, values}: FieldArrayFormProps<Hilfsmittel>) {
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
