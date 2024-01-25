import React, {useEffect, useRef} from "react";
import {Box, Paper} from "@mui/material";
import {CustomTextField} from "../generic";

type LebensmittelFormProps = {
  input?: string
  open?: boolean
}

/**
 * TS Doc Info
 * @component LebensmittelForm
 */
export function LebensmittelForm({input, open = false}: LebensmittelFormProps): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open)
      inputRef.current?.focus()
  }, [open])

  return (<Paper variant={'outlined'} color={'primary'}>
    <Box mt={2}>
      <CustomTextField
        inputRef={inputRef}
        name={'name'}
        label={'Lebensmittel-Name'}
        defaultValue={input}
      />
      {input}
    </Box>


  </Paper>)
}
