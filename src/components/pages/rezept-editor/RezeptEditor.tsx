import React, {useContext, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Form, Formik} from "formik";
import {Button, Container, Grid, Typography} from "@mui/material";

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
    localStorage.setItem('rezept_editor', JSON.stringify(data));
  }, [data, isSuccess])

  const queryClient = useQueryClient();

  const {mutate, isPending: isSaving} = useMutation<Rezept>({
    mutationFn: () => rezeptEditing?._id ? rezeptPutService(rezeptEditing) : rezeptPostService(rezeptEditing),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({queryKey: ["rezepte-suche"]})
      queryClient.invalidateQueries({queryKey: ["rezept-detail", res._id]})
        .then(() => navigate('/rezepte/' + res._id))
    }
  });

  const handlePublish = (rezept: Rezept) => {
    handleSave(rezept)
    mutate()


  }

  const handleNew = () => {
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: new Rezept()})
    localStorage.setItem('rezept_editor', JSON.stringify(new Rezept()));
    navigate('/rezept-editor/')
  }

  const handleSave = (rezept: Rezept) => {
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: rezept})
    localStorage.setItem('rezept_editor', JSON.stringify(rezept));
  }

  if (isLoading) return (<LoadingButton/>)

  return (
    <Formik<Rezept>
      initialValues={rezeptEditing || new Rezept()}
      onSubmit={handlePublish}
      enableReinitialize
    >
      {({values: rezept}) => {
        return (

          <Form>
            <Container sx={{backgroundColor: 'primary.main', padding: '5px'}}>
              <Grid columnSpacing={1} container>
                <Grid item xs={12} md={6}>
                  <Typography variant="h2" color={'secondary'}>
                    {!rezeptEditing?._id && <>Neues Rezept</>}
                    {rezeptEditing?._id && <>Rezept bearbeiten</>}
                  </Typography>
                </Grid>

                <Grid item xs={4} md={2}>
                  <Button color={'secondary'} variant={'outlined'} fullWidth
                          onClick={handleNew} startIcon={<AppRegistrationIcon color={'secondary'}/>}>Neu</Button>
                </Grid>

                <Grid item xs={4} md={2}>
                  <Button color={'secondary'} variant={'contained'} fullWidth
                          onClick={() => handleSave(rezept)} startIcon={<SaveIcon color="primary"/>}>Save</Button>
                </Grid>
                <Grid item xs={4} md={2}>
                  {isSaving &&
                      <Button color={'secondary'} variant={'contained'} fullWidth disabled={true}
                              type={'submit'} startIcon={<PublishIcon/>}>...</Button>
                  }
                  {!isSaving &&
                      <Button color={'secondary'} variant={'contained'} fullWidth
                              type={'submit'} startIcon={<PublishIcon/>}>Upload</Button>
                  }
                </Grid>
              </Grid>
            </Container>

            <hr/>

            <RezeptEditorForm/>
          </Form>)
      }}
    </Formik>)

}
