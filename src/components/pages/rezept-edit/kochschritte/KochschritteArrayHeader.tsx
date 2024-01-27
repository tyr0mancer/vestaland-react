import React from "react";
import {Box, IconButton} from "@mui/material";
import {CustomArrayHelper} from "../../../common/form-elements/generic";
import {AddBox as InsertIcon} from "@mui/icons-material";

type KochschrittHeaderProps = {
  arrayHelper: CustomArrayHelper,
  setActiveIndex: (index: number) => void,
  length: number
}

/**
 * TS Doc Info
 * @component KochschrittHeader
 */
export function KochschritteArrayHeader({arrayHelper, setActiveIndex, length}: KochschrittHeaderProps) {
  const handleInsert = () => {
    arrayHelper.handleInsert(length)
    setActiveIndex(length)
  }

  return <Box mt={5} borderTop={1}>
    <IconButton size={'small'}
                onClick={() => handleInsert()}><InsertIcon/> Neuen Kochschritt hinzufügen</IconButton>
  </Box>
}

