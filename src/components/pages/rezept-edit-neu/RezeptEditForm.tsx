import React from "react";
import {Button} from "@mui/material";
import {CustomTextField} from "../../common/form-elements/generic/CustomTextField";
import {CustomArrayHelper, CustomFieldArray} from "../../common/form-elements/generic/CustomFieldArray";
import {Kochschritt} from "../../../shared-types/models/Kochschritt";

export function RezeptEditForm(): React.ReactElement {
  return (<>
    <Button type={'submit'}>save</Button>
    <CustomTextField name={'name'}/>

    <CustomFieldArray<Kochschritt>
      newValue={new Kochschritt()}
      name={'kochschritte'}
      render={(arrayHelper, values) => (<>
        <KochschrittHeader arrayHelper={arrayHelper}/>
        {values.map((kochschritt, index) =>
          <KochschrittForm name={`kochschritte[${index}]`} key={index} index={index} value={kochschritt}
                           arrayHelper={arrayHelper}/>
        )}
      </>)}
    />

  </>)
}



function KochschrittHeader({arrayHelper: {handleInsert}}: { arrayHelper: CustomArrayHelper }) {
  return <div><h5>KochschrittHeader</h5><Button onClick={() => handleInsert()}>Insert</Button></div>
}


interface KochschrittFormProps {

  name: string,
  index: number,
  value: Kochschritt,
  arrayHelper: CustomArrayHelper
}

function KochschrittForm({
                           name,
                           index,
                           value,
                           arrayHelper: {handleDelete, handleMoveUp, handleMoveDown}
                         }: KochschrittFormProps) {
  return <div>
    <b onClick={() => handleDelete(index)}>Kochschritt</b>
    <pre>{JSON.stringify(value)}</pre>
    <CustomTextField name={`${name}[beschreibung]`}/>
    <Button onClick={()=>handleMoveUp(index)}>Up</Button>
    <Button onClick={()=>handleMoveDown(index)}>Down</Button>

  </div>
}
