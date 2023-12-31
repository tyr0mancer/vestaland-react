import React, {useContext, useEffect} from "react";
import {Field, useFormikContext} from "formik";
import {Rezept} from "../../../models/rezept.model";
import {TextField} from "@mui/material";
import {ActionTypes, StateContextType} from "../../../services/contexts/types";
import {StateContext} from "../../../services/contexts/StateProvider";


export function RezeptEditorForm() {
  const formik = useFormikContext<Rezept>();
  const {dispatch} = useContext(StateContext) as StateContextType


  useEffect(() => {
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: formik.values})
  }, [formik.values, dispatch]);


  return (<>
    <Field as={TextField} type="text" variant="outlined" fullWidth
           name="name" label="Rezeptname"/>

  </>)

}
