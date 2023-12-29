import React, {useContext, useEffect} from 'react';
import {Field, FieldArray, FieldArrayRenderProps, Form, Formik, useFormikContext,} from 'formik';
import {Kochschritt, Rezept} from "../../../models/rezept.model";
import {Zutat} from "../../../models/zutat.model";
import Box from "@mui/material/Box";
import {Hilfsmittel} from "../../../models/hilfsmittel.model";
import {HilfsmittelPicker} from "../../form-elements/HilfsmittelPicker";
import {LebensmittelPicker} from "../../form-elements/LebensmittelPicker";
import {Lebensmittel} from "../../../models/lebensmittel.model";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {StateContext} from "../../../services/contexts/StateProvider";
import {ActionTypes, StateContextType} from "../../../services/contexts/types";
import {rezeptPost, rezeptPut} from "../../../services/api/rezeptService";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const RezeptForm = () => {
    const {state: {rezeptEditing}, dispatch} = useContext(StateContext) as StateContextType

    const zutatenReducer = (zutaten: Zutat[], kochschritt: Kochschritt) => {
      return kochschritt.zutaten.reduce((bisherigeListe, zutat) => {
        return [...bisherigeListe, zutat]
      }, zutaten)
    }
    const hilfsmittelReducer = (hilfsmittel: Hilfsmittel[], kochschritt: Kochschritt) => {
      return [...hilfsmittel, ...kochschritt.hilfsmittel]
    }

    const handleSave = (rezept: Rezept) => {
      rezept.zutaten = rezept.kochschritte.reduce(zutatenReducer, [])
      rezept.hilfsmittel = rezept.kochschritte.reduce(hilfsmittelReducer, [])
      localStorage.setItem('rezept_editor', JSON.stringify(rezept));
      dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: rezept})
    }
    const navigate = useNavigate()


    const {mutate: neuesRezept} = useMutation({
      mutationFn: () => rezeptPost(rezeptEditing)
    });
    const {mutate: updateRezept} = useMutation({
      mutationFn: () => rezeptPut(rezeptEditing)
    });

    const queryClient = useQueryClient();


    const handlePublish = async () => {
      if (!rezeptEditing) return
      handleSave(rezeptEditing)

      //await queryClient.invalidateQueries({queryKey: ["rezepte-suche"]})

      if (rezeptEditing._id) {
        updateRezept()
        queryClient.invalidateQueries({
          queryKey: ["rezept-detail", rezeptEditing?._id]
        }).then(() => {
          navigate('/rezepte/' + rezeptEditing._id)
        })
        //navigate('/rezepte')
      } else {
        neuesRezept()
        navigate('/rezepte')
      }
    }

    return (<>
        <textarea value={JSON.stringify(rezeptEditing, null, 2)} readOnly={true}/>
        {rezeptEditing?.bild &&
            <img src={'https://api.vestaland.de/public/uploads/' + rezeptEditing.bild?.fileName} height={200}
                 alt={rezeptEditing.bild.name}/>}
        <button type="button" onClick={handlePublish}>Publish</button>

        <Formik<Rezept>
          initialValues={rezeptEditing || new Rezept()}
          onSubmit={handleSave}
          enableReinitialize
        >
          <InnerForm/>
        </Formik>
      </>
    );
  }
;

const InnerForm = () => {
  const navigate = useNavigate();
  const formik = useFormikContext<Rezept>();
  const {dispatch} = useContext(StateContext) as StateContextType

  const handleCancel = () => {
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: undefined})
    navigate('/rezepte')
  }

  useEffect(() => {
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: formik.values})
  }, [formik.values, dispatch]);

  return (<Form>
      <Field name="name"/>
      <Field name="portionen"/>
      <KochSchritteForm name="kochschritte" values={formik.values.kochschritte}/>
      <button type="submit">Speichern</button>
      <Button type={"button"} onClick={handleCancel}>Abbrechen</Button>
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
              <p>Aktion: <Field name={`${name}[${index}][name]`}/></p>
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
