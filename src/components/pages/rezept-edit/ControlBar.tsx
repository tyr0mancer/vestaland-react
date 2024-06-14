import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {QueryClient} from "@tanstack/react-query";

import {AppBar, Grid, IconButton, Tab, Tabs, Toolbar, Tooltip} from "@mui/material";
import {useFormikContext} from "formik";

import {
  CloudUpload as PublishIcon,
  DeleteForever as ResetIcon,
  Save as SaveIcon,
  ResetTv as LoadIcon,
  LogoDev as DevIcon
} from "@mui/icons-material";


import {customConfirm} from "../../common/ui/ConfirmDialog";
import {APIService} from "../../../util/api/APIService";
import {Rezept} from "../../../shared-types/models/Rezept";
import {LocalStorageKey, QueryKey} from "../../../util/config/enums";
import {CustomSwitch} from "../../common/form-elements/generic";
import {useAuth} from "../../../util/auth/AuthProvider";
import {BenutzerRolle} from "../../../shared-types/enum";
import {StateContext} from "../../../util/state/StateProvider";
import {StateContextType} from "../../../util/state/types";
import {useLocalStorage} from "../../../util/hooks/useLocalStorage";

type ControlBarProps = {
  setTabIndex: (v: number) => void,
  tabIndex: number
}


/**
 * Controlbar für Rezept-Editor
 */
export function ControlBar({tabIndex,setTabIndex}: ControlBarProps): React.ReactElement {
  const {update} = useContext(StateContext) as StateContextType

  const navigate = useNavigate()
  const queryClient = new QueryClient();
  const {isAuthorized} = useAuth()

  const {values, touched, submitForm, validateForm, setValues} = useFormikContext<Rezept>();

  const [, setLocalData, readLocalData] = useLocalStorage<Rezept>(LocalStorageKey.REZEPT_EDIT)
  const [canSave, setCanSave] = useState(false)
  const [canLoad, setCanLoad] = useState(false)

  useEffect(() => {
    if (Object.keys(touched).length)
      setCanSave(true)
  }, [touched])


  const handleReset = async () => {
    const confirm = await customConfirm({
      title: 'Formular zurücksetzen?',
      label: 'Achtung! Es werden sowohl das aktuelle Formular als auch alle lokal gespeicherten Daten gelöscht.'
    })
    if (!confirm) return

    if (confirm) {
      setLocalData()
      update({key: "rezeptEdit", data: undefined})
      setCanLoad(false)
      setCanSave(false)
      navigate(`/rezept-editor`)
      navigate(0)
    }
  }

  const handleSave = () => {
    setLocalData(values)
    setCanLoad(true)
    setCanSave(false)
    navigate(`/rezept-editor`)
  }

  const handleLoad = () => {
    const newValue = readLocalData()
    if (!newValue) {
      setCanLoad(false)
      return
    }

    customConfirm({
      title: 'Formulardaten laden?',
      label: 'Achtung! Das aktuelle Formular wird dabei überschrieben'
    }).then(() => setValues(newValue).then(() => navigate(`/rezept-editor`)))

  }

  const handleCopyPaste = () => {
    const output = values //.kochschritte.map(k => k.aktionen)
    console.log(JSON.stringify(output, null, 1))
    console.log(output)
  }


  const handlePublish = async () => {
    await submitForm()
    const result = await validateForm(values)
    if (Object.keys(result).length) {
      console.error(result)
      //const resultString = JSON.stringify(result)
      //window.dispatchEvent(new CustomEvent('api-error', {detail: "resultString"}));
      return
    }

    customConfirm({
      title: (values._id) ? values.name + ' aktualisieren?' : values.name + ' als neues Rezept veröffentlichen?',
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
          <Tabs value={tabIndex} onChange={(e,v)=>setTabIndex(v)}
                textColor={'secondary'} indicatorColor={'secondary'}>
            <Tab label="Allgemeines" sx={{color: 'white'}} />
            <Tab label="Kochschritte" sx={{color: 'white'}} />
          </Tabs>

        </Grid>
        <Grid item>

          <Tooltip title="Copy Pasta" placement={"top-start"}>
            <IconButton
              onClick={handleCopyPaste}
              size="large">
              <DevIcon/>
            </IconButton>
          </Tooltip>


          <Tooltip title="Lokal speichern" placement={"top-start"}>
            <IconButton
              onClick={handleSave}
              size="large">
              <SaveIcon color={canSave ? 'secondary' : 'disabled'}/>
            </IconButton>
          </Tooltip>

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

          <Tooltip title="Gespeicherte Formulardaten laden" placement={"top-end"}>
            <IconButton
              onClick={handleLoad}

              size="large">
              <LoadIcon color={canLoad ? 'secondary' : 'disabled'}/>
            </IconButton>
          </Tooltip>

          <Tooltip title="Formulardaten löschen" placement={"top-end"}>
            <IconButton
              onClick={handleReset}
              size="large">
              <ResetIcon color={'secondary'}/>
            </IconButton>
          </Tooltip>

        </Grid>
      </Grid>

    </Toolbar>
  </AppBar>)
}
