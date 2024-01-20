import React from "react";
import {useNavigate} from "react-router-dom";
import {QueryClient} from "@tanstack/react-query";

import {AppBar, Grid, IconButton, Toolbar} from "@mui/material";
import {useFormikContext} from "formik";
import {ExitToAppOutlined as ExitIcn, Publish as PublishIcon, Save as SaveIcon} from "@mui/icons-material";
import {customConfirm} from "../../common/ui/ConfirmDialog";
import {APIService} from "../../../util/api/APIService";
import {Rezept} from "../../../shared-types/models/Rezept";
import {QueryKey} from "../../../util/config/enums";
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

  const {values, touched} = useFormikContext<Rezept>();
/*
  const handleReset = () => { // reload aus DB? aus Storage?
  }
*/

  const handleExit = () => {
  }

  const handleSave = () => {
    localStorage.setItem('rezeptEdit', JSON.stringify(values || null))
  }

  const handlePublish = () => {
    customConfirm({
      label: 'veröffentlichen?'
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
          {/*

          <IconButton
            onClick={handleReset}
            size="large">
            <ResetIcon color={'secondary'}/>
          </IconButton>
*/}

          <IconButton
            onClick={handleSave}
            size="large">
            <SaveIcon color={touched ? 'secondary' : 'disabled'}/>
          </IconButton>

          <IconButton
            onClick={handlePublish}
            size="large">
            <PublishIcon color={'secondary'}/>
          </IconButton>

          <CustomSwitch
            color={'secondary'}
            name={'publicVisible'}
            label={'öffentlich'}
            disabled={!isAuthorized(BenutzerRolle.REDAKTEUR)}
            />


        </Grid>
        <Grid item>

          <IconButton
            onClick={handleExit}
            size="large">
            <ExitIcn color={'secondary'}/>
          </IconButton>

        </Grid>
      </Grid>

      <pre>{JSON.stringify(values,null,1)}</pre>

    </Toolbar>
  </AppBar>)
}
