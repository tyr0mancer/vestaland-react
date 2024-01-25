import React from "react";
import {AppBar, Grid, IconButton, Toolbar} from "@mui/material";
import {
  RemoveCircle as DeleteIcon,
  ArrowCircleUp as MoveUpIcon,
  ArrowCircleDown as MoveDownIcon,
  AddBox as InsertIcon,
  ModeEdit as EditIcon,
  Check as CloseIcon
} from "@mui/icons-material";

import {CustomArrayHelper} from "../../../common/form-elements/generic";


type KochschrittHeaderProps = {
  index: number,
  length: number,
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
                                    length,
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
          ><EditIcon/></IconButton>

          {activeIndex === index &&
              <IconButton
                  onClick={() => setActiveIndex(-1)}
              ><CloseIcon/></IconButton>}
        </Grid>

        <Grid item xs textAlign={'right'}>

          <IconButton
            disabled={0 === index}
            onClick={() => handleMoveUp(index)}
          ><MoveUpIcon/> </IconButton>

          <IconButton
            disabled={(length - 1) === index}
            onClick={() => handleMoveDown(index)}
          ><MoveDownIcon/></IconButton>

          <IconButton
            onClick={() => handleInsert(index + 1)}
          ><InsertIcon/></IconButton>

          <IconButton
            onClick={() => handleDelete(index, true)}
          ><DeleteIcon/></IconButton>

        </Grid>
      </Grid>


    </Toolbar>
  </AppBar>)
}

