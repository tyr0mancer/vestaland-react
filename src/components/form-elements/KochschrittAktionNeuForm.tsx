import React, {useEffect, useRef} from "react";
import {Field} from "formik";
import {Box, MenuItem, Select, TextField} from "@mui/material";
import {AktionIconProperties} from "../../services/enum/aktionIcons";
import {AktionIcon} from "../../shared-types/types";

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
            defaultValue={AktionIcon.DUMMY}
          >
            {Object.entries(AktionIconProperties).map(([key, value]) =>
              <MenuItem key={key} value={key}>{value.icon}</MenuItem>)}
          </Field>

        </Box>
      </Box>
    </>)
}
