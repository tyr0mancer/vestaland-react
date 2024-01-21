import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {QueryClient} from "@tanstack/react-query";

import {AppBar, Grid, IconButton, Toolbar, Tooltip} from "@mui/material";
import {useFormikContext} from "formik";
import {CloudUpload as PublishIcon, DeleteForever as ResetIcon, Save as SaveIcon} from "@mui/icons-material";


import {customConfirm} from "../../common/ui/ConfirmDialog";
import {APIService} from "../../../util/api/APIService";
import {Rezept} from "../../../shared-types/models/Rezept";
import {LocalStorageKey, QueryKey} from "../../../util/config/enums";
import {CustomSwitch} from "../../common/form-elements/generic";
import {useAuth} from "../../../util/auth/AuthProvider";
import {BenutzerRolle} from "../../../shared-types/enum";


/**
 * Controlbar für Rezept-Editor
 */
export function ControlBar(): React.ReactElement {
  const navigate = useNavigate()
  const queryClient = new QueryClient();
  const {isAuthorized} = useAuth()

  const {values, touched, submitForm, validateForm, resetForm} = useFormikContext<Rezept>();

  const [canSave, setCanSave] = useState(false)
  const [, setCanLoad] = useState(false)

  useEffect(() => {
    if (Object.keys(touched).length)
      setCanSave(true)
  }, [touched])


  const handleReset = async () => {
    const confirm = await customConfirm({label: 'Formulardaten löschen?'})
    if (!confirm) return

    localStorage.setItem(LocalStorageKey.REZEPT_EDIT, 'null')
    await resetForm()
    setCanLoad(false)
    setCanSave(false)
    navigate(`/`)
  }

  const handleSave = () => {
    localStorage.setItem(LocalStorageKey.REZEPT_EDIT, JSON.stringify(values || null))
    setCanLoad(true)
    setCanSave(false)
  }

  const handleCopyPaste = () => {
    console.log(JSON.stringify(values.kochschritte[0]?.zutaten, null, 1))
    console.log(values.kochschritte[0]?.zutaten)
  }


  const handlePublish = async () => {
    await submitForm()
    const result = await validateForm(values)
    if (Object.keys(result).length)
      return

    customConfirm({
      title: values.name + ' veröffentlichen?',
      label: `Das Rezept wird ${values.publicVisible ? 'öffentlich zu finden' : 'nur für dich zu sehen'} sein`

    }).then(() => {

      const mutateFn = () => (values._id)
        ? APIService.put<Rezept>('rezept', values._id, values)
        : APIService.post<Rezept>('rezept', values)

      mutateFn().then(async (res) => {
        await queryClient.invalidateQueries({queryKey: [QueryKey.REZEPT_SUCHE]})
        await queryClient.invalidateQueries({queryKey: [QueryKey.REZEPT_DETAIL, res._id]})
        navigate(`/rezepte/${res._id}`)
      })

    })
  }


  return (<AppBar position={"static"} style={{padding: 0, margin: 0}}>
    <Toolbar style={{padding: 0, margin: 0}} variant="dense">

      <Grid container spacing={2} alignItems="center">
        <Grid item xs>

          <Tooltip title="Copy Pasta" placement={"top-start"}>
            <IconButton
              onClick={handleCopyPaste}
              size="large">
              <SaveIcon/>
            </IconButton>
          </Tooltip>


          <Tooltip title="Lokal speichern" placement={"top-start"}>
            <IconButton
              onClick={handleSave}
              size="large">
              <SaveIcon color={canSave ? 'secondary' : 'disabled'}/>
            </IconButton>
          </Tooltip>

          {/*          <Tooltip title="Lokal speichern" placement={"top-start"}>
            <IconButton
              onClick={handleLoad}
              size="large">
              <LoadIcon color={canLoad ? 'secondary' : 'disabled'}/>
            </IconButton>
          </Tooltip>*/}


          <Tooltip title="veröffentlichen" placement={"top-start"}>
            <IconButton
              onClick={handlePublish}
              size="large">
              <PublishIcon color={'secondary'}/>
            </IconButton>
          </Tooltip>

          <CustomSwitch
            color={'secondary'}
            name={'publicVisible'}
            label={'öffentlich'}
            disabled={!isAuthorized(BenutzerRolle.REDAKTEUR)}
          />

        </Grid>
        <Grid item>

          <Tooltip title="Formulardaten löschen" placement={"top-end"}>
            <IconButton
              onClick={handleReset}
              size="large">
              <ResetIcon color={'secondary'}/>
            </IconButton>
          </Tooltip>

        </Grid>
      </Grid>

      {/*
      <pre>{JSON.stringify(values, null, 1)}</pre>
*/}

    </Toolbar>
  </AppBar>)
}
