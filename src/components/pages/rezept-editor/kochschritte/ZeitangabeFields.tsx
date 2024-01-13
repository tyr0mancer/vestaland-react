import React from "react";
import Box from "@mui/material/Box";
import {Field,} from "formik";
import { TextField} from "@mui/material";
import {CustomCheckbox} from "../../../common/form-elements/generic/CustomCheckbox";

interface ZeitangabeFieldsProps {
  name: string
}

/**
 * TS Doc Info
 * @component ZeitangabeFields
 */
export function ZeitangabeFields({name}: ZeitangabeFieldsProps): React.ReactElement {
  return (<Box display="flex" justifyContent="space-between" mt={1}>
    <Box flexGrow={1}>
      <Field as={TextField} type="number" variant="outlined" fullWidth
             size={'small'}
             name={`${name}[gesamtdauer]`} label="Gesamtdauer (Min)"/>
    </Box>
    <Box flexGrow={1}>
      <Field as={TextField} type="number" variant="outlined" fullWidth
             size={'small'}
             name={`${name}[arbeitszeit]`} label="Arbeitszeit (Min)"/>
    </Box>
    <Box flexGrow={1}>
      <Field as={TextField} type="number" variant="outlined" fullWidth
             size={'small'}
             name={`${name}[wartezeit]`} label="Wartezeit (Min)"/>
    </Box>
    <Box flexGrow={1}>
      <CustomCheckbox name={`${name}[wartenErforderlich]`} label={'Warten erforderlich'}/>
    </Box>

  </Box>)
}


