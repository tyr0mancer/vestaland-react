import React, {useEffect} from "react";
import {Box, Paper} from "@mui/material";
import {CustomTextField} from "../generic";
import {useFormikContext} from "formik";
import {KochschrittAktion} from "../../../../shared-types/models/KochschrittAktion";
import {IconPicker} from "../specific/IconPicker";

type KochschrittAktionFormProps = {
  input?: string
}

/**
 * @see KochschrittAktion
 */
export function KochschrittAktionForm({input}: KochschrittAktionFormProps): React.ReactElement {
  const {setFieldValue} = useFormikContext<KochschrittAktion>()

  useEffect(() => {
    setFieldValue('aktionName', input).then()
  }, [input])


  return (<Paper variant={'outlined'} color={'primary'}>
    <Box mt={2}>
      <CustomTextField name={'aktionName'} label={'Aktion-Name'} defaultValue={input} />
      <IconPicker name={'aktionIcon'} />
    </Box>

  </Paper>)
}
