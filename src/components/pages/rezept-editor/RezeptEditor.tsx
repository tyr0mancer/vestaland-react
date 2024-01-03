import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Form, Formik} from "formik";
import {useLocalStorage} from '@react-hooks-library/core'

import {Rezept} from "../../../models/rezept.model";
import {ActionTypes, StateContextType} from "../../../services/contexts/types";
import {StateContext} from "../../../services/contexts/StateProvider";
import {rezeptDetail} from "../../../services/api/rezeptService";
import {LoadingPage} from "../service-pages/LoadingPage";
import {ControlPanel} from "./ControlPanel";
import {RezeptEditorTabs} from "./RezeptEditorTabs";


/**
 * TS Doc Info
 * @component RezeptEditor
 */
export function RezeptEditor(): React.ReactElement {

  /* Prio 1: rezeptApi - Wenn die URL den parameter 'rezeptId' liefert, lade den Inhalt von der API */
  const {rezeptId} = useParams();
  const {data: rezeptApi, isFetching} = useQuery( //@todo liefert aktuell noch null falls parameter falsch ist - sollte Fehler werfen -> Express
    {
      queryKey: ["rezept-detail", rezeptId],
      queryFn: () => rezeptDetail(rezeptId || ''),
      enabled: !!rezeptId
    });

  /* Prio 2: rezeptState - Falls im Global State 'rezeptEditing' gesetzt ist */
  const {state: {rezeptEditing: rezeptState}, dispatch} = useContext(StateContext) as StateContextType

  /* Prio 3: rezeptLocal - Falls im Local Storage 'rezeptLocal' gesetzt ist */
  const [rezeptLocal, setRezeptLocal] = useLocalStorage<Rezept | undefined>(
    'rezeptLocal',
    undefined
  )

  /* Falls API Aufruf Editor-Form ändert, Global State und Local Storage anpassen (caching) */
  useEffect(() => {
    if (!rezeptApi) return
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: rezeptApi})
    setRezeptLocal(undefined)
  }, [rezeptApi, dispatch, setRezeptLocal])

  /* Priorisierung wie oben beschrieben */
  const initialValues: Rezept = rezeptApi || rezeptState || rezeptLocal || new Rezept()


  return (isFetching || !initialValues) ? <LoadingPage/> :
    (<Formik<Rezept>
      initialValues={initialValues}
      onSubmit={() => {
      }}
      enableReinitialize
    >
      {() => {
        return (
          <Form>
            <ControlPanel/>
            <RezeptEditorTabs/>
          </Form>)
      }}
    </Formik>)

}
