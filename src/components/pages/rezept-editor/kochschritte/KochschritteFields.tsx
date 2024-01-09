import React, {useState} from "react";
import {FieldArray, FieldArrayRenderProps, useFormikContext} from "formik";
import {Rezept} from "../../../../shared-types/models/rezept.model";
import Box from "@mui/material/Box";
import {Button, IconButton} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {Kochschritt} from "../../../../shared-types/models/Kochschritt";
import {DefaultValues} from "../index";
import {KochschrittLayoutEdit} from "./KochschrittLayoutEdit";
import {KochschrittLayoutView} from "./KochschrittLayoutView";

/**
 * <FieldArray/> Komponente für 'kochschritte'
 * map() Iterator und Control-Buttons
 *
 * @component KochschritteFields
 *
 * @see KochschrittLayoutEdit
 * @see RezeptEditorForm
 */
export function KochschritteFields(): React.ReactElement {
  const formik = useFormikContext<Rezept>()
  const name = 'kochschritte'
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)

  const handleInsert = (arrayHelpers: FieldArrayRenderProps) => {
    arrayHelpers.insert(formik.values.kochschritte.length, DefaultValues.kochschritt)
    setSelectedIndex(formik.values.kochschritte.length)
  }
  const handleMoveUp = (arrayHelpers: FieldArrayRenderProps, index: number) => {
    arrayHelpers.move(index, index - 1)
    if (index === selectedIndex)
      setSelectedIndex(index - 1)
    else if (index === selectedIndex + 1)
      setSelectedIndex(index)
  }
  const handleMoveDown = (arrayHelpers: FieldArrayRenderProps, index: number) => {
    arrayHelpers.move(index, index + 1)
    if (index === selectedIndex)
      setSelectedIndex(index + 1)
    else if (index === selectedIndex - 1)
      setSelectedIndex(index)
  }
  const handleDelete = (arrayHelpers: FieldArrayRenderProps, index: number) => {
    arrayHelpers.remove(index)
    setSelectedIndex(-1)
  }

  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <>
          {formik.values.kochschritte.map((kochschritt: Kochschritt, index: number) => (

            <Box key={index} className={'kochschritt-form-box'}>

              {/* Control-Buttons */}
              <IconButton aria-label="delete" onClick={() => handleDelete(arrayHelpers, index)}>
                <RemoveCircleIcon/>
              </IconButton>
              <IconButton aria-label="delete" disabled={index === 0}
                          onClick={() => handleMoveUp(arrayHelpers, index)}>
                <ArrowCircleUpIcon/>
              </IconButton>
              <IconButton aria-label="delete" disabled={index === formik.values.kochschritte.length - 1}
                          onClick={() => handleMoveDown(arrayHelpers, index)}>
                <ArrowCircleDownIcon/>
              </IconButton>

              <IconButton aria-label="edit" disabled={index === selectedIndex}
                          onClick={() => setSelectedIndex(index)}>
                <ModeEditIcon/>
              </IconButton>


              {/* Form or View */}
              {selectedIndex === index &&
                  <KochschrittLayoutEdit index={index} name={`${name}[${index}]`} values={kochschritt}/>
              }
              {selectedIndex !== index &&
                  <KochschrittLayoutView kochschritt={kochschritt}/>
              }

            </Box>
          ))}
          <hr/>
          <Button variant={'contained'} color={'primary'} startIcon={<AddBoxIcon/>}
                  onClick={() => handleInsert(arrayHelpers)}>
            neuer Kochschritt
          </Button>
        </>
      )}
    />
  );
}


