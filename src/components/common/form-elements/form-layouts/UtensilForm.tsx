import React, {useEffect, useRef} from "react";
import {Box, Paper} from "@mui/material";
import {CustomTextField} from "../generic";

type UtensilFormProps = {
  input?: string
  open?: boolean
}

/**
 * @see UtensilPicker
 */
export function UtensilForm({input, open = false}: UtensilFormProps): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open)
      inputRef.current?.focus()
  }, [open])

  return (<Paper variant={'outlined'} color={'primary'}>
    <Box mt={2}>
      <CustomTextField
        inputRef={inputRef}
        name={'utensilName'}
        label={'Lebensmittel-Name'}
        defaultValue={input}
      />
      {input}
    </Box>


  </Paper>)
}
