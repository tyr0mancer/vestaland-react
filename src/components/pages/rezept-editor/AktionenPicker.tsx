import React from "react";
import {KochschrittAktion} from "../../../shared-types/models/KochschrittAktion";
import {Box, Button} from "@mui/material";
import {FieldArray} from "formik";
import {KochschrittAktionPicker} from "../../common/form-elements/KochschrittAktionPicker";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

interface AktionenFormProps {
  name: string,
  values: KochschrittAktion[]
}

/**
 * TS Doc Info
 * @component AktionenForm
 */
export function AktionenPicker({name, values}: AktionenFormProps): React.ReactElement {

  return (<FieldArray
    name={name}
    render={arrayHelpers => (
      <>
        {values.map((element: KochschrittAktion, index: number) => (
          <Box display="flex" justifyContent="space-between" key={index}>

            <Box flexGrow={1}>
              <IconButton size="small" color="warning"
                          onClick={() => arrayHelpers.remove(index)}
                          aria-label="Aktion entfernen"
              ><DeleteForeverIcon/></IconButton>
            </Box>
            <Box flexGrow={10}>
              <KochschrittAktionPicker name={`${name}[${index}]`} values={element}/>
            </Box>
            <Box flexGrow={1}>
              <IconButton onClick={() => arrayHelpers.move(index, index - 1)}><ArrowCircleUpIcon style={{height: 10}}/></IconButton><br/>
              <IconButton onClick={() => arrayHelpers.move(index, index + 1)}><ArrowCircleDownIcon
                style={{height: 10}}/></IconButton>
            </Box>
          </Box>
        ))}

        <Button variant="contained" onClick={() => arrayHelpers.insert(values.length, new KochschrittAktion())}>
          neue Aktion
        </Button>
      </>
    )}

  />)

}
