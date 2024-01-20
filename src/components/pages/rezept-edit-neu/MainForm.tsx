import React from "react";
import {Box} from "@mui/material";
import {CustomTextField} from "../../common/form-elements/generic/CustomTextField";
import {ControlBar} from "./ControlBar";
import {KochschritteArray} from "./kochschritte/KochschritteArray";
import {CustomFileDropper} from "../../common/form-elements/generic/CustomFileDropper";
import {APIService} from "../../../util/api/APIService";
import {Datei} from "../../../shared-types/models/Datei";

export function MainForm(): React.ReactElement {

  return (<>
    <ControlBar/>

    <Box mt={2}>
      <CustomTextField name={'name'}/>
      <CustomFileDropper
        name={'bild'}
        label={'Rezept-Bild'}
        uploadFn={(file: File) => APIService.upload<Datei>('datei', file, 'bild')}
      />

      <KochschritteArray/>
    </Box>

  </>)
}


