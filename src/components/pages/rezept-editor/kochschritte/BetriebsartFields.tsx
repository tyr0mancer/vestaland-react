import React from "react";
import Box from "@mui/material/Box";
import {Field} from "formik";
import {MenuItem, Select, TextField} from "@mui/material";
import {BetriebsartenProperties} from "../../../../util/rezept-helper/enum-properties/BetriebsartenProperties";

interface BetriebsartFieldsProps {
  name: string
}

/**
 * TS Doc Info
 * @component BetriebsartFields
 */
export function BetriebsartFields({name}: BetriebsartFieldsProps): React.ReactElement {
  return (<Box display="flex" justifyContent="space-between" mt={1}>
    <Box flexGrow={1} mr={1}>
      <Field as={TextField} type="number" variant="outlined"
             name={`${name}[temperatur]`} label="Temperatur (°C)"/>
    </Box>
    <Box flexGrow={1} mr={1}>
      <Field
        as={Select}
        name={`${name}[betriebsart]`}
        labelId="Betriebsart"
      >
        {Object.entries(BetriebsartenProperties).map(([key, value]) =>
          <MenuItem key={key} value={key}>{value.fullName}</MenuItem>)}
      </Field>
    </Box>
  </Box>)
}
