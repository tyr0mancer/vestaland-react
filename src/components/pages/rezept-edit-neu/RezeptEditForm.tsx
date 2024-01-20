import React from "react";
import {Box} from "@mui/material";
import {CustomTextField} from "../../common/form-elements/generic/CustomTextField";
import {ControlBar} from "./ControlBar";
import {KochschritteArray} from "./kochschritte/KochschritteArray";

export function RezeptEditForm(): React.ReactElement {

  return (<>
    <ControlBar/>

    <Box mt={2}>
      <CustomTextField name={'name'}/>


      <KochschritteArray />
    </Box>

  </>)
}


