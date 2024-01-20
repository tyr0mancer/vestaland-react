import React from "react";
import {AppBar, IconButton, Toolbar} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';

import {CustomArrayHelper} from "../../../common/form-elements/generic/CustomFieldArray";
import {customConfirm} from "../../../common/ui/ConfirmDialog";

type KochschrittHeaderProps = {
  index: number,
  maxIndex: number,
  activeIndex: number,
  setActiveIndex: (index: number) => void,
  arrayHelper: CustomArrayHelper

}

/**
 * TS Doc Info
 * @component KochschrittHeader
 */
export function KochschrittHeader({
                                    index,
                                    maxIndex,
                                    activeIndex,
                                    setActiveIndex,
                                    arrayHelper
                                  }: KochschrittHeaderProps): React.ReactElement {


  const handleInsert = () => {
    arrayHelper.handleInsert(index)
    setActiveIndex(index)
  }
  const handleMoveUp = () => {
    arrayHelper.handleMoveUp(index)
    if (index === activeIndex)
      setActiveIndex(index - 1)
    else if (index === activeIndex + 1)
      setActiveIndex(index)
  }
  const handleMoveDown = () => {
    arrayHelper.handleMoveDown(index)
    if (index === activeIndex)
      setActiveIndex(index + 1)
    else if (index === activeIndex - 1)
      setActiveIndex(index)
  }
  const handleDelete = async () => {
    const confirm = await customConfirm({
      title: 'Kochschritt löschen?',
      label: 'Der Vorgang kann nicht rückgängig gemacht werden',
      confirmLabel: 'Kochschritt löschen',
    })
    if (!confirm) return
    arrayHelper.handleDelete(index)
    setActiveIndex(-1)
  }


  return (<AppBar position={"static"} color={'secondary'}>
    <Toolbar variant={'dense'}>
      <IconButton disabled={activeIndex === index}>
        <ModeEditIcon onClick={() => setActiveIndex(index)}/>
      </IconButton>

      {activeIndex === index &&
      <IconButton>
        <CloseIcon onClick={() => setActiveIndex(-1)}/>
      </IconButton>}


      <div style={{ flexGrow: 1 }}></div> {/* Spacer */}
      <IconButton disabled={0 === index}>
        <ArrowCircleUpIcon onClick={handleMoveUp}/>
      </IconButton>
      <IconButton disabled={maxIndex === index}>
        <ArrowCircleDownIcon onClick={handleMoveDown}/>
      </IconButton>

      <IconButton>
        <AddBoxIcon onClick={handleInsert}/>
      </IconButton>


      <IconButton>
        <RemoveCircleIcon onClick={handleDelete}/>
      </IconButton>

    </Toolbar>
  </AppBar>)
}

