import React from "react";
import {AppBar, Button, Toolbar} from "@mui/material";
import {CustomArrayHelper} from "../../../common/form-elements/generic";

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

  return <AppBar position={"static"} color={'primary'}>
    <Toolbar variant={'dense'}>
      <Button color={'secondary'} onClick={() => handleInsert()}>Insert</Button>
    </Toolbar>
  </AppBar>
}

