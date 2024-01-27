import React from "react";
import {CustomArrayHelper} from "../../../common/form-elements/generic";
import {Box, IconButton} from "@mui/material";
import {Delete as DeleteIcon} from "@mui/icons-material";
import {Utensil} from "../../../../shared-types/models/Utensil";

type UtensilEntryShowProps = {
  index: number,
  utensil: Utensil,
  arrayHelper: CustomArrayHelper
}

/**
 * TS Doc Info
 * @component AktionenPicker
 */
export function UtensilEntryShow({
                               index,
                               utensil,
                               arrayHelper,
                             }: UtensilEntryShowProps): React.ReactElement {

  function handleDelete() {
    arrayHelper.handleDelete(index)
  }

  return (<Box mt={1}>
    <div className={'align-vertically'}>
      <IconButton
        onClick={handleDelete}><DeleteIcon/></IconButton>

      <div>
        {utensil.utensilName}
      </div>

    </div>
  </Box>)
}

