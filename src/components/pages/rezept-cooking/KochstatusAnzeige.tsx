import React, {useContext} from "react";
import {StateContext} from "../../../util/state/StateProvider";
import {StateContextType} from "../../../util/state/types";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import BlenderIcon from "@mui/icons-material/Blender";
import {BottomNavigation, Box, Grid} from "@mui/material";
import {ActionTypes} from "../../../util/state/reducers";

/**
 * KochstatusAnzeige Mobile
 */
export function KochstatusAnzeigeMobile(): React.ReactElement {
    const {state: {rezeptCooking}} = useContext(StateContext) as StateContextType
    return !rezeptCooking ? <></> :
        <Button color="secondary" variant="contained" component={Link}
                to={'/rezept-cooking'}><BlenderIcon/> {rezeptCooking.name}</Button>
}


/**
 * KochstatusAnzeige Detail (Desktop)
 */
export function KochstatusAnzeige(): React.ReactElement {
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


    return !rezeptCooking ? <></> :
        <Box sx={{position: 'fixed', bottom: 0, left: 0, right: 0, display: {xs: 'none', md: 'block'}}}>
            <BottomNavigation className={'main-footer'}>
                <Grid container spacing={0}>
                    {kochstatus.meta && kochstatus.meta.map((ks, index) =>
                        <Grid key={index} item
                              sx={{flexGrow: ks.length, flexShrink: 1, flexBasis: 0}}>
                            <Button
                                onClick={() => setFokus(index)}
                                color={(kochstatus.aktuellerKochschrittIndex === index) ? 'primary' : 'secondary'}
                                variant={'contained'}
                            >
                                <b># {index + 1}</b>
                                {ks.aktionen.map((aktion, index) =>
                                    <React.Fragment key={index}>{aktion.aktionName}<br/></React.Fragment>
                                )}
                            </Button>
                        </Grid>)}
                </Grid>
            </BottomNavigation>
        </Box>


}

