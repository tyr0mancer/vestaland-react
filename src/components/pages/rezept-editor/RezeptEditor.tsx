import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Form, Formik} from "formik";
import {useLocalStorage} from '@react-hooks-library/core'
import LoadingIcon from "@mui/icons-material/HourglassBottom";

import {StateContext} from "../../../services/contexts/StateProvider";
import {ActionTypes, StateContextType} from "../../../services/contexts/types";
import {ErrorPage} from "../ErrorPage";
import {ControlPanel} from "./ControlPanel";

import {Rezept} from "../../../models/rezept.model";
import {rezeptDetail} from "../../../services/api/rezeptService";
import {RezeptEditorTabs} from "./RezeptEditorTabs";


/**
 * TS Doc Info
 * @component RezeptEditor
 */
export function RezeptEditor(): React.ReactElement {
  const {state: {rezeptEditing: rezeptState}, dispatch} = useContext(StateContext) as StateContextType

  const [rezeptLocal, setRezeptLocal] = useLocalStorage<Rezept | undefined>(
    'rezeptLocal',
    undefined
  )
  const {rezeptId} = useParams();
  const {data: rezeptApi, isLoading, isError, error} = useQuery(
    {
      queryKey: ["rezept-detail", rezeptId],
      queryFn: () => rezeptDetail(rezeptId || ''),
      enabled: !!rezeptId
    });

  useEffect(() => {
    if (!rezeptApi) return
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: rezeptApi})
    setRezeptLocal(undefined)
  }, [rezeptApi,dispatch, setRezeptLocal])

  const initialValues: Rezept = rezeptApi || rezeptState || rezeptLocal || new Rezept()


  if (isError)
    return <ErrorPage error={error}/>

  if (isLoading || !initialValues)
    return <LoadingIcon/>

  return (
    <Formik<Rezept>
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
