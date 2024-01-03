import React, {useContext, useEffect} from "react";
import {StateContext} from "../../../services/contexts/StateProvider";
import {ActionTypes, StateContextType} from "../../../services/contexts/types";
import {useFormikContext} from "formik";
import {Rezept} from "../../../models/rezept.model";
import {useDebounce, useLocalStorage} from "@react-hooks-library/core";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";


/**
 * TS Doc Info
 * @component ControlPanel
 */
export function ControlPanel(): React.ReactElement {
  const {dispatch} = useContext(StateContext) as StateContextType
  const formik = useFormikContext<Rezept>();
  const debouncedFormValue = useDebounce<Rezept>(formik.values, 200)
  const navigate = useNavigate();

  useEffect(() => {
    // Form hasnt been touched
    if (!Object.keys(formik.touched).length) return
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: debouncedFormValue})
  }, [debouncedFormValue, formik.touched]);


  const [, setRezeptLocal] = useLocalStorage<Rezept | undefined>(
    'rezeptLocal',
    undefined
  )

  const handleSave = () => {
    setRezeptLocal(formik.values)
  }

  const handlePublish = () => {
    alert(JSON.stringify(formik.values))

    // reducer
    setRezeptLocal(undefined)
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: undefined})
    navigate('/rezepte/' + formik.values._id)
  }

  const handleNew = () => {
    setRezeptLocal(undefined)

    formik.setValues(new Rezept()).then(
      () => dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: undefined})
    )
    navigate('/rezept-editor')
  }


  return (<>
    <Button variant={'contained'} color={'secondary'} onClick={handleSave}>Entwurf speichern</Button>
    <Button variant={'contained'} color={'secondary'} onClick={handlePublish}>Rezept veröffentlichen</Button>
    <Button variant={'contained'} color={'secondary'} onClick={handleNew}>Neues Rezept verfassen</Button>
  </>)
}
