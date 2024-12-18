import React from "react";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import {RezeptCard} from "./RezeptCard";
import {Rezept} from "../../../shared-types/models/Rezept";
import {Delete as RemoveCircleIcon} from "@mui/icons-material";
import {useLocalStorage} from "../../../util/hooks/useLocalStorage";
import {LocalStorageKey} from "../../../util/config/enums";


/**
 * TS Doc Info
 * @component ZuletztGekocht
 */
export function ZuletztGekocht(): React.ReactElement {
    const [rezeptHistory, updateHistory] = useLocalStorage<Rezept[]>(LocalStorageKey.REZEPT_HISTORY, [])

    function handleDeleteHistory(id: string) {
        if (!rezeptHistory)
            return updateHistory([])
        const newHistory = rezeptHistory.filter((e => e._id !== id))
        return updateHistory(newHistory)
    }


    if (!rezeptHistory || rezeptHistory.length === 0) return <></>

    return (
        <Box mt={2}>
            <Typography variant="h4" gutterBottom borderBottom={2} mt={5}>
                zuletzt gekocht
            </Typography>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 16}}>
                {rezeptHistory.filter(e => e._id).map((entry, index) =>
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <RezeptCard key={entry._id} rezept={entry}/>
                        <IconButton
                            onClick={() => handleDeleteHistory(entry._id || '')}
                        ><RemoveCircleIcon/></IconButton>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}
