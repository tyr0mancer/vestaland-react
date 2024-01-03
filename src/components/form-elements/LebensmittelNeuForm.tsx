import React, {useEffect, useRef} from "react";
import {Field} from "formik";
import {Box, FormGroup, MenuItem, Select, TextField} from "@mui/material";
import {EinheitProperties} from "../../services/einheitenService";

interface LebensmittelNeuFormProps {
  open: boolean
}

/**
 * TS Doc Info
 * @component LebensmittelNeuForm
 */
export function LebensmittelNeuForm({open}: LebensmittelNeuFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open)
      inputRef.current?.focus()
  }, [open])

  return (
    <>
      <FormGroup>
        <Field as={TextField} type="text" variant="outlined"
               inputRef={inputRef}
               name="name" label="Lebensmittel Name"/>
      </FormGroup>


      <Box display="flex" justifyContent="space-between">
        <Box flexGrow={1} marginRight={1}>
          <Field
            as={Select}
            name="defaultEinheit"
            labelId="übliche Einheit"
            fullWidth
          >
            {Object.entries(EinheitProperties).map(([key, value]) =>
              <MenuItem key={key} value={key}>{value.fullName}</MenuItem>)}
          </Field>
        </Box>
        <Box flexGrow={1}>
          <Field as={TextField} type="number" variant="outlined" fullWidth
                 name="defaultMenge" label="übliche Menge"/>

        </Box>
      </Box>


      <Box display="flex" justifyContent="space-between">
        <Box flexGrow={1} marginRight={1}>
          <Field as={TextField} type="text" variant="outlined"
                 name="nameDetail" label="Detail Name"/>
        </Box>
        <Box flexGrow={1}>
          <Field as={TextField} type="text" variant="outlined"
                 name="nameSingular" label="Name in Singularform"/>
        </Box>
      </Box>


      <Field as={TextField} type="text" variant="outlined"
             fullWidth
             multiline={true}
             name="beschreibung" label="Infotext"/>


      <Box display="flex" justifyContent="space-between">
        <Box flexGrow={1} marginRight={1}>
          <Field as={TextField} type="text" variant="outlined" fullWidth
                 name="density" label="Dichte"/>

        </Box>
        <Box flexGrow={1}>
          <Field as={TextField} type="text" variant="outlined" fullWidth
                 name="unitWeight" label="Stückgewicht (g)"/>

        </Box>
      </Box>


    </>)
}


/*
public kategorie?: string

// Gramm pro Kubikzentimeter bzw kg pro Liter
// Beispiel: Mehl hat eine Dichte von 0.7 - das heißt das ein kg Mehl etwa 1,5 L Volumen haben, oder 1 L Mehl,
etwa 0,7 kg wiegt.
public density?: number
public unitWeight?: number*/
