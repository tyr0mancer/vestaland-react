import React, {useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {Row} from "react-bootstrap";

import {Rezept} from "../../models/rezept.model";
import {RezeptVorschau} from "./RezeptVorschau";
import globalContext from "../../services/contexts/globalContext";
import {rezeptSuche} from "../../services/api/rezeptService";

export function RezeptSucheAusgabe() {
  const {rezeptSuche: searchQueryDebounced} = useContext(globalContext)

  const {
    isSuccess,
    isLoading,
    data
  } = useQuery<Rezept[]>(
    {
      queryKey: ["rezept-suche", searchQueryDebounced],
      queryFn: () => rezeptSuche(searchQueryDebounced),
      enabled: searchQueryDebounced.length > 0, // Disable query if input is empty
    });


  return (<Row>
      {isLoading && <h1>Lädt...</h1>}
      {isSuccess && data.map(rezept => <RezeptVorschau key={rezept._id} rezept={rezept}/>)}
    </Row>
  );
}
