import React from "react";
import {CustomArrayHelper} from "../generic";
import {useField} from "formik";
import {AktionViewer} from "../../formatting/elements/AktionenViewer";
import {Box, IconButton} from "@mui/material";

type AktionEntryProps = {
  name: string,
  index: number,
  arrayHelper: CustomArrayHelper
}

/**
 * TS Doc Info
 * @component AktionenPicker
 */
export function AktionEntry({
                              name,
                              index,
                              arrayHelper,
                            }: AktionEntryProps): React.ReactElement {
  const [{value}] = useField(name);


  function handleDelete() {
    arrayHelper.handleDelete(index)
  }

  return (<Box mt={1}><IconButton
  onClick={handleDelete}>x</IconButton><AktionViewer aktion={value}/></Box>)
}
