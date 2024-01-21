import React from "react";
import {Box, Paper} from "@mui/material";
import {CustomTextField} from "../generic";

type LebensmittelFormProps = {
  input?: string
}

/**
 * TS Doc Info
 * @component LebensmittelForm
 */
export function LebensmittelForm({input}: LebensmittelFormProps): React.ReactElement {
  return (<Paper variant={'outlined'} color={'primary'}>
    <Box mt={2}>
      <CustomTextField name={'name'} label={'Lebensmittel-Name'} />
      {input}
    </Box>


  </Paper>)
}
