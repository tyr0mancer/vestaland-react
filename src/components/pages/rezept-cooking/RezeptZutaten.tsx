import React from "react";
import {Zutat} from "../../../shared-types/models/Zutat";
import {Typography} from "@mui/material";
import {ShowZutaten} from "../../common/formatting/ShowZutaten";

export function RezeptZutaten({zutaten}: { zutaten: Zutat[] }) {
  return (<>
    <Typography variant="h6" gutterBottom>
      Zutaten
    </Typography>
    <ShowZutaten zutaten={zutaten}/>
  </>)
}
