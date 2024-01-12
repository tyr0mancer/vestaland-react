import React, {useContext} from "react";
import {Box, BottomNavigation, Grid, Button} from "@mui/material";
import {StateContext} from "../../../util/state/StateProvider";
import {StateContextType} from "../../../util/state/types";
import {ActionTypes} from "../../../util/state/reducers";
import {useNavigate} from "react-router-dom";

export function FooterMainDesktop() {
  const {state: {rezeptCooking, kochstatus}, dispatch} = useContext(StateContext) as StateContextType
  const navigate = useNavigate()

  const setFokus = (index: number) => {
    dispatch({
      type: ActionTypes.SET_KOCHSTATUS, payload: {
        ...kochstatus,
        kochschrittFokusIndex: 'panel' + index,
      }
    })
    navigate('/rezept-cooking')
  }


  if (!rezeptCooking)
    return (<></>)
  return (
    <Box sx={{position: 'fixed', bottom: 0, left: 0, right: 0, display: {xs: 'none', md: 'block'}}}>
      <BottomNavigation className={'main-footer'}>
        <Grid container spacing={0}>
          {kochstatus.meta && kochstatus.meta.map((ks, index) =>
            <Grid onClick={() => setFokus(index)} key={index} item
                  sx={{flexGrow: ks.length, flexShrink: 1, flexBasis: 0}}>
              <Button
                color={(kochstatus.aktuellerKochschrittIndex === index) ? 'primary' : 'secondary'}
                variant={'contained'}
              >
                {ks.aktionen.map((aktion, index) =>
                  <React.Fragment key={index}>{aktion.aktionName}<br/></React.Fragment>
                )}
              </Button>
            </Grid>)}
        </Grid>

      </BottomNavigation>
    </Box>


  )

}
