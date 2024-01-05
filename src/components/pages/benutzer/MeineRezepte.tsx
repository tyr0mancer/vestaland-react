import React from "react";
import {Rezept} from "../../../models/rezept.model";
import {rezeptSuche} from "../../../services/api/rezeptService";
import {useQuery} from "@tanstack/react-query";
import {Box, Typography} from "@mui/material";
import {RezeptCard} from "../rezept-suche/RezeptCard";

interface MeineRezepteProps {
}

/**
 * TS Doc Info
 * @component MeineRezepte
 */
export function MeineRezepte({}: MeineRezepteProps): React.ReactElement {
  const {
    data
  } = useQuery<Rezept[]>(
    {
      queryKey: ["rezepte-suche", 'meine'],
      queryFn: () => rezeptSuche({rezeptName: '', myRecipes: true}),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });


  return (<Box mt={2}>
    <Typography variant="h4">Meine Rezepte</Typography>
    {data?.map(rezept => <RezeptCard rezept={rezept}/>)}
  </Box>)
}
