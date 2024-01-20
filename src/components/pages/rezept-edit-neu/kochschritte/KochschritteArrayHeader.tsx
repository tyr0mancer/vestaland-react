import React from "react";
import {CustomArrayHelper} from "../../../common/form-elements/generic/CustomFieldArray";
import {Button} from "@mui/material";

type KochschrittHeaderProps = {arrayHelper: CustomArrayHelper}

/**
 * TS Doc Info
 * @component KochschrittHeader
 */
export function KochschritteArrayHeader({arrayHelper: {handleInsert}}: KochschrittHeaderProps) {
  return <div><h5>KochschrittHeader</h5><Button onClick={() => handleInsert()}>Insert</Button></div>
}
