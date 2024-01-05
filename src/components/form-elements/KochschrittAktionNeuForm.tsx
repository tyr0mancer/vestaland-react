import React, {useEffect, useRef} from "react";
import {Field} from "formik";
import {Box, MenuItem, Select, TextField} from "@mui/material";
import {EinheitProperties} from "../../services/enum/einheiten";

interface KochschrittAktionNeuFormProps {
  open: boolean
}

/**
 * TS Doc Info
 * @component KochschrittAktionNeuForm
 */
export function KochschrittAktionNeuForm({open}: KochschrittAktionNeuFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open)
      inputRef.current?.focus()
  }, [open])

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box flexGrow={1} marginRight={1}>
          <Field as={TextField} type="text" variant="outlined"
                 inputRef={inputRef}
                 name="aktionName" label="Aktion Name"/>
        </Box>
        <Box flexGrow={1}>


          <Field
            as={Select}
            name="aktionIcon"
            labelId="Icon"
          >
            {Object.entries(EinheitProperties).map(([key, value]) =>
              <MenuItem key={key} value={key}>{value.fullName}</MenuItem>)}
          </Field>


          <Field as={TextField} type="text" variant="outlined"
                 name="aktionIcon" label="Aktion Icon"/>

        </Box>
      </Box>
    </>)
}
