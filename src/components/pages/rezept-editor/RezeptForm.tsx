import React, {useContext, useEffect} from 'react';
import {Field, Form, Formik, useFormikContext,} from 'formik';
import {Kochschritt, Rezept} from "../../../models/rezept.model";
import {Zutat} from "../../../models/zutat.model";
import {Hilfsmittel} from "../../../models/hilfsmittel.model";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {StateContext} from "../../../services/contexts/StateProvider";
import {ActionTypes, StateContextType} from "../../../services/contexts/types";
import {rezeptPostService, rezeptPutService} from "../../../services/api/rezeptService";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {KochSchritteForm} from "./KochSchritteForm";


interface KochschrittSummary {
  arbeitszeit: number,
  wartezeit: number,
  gesamtdauer: number,
  zutaten: Zutat[],
  hilfsmittel: Hilfsmittel[]
}

const kochschrittSummaryDefault: KochschrittSummary = {
  arbeitszeit: 0,
  wartezeit: 0,
  gesamtdauer: 0,
  zutaten: [],
  hilfsmittel: []
}

const kochschrittReducer = (summary: KochschrittSummary, kochschritt: Kochschritt) => {
  let zutaten = kochschritt.zutaten.reduce((bisherigeListe, zutat) => {
    return [...bisherigeListe, zutat]
  }, summary.zutaten)

  let hilfsmittel = [...summary.hilfsmittel, ...kochschritt.hilfsmittel]
  let arbeitszeit = summary.arbeitszeit + (kochschritt?.arbeitszeit || 0)
  let wartezeit = summary.wartezeit + (kochschritt?.wartezeit || 0)
  let gesamtdauer = summary.wartezeit + (kochschritt?.gesamtdauer || arbeitszeit + wartezeit)

  return {
    arbeitszeit,
    wartezeit,
    gesamtdauer,
    zutaten,
    hilfsmittel
  }
}


export const RezeptForm = () => {
    const {state: {rezeptEditing}, dispatch} = useContext(StateContext) as StateContextType

    const handleSave = (rezept: Rezept) => {
      const kochschritteSummary = rezept.kochschritte.reduce(kochschrittReducer, kochschrittSummaryDefault)
      rezept.zutaten = kochschritteSummary.zutaten
      rezept.hilfsmittel = kochschritteSummary.hilfsmittel
      rezept.gesamtdauer = kochschritteSummary.gesamtdauer
      rezept.arbeitszeit = kochschritteSummary.arbeitszeit
      rezept.wartezeit = kochschritteSummary.wartezeit
      localStorage.setItem('rezept_editor', JSON.stringify(rezept));
      dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: rezept})
    }
    const navigate = useNavigate()


    const {mutate: neuesRezept} = useMutation({
      mutationFn: () => rezeptPostService(rezeptEditing)
    });
    const {mutate: updateRezept} = useMutation({
      mutationFn: () => rezeptPutService(rezeptEditing)
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
