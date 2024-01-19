import React from "react";
import {Box, Button, Container} from "@mui/material";
import {CustomTextField} from "../../common/form-elements/generic/CustomTextField";
import {CustomArrayHelper, CustomFieldArray} from "../../common/form-elements/generic/CustomFieldArray";
import {Kochschritt} from "../../../shared-types/models/Kochschritt";
import {ControlBar} from "./ControlBar";

export function RezeptEditForm(): React.ReactElement {

  return (<>
    <ControlBar/>

    <Box mt={2}>
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
    </Box>

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
    {/*<pre>{JSON.stringify(value)}</pre>*/}
    <CustomTextField name={`${name}[beschreibung]`}/>
    <Button onClick={() => handleMoveUp(index)}>Up</Button>
    <Button onClick={() => handleMoveDown(index)}>Down</Button>

  </div>
}
