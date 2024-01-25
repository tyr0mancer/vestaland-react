import React from "react";
import {Box, Paper} from "@mui/material";
import {CustomTextField} from "../generic";

type KochschrittAktionFormProps = {
  input?: string
}

/**
 * TS Doc Info
 * @component LebensmittelForm
 */
export function KochschrittAktionForm({input}: KochschrittAktionFormProps): React.ReactElement {
  return (<Paper variant={'outlined'} color={'primary'}>
    <Box mt={2}>
      <CustomTextField name={'aktionName'} label={'Aktion-Name'} defaultValue={input} />
    </Box>


  </Paper>)
}
