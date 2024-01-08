import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Form, Formik} from "formik";
import {useLocalStorage} from '@react-hooks-library/core'

import {Rezept} from "../../../shared-types/models/rezept.model";
import {ActionTypes, StateContextType} from "../../../util/state/types";
import {StateContext} from "../../../util/state/StateProvider";
import {LoadingScreen} from "../../common/ui/LoadingScreen";
import {RezeptEditorTabs} from "./RezeptEditorTabs";
import {APIService} from "../../../util/api/APIService";


/**
 * Hauptkomponente des Rezept-Editors
 * beinhaltet <Formik/> Wurzel und ermittelt initialValue per API Call bzw. Cache
 *
 * @see RezeptEditorTabs
 * @see ControlPanel
 * @see OverviewForm
 * @see KochschritteForm
 *
 * @component RezeptEditor
 */
export function RezeptEditor(): React.ReactElement {

  /* Prio 1: rezeptApi - Wenn die URL den parameter 'rezeptId' liefert, lade den Inhalt von der API */
  const {rezeptId} = useParams();
  const {data: rezeptApi, isFetching} = useQuery( //@todo liefert aktuell noch null falls parameter falsch ist - sollte Fehler werfen -> Express
    {
      queryKey: ["rezept-detail", rezeptId],
      queryFn: () => APIService.getById<Rezept>('rezept', rezeptId || ''),
      enabled: !!rezeptId
    });

  /* Prio 2: rezeptState - Falls im Global State 'rezeptEditing' gesetzt ist */
  const {state: {rezeptEditing: rezeptState}, dispatch} = useContext(StateContext) as StateContextType

  /* Prio 3: rezeptLocal - Falls im Local Storage 'rezeptLocal' gesetzt ist */
  const [rezeptLocal, setRezeptLocal] = useLocalStorage<Rezept | null>(
    'rezeptLocal',
    null
  )

  /* Falls API Aufruf Editor-Form ändert, Global State und Local Storage anpassen (caching) */
  useEffect(() => {
    if (!rezeptApi) return
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: rezeptApi})
    setRezeptLocal(null)
  }, [rezeptApi, dispatch, setRezeptLocal])

  /* Priorisierung wie oben beschrieben */
  const initialValues: Rezept = rezeptApi || rezeptState || rezeptLocal || new Rezept()


  return (isFetching || !initialValues) ? <LoadingScreen/> :
    (<Formik<Rezept>
      initialValues={initialValues}
      onSubmit={() => {
      }}
      enableReinitialize
    >
      {() => {
        return (
          <Form>
            <RezeptEditorTabs/>
          </Form>)
      }}
    </Formik>)

}
