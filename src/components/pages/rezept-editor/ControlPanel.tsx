import React, {useContext, useEffect} from "react";
import {StateContext} from "../../../util/state/StateProvider";
import {ActionTypes, StateContextType} from "../../../util/state/types";
import {useFormikContext} from "formik";
import {Rezept} from "../../../models/rezept.model";
import {useDebounce, useLocalStorage} from "@react-hooks-library/core";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SaveIcon from '@mui/icons-material/Save';
import PublishIcon from '@mui/icons-material/Publish';
import ClearIcon from '@mui/icons-material/Clear';
import {getKochschrittSummary, multiplyNutrients} from "../../../util/rezept-helper/kochschritt-reducer";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {APIService} from "../../../util/api/APIService";

/**
 * ControlPanel für den Rezept-Editor
 * schreibt aktuelle Form-Values in den Cache (via useEffect + dispatch)
 *
 * Benutzer-Aktionen:
 * Änderungen veröffentlichen, aktuellen Stand als Entwurf speichern, zurücksetzen (Neu)
 *
 * @component ControlPanel
 */
export function ControlPanel(): React.ReactElement {
  const navigate = useNavigate();
  const formik = useFormikContext<Rezept>();


  /* Schreibe Wert des Formulars debounced in den Global State */
  const debouncedFormValue = useDebounce<Rezept>(formik.values, 500)
  const {dispatch} = useContext(StateContext) as StateContextType
  useEffect(() => {
    // Form hasnt been touched
    if (!Object.keys(formik.touched).length) return
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: debouncedFormValue})
  }, [debouncedFormValue, formik.touched, dispatch]);


  /* Speichere Entwurf im Local Storage */
  const [, setRezeptLocal] = useLocalStorage<Rezept | null>(
    'rezeptLocal',
    null
  )
  const handleSaveDraft = () => {
    setRezeptLocal(formik.values)
  }

  /* Setze Formular zurück */
  const handleNew = () => {
    setRezeptLocal(null)
    formik.setValues(new Rezept()).then(
      () => dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: undefined})
    )
    navigate('/rezept-editor')
  }

  /* Veröffentliche Rezept mit API */
  const queryClient = useQueryClient();
  const {mutate} = useMutation<Rezept>({
    mutationFn: () => formik.values?._id
      ? APIService.put<Rezept>('rezept', formik.values._id, formik.values)
      : APIService.post<Rezept>('rezept', formik.values),
    onSuccess: async (res) => {
      setRezeptLocal(null)
      dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: undefined})
      await queryClient.invalidateQueries({queryKey: ["rezepte-suche"]})
      queryClient.invalidateQueries({queryKey: ["rezept-detail", res._id]})
        .then(() => navigate('/rezepte/' + res._id))
    }
  });

  const handlePublish = () => {
    const kochschrittSummary = getKochschrittSummary(formik.values.kochschritte)
    kochschrittSummary.nutrients = multiplyNutrients(kochschrittSummary.nutrients, formik.values.portionen || 1)
    formik.values = {...formik.values, ...kochschrittSummary}
    mutate()
  }

  return (<>
    <IconButton size="medium" color="primary"
                onClick={handleSaveDraft}
                aria-label="Entwurf speichern"
    ><SaveIcon/></IconButton>

    <IconButton size="medium" color="primary"
                onClick={handlePublish}
                aria-label="Rezept veröffentlichen"
    ><PublishIcon/></IconButton>

    <IconButton size="medium" color="primary"
                onClick={handleNew}
                aria-label="Neues Rezept verfassen"
    ><ClearIcon/></IconButton>
  </>)
}
