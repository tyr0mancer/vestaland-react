import React from "react";
import {Box, Grid, Typography} from "@mui/material";

import {Rezept} from "../../../shared-types/models/Rezept";
import {RezeptCard} from "./RezeptCard";
import {ZuletztGekocht} from "./ZuletztGekocht";

export function RezeptSucheAusgabe({result}: { result?: Rezept[] }) {

    return (<Box mt={2} borderTop={1} paddingTop={1}>

        {(result && result.length > 0) &&
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 16}}>
                {result?.map((rezept, index) =>
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <RezeptCard key={rezept._id} rezept={rezept}/>
                    </Grid>
                )}
            </Grid>
        }

        {(result && result.length == 0) && <Typography gutterBottom variant="h3" component="div">
            Keine Ergebnisse
        </Typography>
        }

        <ZuletztGekocht/>
    </Box>)
}
