import React from "react";
import {CustomArrayHelper} from "../../../common/form-elements/generic";
import {useField} from "formik";
import {AktionViewer} from "../../../common/viewer/AktionenViewer";
import {Box, IconButton} from "@mui/material";
import {Delete as DeleteIcon} from "@mui/icons-material";

type AktionEntryProps = {
  name: string,
  index: number,
  arrayHelper: CustomArrayHelper
}

/**
 * TS Doc Info
 * @component AktionenPicker
 */
export function AktionEntryShow({
                              name,
                              index,
                              arrayHelper,
                            }: AktionEntryProps): React.ReactElement {
  const [{value}] = useField(name);


  function handleDelete() {
    arrayHelper.handleDelete(index)
  }

  return (<Box mt={1}>
    <div className={'align-vertically'}>
      <IconButton
        onClick={handleDelete}><DeleteIcon/></IconButton><AktionViewer aktion={value}/></div>
  </Box>)
}

