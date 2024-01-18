import React from "react";
import {Grid} from "@mui/material";

import {ConditionalDisplay} from "../../layout/ConditionalDisplay";
import {useTapSearchResults} from "../../../util/hooks/useSearchCollection";

import {Rezept} from "../../../shared-types/models/Rezept";
import {RezeptSucheFormType} from "../../../shared-types/schemas/rezept-schema";

import {RezeptCard} from "./RezeptCard";
import {ZuletztGekocht} from "./ZuletztGekocht";

export function RezeptSucheAusgabe() {
  //const {state: {dataSync: {rezeptSuche}}} = useContext(StateContext) as StateContextType
  //const {isLoading, error, data} = useTapSearchResults<Rezept, RezeptSucheType>({queryKey: 'rezeptSuche', contextKey: 'rezeptSuche', params:rezeptSuche})

  const {isLoading, error, data} = useTapSearchResults<Rezept, RezeptSucheFormType>({contextKey: 'rezeptSuche'})

  return (<ConditionalDisplay status={{isLoading, error}}>
    {JSON.stringify(data)}

    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 16}}>
      {data?.map((rezept, index) =>
        <Grid item xs={2} sm={4} md={4} key={index}>
          <RezeptCard key={rezept._id} rezept={rezept}/>
        </Grid>
      )}
    </Grid>

    {!data?.length && <ZuletztGekocht /> }

  </ConditionalDisplay>)
}
