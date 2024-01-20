import React from "react";
import {CustomArrayHelper} from "../../../common/form-elements/generic/CustomFieldArray";
import {AppBar, Button, Toolbar} from "@mui/material";

type KochschrittHeaderProps = { arrayHelper: CustomArrayHelper }

/**
 * TS Doc Info
 * @component KochschrittHeader
 */
export function KochschritteArrayHeader({arrayHelper: {handleInsert}}: KochschrittHeaderProps) {
  return <AppBar position={"static"} color={'primary'}>
    <Toolbar variant={'dense'}>
      <Button color={'secondary'} onClick={() => handleInsert()}>Insert</Button>
    </Toolbar>
  </AppBar>
}

