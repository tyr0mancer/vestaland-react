import React from "react";
import {AppBar, Grid, IconButton, Toolbar} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';

import {CustomArrayHelper} from "../../../common/form-elements/generic";

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
                                    arrayHelper: {handleInsert, handleMoveUp, handleMoveDown, handleDelete}
                                  }: KochschrittHeaderProps): React.ReactElement {

  return (<AppBar position={"static"} color={'secondary'}>
    <Toolbar variant={'dense'}>
      <Grid container spacing={0}>
        <Grid item xs>
          <IconButton
            disabled={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          ><ModeEditIcon/></IconButton>

          {activeIndex === index &&
              <IconButton
                  onClick={() => setActiveIndex(-1)}
              ><CloseIcon/></IconButton>}
        </Grid>

        <Grid item xs textAlign={'right'}>

          <IconButton
            disabled={0 === index}
            onClick={() => handleMoveUp(index)}
          ><ArrowCircleUpIcon/> </IconButton>

          <IconButton
            disabled={maxIndex === index}
            onClick={() => handleMoveDown(index)}
          ><ArrowCircleDownIcon/></IconButton>

          <IconButton
            onClick={() => handleInsert(index+1)}
          ><AddBoxIcon/></IconButton>

          <IconButton
            onClick={() => handleDelete(index, true)}
          ><RemoveCircleIcon/></IconButton>

        </Grid>
      </Grid>


    </Toolbar>
  </AppBar>)
}

