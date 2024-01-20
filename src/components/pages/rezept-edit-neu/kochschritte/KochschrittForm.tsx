import React from "react";
import {Kochschritt} from "../../../../shared-types/models/Kochschritt";
import {CustomArrayHelper} from "../../../common/form-elements/generic/CustomFieldArray";
import {CustomTextField} from "../../../common/form-elements/generic/CustomTextField";
import {Button} from "@mui/material";


interface KochschrittFormProps {

  name: string,
  index: number,
  value: Kochschritt,
  arrayHelper: CustomArrayHelper
}

export function KochschrittForm({
                           name,
                           index,
                           value,
                           arrayHelper: {handleDelete, handleMoveUp, handleMoveDown}
                         }: KochschrittFormProps) {
  return <div>
    <b onClick={() => handleDelete(index)}>Kochschritt</b>
    <pre>{JSON.stringify(value,null,1)}</pre>
    <CustomTextField name={`${name}[beschreibung]`}/>
    <Button onClick={() => handleMoveUp(index)}>Up</Button>
    <Button onClick={() => handleMoveDown(index)}>Down</Button>

  </div>
}
