import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Formik} from "formik";
import {Rezept} from "../../../shared-types/model/Rezept";
import {StateContextType} from "../../../util/state/types";
import {ActionTypes} from "../../../util/state/reducers";

import {StateContext} from "../../../util/state/StateProvider";
import {LoadingScreen} from "../../common/ui/LoadingScreen";
import {RezeptEditorForm} from "./RezeptEditorForm";
import {APIService} from "../../../util/api/APIService";
import {DefaultValues} from "./index";


/**
 * Hauptkomponente des Rezept-Editors
 * beinhaltet <Formik/> Wurzel und ermittelt initialValue per API Call bzw. State
 *
 * @component RezeptEditor
 *
 * @see RezeptEditorForm
 * @see ControlPanel
 * @see OverviewForm
 * @see KochschritteForm
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


  /* Falls API Aufruf Editor-Form ändert, Global State und Local Storage anpassen (caching) */
  useEffect(() => {
    if (!rezeptApi) return
    dispatch({type: ActionTypes.SAVE_REZEPT_EDIT, payload: rezeptApi})
  }, [rezeptApi, dispatch])

  /* Priorisierung wie oben beschrieben */
  const initialValues: Rezept = rezeptApi || rezeptState || DefaultValues.rezept

  return (isFetching || !initialValues) ? <LoadingScreen/> :
    (<Formik<Rezept>
      initialValues={initialValues}
      onSubmit={() => {
      }}
      enableReinitialize
    >
      {() => (<RezeptEditorForm/>)}
    </Formik>)

}
