import React from "react";
import {KochschrittAktion} from "../../../../shared-types/models/KochschrittAktion";
import {Box, Card} from "@mui/material";
import {FieldArray} from "formik";
import {KochschrittAktionPicker} from "./KochschrittAktionPicker";
import IconButton from "@mui/material/IconButton";
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
      <Card color={'primary'}>
        <IconButton
          size={'small'}
          onClick={() => arrayHelpers.insert(values.length, new KochschrittAktion())}>
          neue Aktion
        </IconButton>


        {values.map((element: KochschrittAktion, index: number) => (
            <Box display="flex" justifyContent="space-between" key={index}>
              <Box flexGrow={12}>
                <KochschrittAktionPicker
                  name={`${name}[${index}]`}
                  values={element}
                  onChange={(value) => {
                    if (!value) arrayHelpers.remove(index)
                  }}
                />
              </Box>
              <Box flexGrow={0}>
                <IconButton onClick={() => arrayHelpers.move(index, index - 1)}><ArrowCircleUpIcon
                  style={{height: 10}}/></IconButton><br/>
                <IconButton onClick={() => arrayHelpers.move(index, index + 1)}><ArrowCircleDownIcon
                  style={{height: 10}}/></IconButton>
              </Box>

            </Box>
          ))}
      </Card>
    )}

  />)

}
