import React, {useState} from "react";
import {FieldArray, FieldArrayRenderProps, useFormikContext} from "formik";
import {Button, IconButton, Box, Grid} from "@mui/material";

/* MUI Icons */
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';

/* Model */
import {Rezept} from "../../../../shared-types/models/Rezept";
import {Kochschritt} from "../../../../shared-types/models/Kochschritt";

/* Helper and Components */
import {DefaultValues} from "../index";
import {KochschrittLayoutEdit} from "./KochschrittLayoutEdit";
import {KochschrittLayoutView} from "./KochschrittLayoutView";
import {customConfirm} from "../../../common/ui/ConfirmDialog";


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
  const handleDelete = async (arrayHelpers: FieldArrayRenderProps, index: number) => {
    const confirm = await customConfirm({
      title: 'Kochschritt löschen?',
      label: 'Der Vorgang kann nicht rückgängig gemacht werden',
      confirmLabel: 'Kochschritt löschen',
    })
    if (!confirm) return
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

              <Grid container spacing={1}>
                <Grid item xs>

                  {/* Control-Buttons Move */}
                  <IconButton aria-label="move-up" disabled={index === 0}
                              onClick={() => handleMoveUp(arrayHelpers, index)}>
                    <ArrowCircleUpIcon/>
                  </IconButton>
                  <IconButton aria-label="move-down" disabled={index === formik.values.kochschritte.length - 1}
                              onClick={() => handleMoveDown(arrayHelpers, index)}>
                    <ArrowCircleDownIcon/>
                  </IconButton>

                  {/* Control-Buttons to change Edit / View */}
                  <IconButton aria-label="edit"
                              onClick={() => setSelectedIndex((index === selectedIndex) ? -1 : index)}>
                    {(index === selectedIndex) ? <VisibilityIcon/> : <ModeEditIcon/>}
                  </IconButton>
                </Grid>

                {/* Control-Button Delete */}
                <Grid item>
                  <IconButton aria-label="delete" onClick={() => handleDelete(arrayHelpers, index)}>
                    <RemoveCircleIcon/>
                  </IconButton>
                </Grid>

              </Grid>


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


