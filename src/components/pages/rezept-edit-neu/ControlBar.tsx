import React, {useEffect, useState} from "react";
import AppBar from "@mui/material/AppBar";
import {Box, Button, FormGroup, Grid, IconButton, MenuItem, Switch, Toolbar} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {useFormikContext} from "formik";
import {
  CloudCircle,
  ExitToAppOutlined,
  NewReleasesOutlined,
  RefreshOutlined,
  UndoOutlined,
  UndoRounded
} from "@mui/icons-material";
import {Rezept} from "../../../shared-types/models/Rezept";
import {APIService} from "../../../util/api/APIService";
import {CustomCheckbox} from "../../common/form-elements/generic/CustomCheckbox";
import {CustomTextField} from "../../common/form-elements/generic/CustomTextField";
import PublishIcon from "@mui/icons-material/Publish";

/**
 * TS Doc Info
 * @component ControlBar
 */
export function ControlBar(): React.ReactElement {
  const {values, setValues, submitForm, touched, resetForm} = useFormikContext<Rezept>();
  const handleReset = () => {
    resetForm()
    //setValues(new Rezept())
  }

  const handleSave = () => {
    localStorage.setItem('rezeptEdit', JSON.stringify(values || null))
  }
  const handleExit = () => {
  }
  const handlePublish = () => submitForm()

  return (<AppBar position={"static"} style={{padding: 0, margin: 0}}>
    <Toolbar style={{padding: 0, margin: 0}} variant="dense" >


      <Grid container spacing={2} alignItems="center">
        <Grid item xs>

          <IconButton
            onClick={handleReset}
            size="large">
            <UndoRounded color={'secondary'}/>
          </IconButton>

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
          <Switch defaultChecked />
          <CustomCheckbox name={'publicVisible'} label={'öffentlich'}/>
        </Grid>
        <Grid item>

          <IconButton
            onClick={handleExit}
            size="large">
            <ExitToAppOutlined color={'secondary'}/>
          </IconButton>

        </Grid>
      </Grid>




    </Toolbar>

  </AppBar>)
}
