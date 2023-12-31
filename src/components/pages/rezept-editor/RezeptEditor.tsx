import React, {useContext, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Form, Formik} from "formik";
import {Button, Typography} from "@mui/material";

import {StateContext} from "../../../services/contexts/StateProvider";
import {ActionTypes, StateContextType} from "../../../services/contexts/types";
import {Rezept} from "../../../models/rezept.model";
import {RezeptEditorForm} from "./RezeptEditorForm";
import {rezeptDetail, rezeptPostService, rezeptPutService} from "../../../services/api/rezeptService";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from '@mui/icons-material/Save';
import PublishIcon from '@mui/icons-material/Publish';

export function RezeptEditor() {
  const navigate = useNavigate()

  const {state: {rezeptEditing}, dispatch} = useContext(StateContext) as StateContextType
  const params = useParams();
  const {
    isLoading,
    isSuccess,
    data
  } = useQuery(
    {
      queryKey: ["rezept-detail", params.rezeptId],
      queryFn: () => rezeptDetail(params.rezeptId || ''),
      enabled: !!params.rezeptId
    });

  useEffect(() => {
    if (!isSuccess || !data) return
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: data})
  }, [data, isSuccess])


  const {mutate, isPending: isSaving} = useMutation<Rezept>({
    mutationFn: () => rezeptEditing?._id ? rezeptPutService(rezeptEditing) : rezeptPostService(rezeptEditing),
    onSuccess: (res) => {
      navigate('/rezept-editor/' + res._id)
    }
  });

  const handlePublish = () => {
    handleSave()
    mutate()
  }

  const handleNew = () => {
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: new Rezept()})
    localStorage.setItem('rezept_editor', JSON.stringify(new Rezept()));
    navigate('/rezept-editor/')
  }

  const handleSave = () => {
    localStorage.setItem('rezept_editor', JSON.stringify(rezeptEditing));
  }

  if (isLoading) return (<LoadingButton/>)

  return (
    <Formik<Rezept>
      initialValues={rezeptEditing || new Rezept()}
      onSubmit={handlePublish}
      enableReinitialize
    ><Form>

      <Typography variant="h2" borderBottom={1} marginBottom={3}>Rezept-Editor</Typography>
      <p>{JSON.stringify(rezeptEditing)}</p>


      <Button startIcon={<AppRegistrationIcon/>} color={'secondary'} onClick={handleNew}
              variant={'contained'}>Neues Rezept</Button>
      <Button color={'primary'} onClick={handleSave}
              startIcon={<SaveIcon color="primary"/>} variant={'outlined'}>Speichern</Button>


      {isSaving &&
          <Button startIcon={<PublishIcon color={'disabled'}/>} color={'primary'} disabled={true}
                  variant={'contained'}>...speichert</Button>

      }
      {!isSaving &&
          <Button type={'submit'} startIcon={<PublishIcon/>} color={'primary'}
                  variant={'contained'}>Veröffentlichen</Button>
      }


      <hr/>

      <RezeptEditorForm/>
    </Form>
    </Formik>)

}
