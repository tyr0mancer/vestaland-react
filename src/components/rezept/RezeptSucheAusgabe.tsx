import React, {useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {Row} from "react-bootstrap";

import {Rezept} from "../../models/rezept.model";
import {RezeptVorschau} from "./RezeptVorschau";
import globalContext from "../../services/contexts/globalContext";
import {rezeptSuche} from "../../services/api/rezeptService";

export function RezeptSucheAusgabe() {
  const {rezeptSucheQuery} = useContext(globalContext)

  const {
    isSuccess,
    isLoading,
    data
  } = useQuery<Rezept[]>(
    {
      queryKey: ["rezept-suche", rezeptSucheQuery.name],
      queryFn: () => rezeptSuche(rezeptSucheQuery.name || "")
    });


  return (<Row>
      {isLoading && <h1>Lädt...</h1>}
      {isSuccess && data.map(rezept => <RezeptVorschau key={rezept._id} rezept={rezept}/>)}
    </Row>
  );
}
