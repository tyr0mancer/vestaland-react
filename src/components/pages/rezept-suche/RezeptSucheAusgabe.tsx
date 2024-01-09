import React, {useContext} from "react";
import {useQuery} from "@tanstack/react-query";

import {Rezept} from "../../../shared-types/models/rezept.model";
import {StateContext} from "../../../util/state/StateProvider";
import {StateContextType} from "../../../util/state/types";
import LoadingIcon from '@mui/icons-material/HourglassBottom';
import {RezeptCard} from "./RezeptCard";
import {Grid} from "@mui/material";
import {ErrorScreen} from "../../common/ui/ErrorScreen";
import {Link} from "react-router-dom";

export function RezeptSucheAusgabe() {
  const {state: {rezeptHistory, rezeptSucheQuery}} = useContext(StateContext) as StateContextType

  const {
    isLoading,
    isError,
    error,
    data
  } = useQuery<Rezept[]>(
    {
      queryKey: ["rezepte-suche", rezeptSucheQuery.rezeptName],
      enabled: false,
    });

  if (isError)
    return <ErrorScreen error={error}/>
  if (isLoading)
    return <LoadingIcon/>
  return (<Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 16}}>
    {data?.map((rezept, index) =>
      <Grid item xs={2} sm={4} md={4} key={index}>
        <RezeptCard key={rezept._id} rezept={rezept}/>
      </Grid>
    )}

    {(!data || !data.length) &&
        <div>
            <h5>zuletzt angesehen:</h5>
            <hr/>
            <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 8, sm: 12, md: 24}}>
              {rezeptHistory.map((entry, index) =>
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Link to={`/rezepte/${entry._id}`}><b>{entry.name}</b></Link>
                </Grid>
              )}
            </Grid>
        </div>
    }
  </Grid>)

}
