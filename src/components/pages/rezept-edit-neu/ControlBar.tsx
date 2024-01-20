import React  from "react";
import AppBar from "@mui/material/AppBar";
import { Grid, IconButton, Switch, Toolbar} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {useFormikContext} from "formik";
import {
  ExitToAppOutlined,
  UndoRounded
} from "@mui/icons-material";
import {Rezept} from "../../../shared-types/models/Rezept";
import {APIService} from "../../../util/api/APIService";
import {CustomCheckbox} from "../../common/form-elements/generic/CustomCheckbox";
import PublishIcon from "@mui/icons-material/Publish";
import {customConfirm} from "../../common/ui/ConfirmDialog";

/**
 * TS Doc Info
 * @component ControlBar
 */
export function ControlBar(): React.ReactElement {
  const {values, touched, resetForm} = useFormikContext<Rezept>();
  const handleReset = () => {
    resetForm()
    //setValues(new Rezept())
  }

  const handleSave = () => {
    localStorage.setItem('rezeptEdit', JSON.stringify(values || null))
  }
  const handleExit = () => {
  }

  const handlePublish = () => {
    customConfirm({
      label: 'veröffentlichen?'
    }).then(() => {
      APIService.post<Rezept>('rezept', values).then(res => {
        console.log(res)
      })
    })
  }


  return (<AppBar position={"static"} style={{padding: 0, margin: 0}}>
    <Toolbar style={{padding: 0, margin: 0}} variant="dense">


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
          <Switch defaultChecked/>
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
