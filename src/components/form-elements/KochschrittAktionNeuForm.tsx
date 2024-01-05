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
            {Object.entries(AktionIconProperties).map(([key, value]) => {
                let icon = require('../../assets/images/icons/dummy.png')
                try {
                  icon = require('../../assets/images/icons/' + value.icon)
                } catch (e) {
                }
                return (<MenuItem
                key={key} value={key}><img src={icon} height={32} width={32} alt={value.fullName} /></MenuItem>)
            }
              )}
          </Field>

        </Box>
      </Box>
    </>)
}
