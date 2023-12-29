import React, {useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {Row} from "react-bootstrap";

import {Rezept} from "../../../models/rezept.model";
import {RezeptVorschau} from "./RezeptVorschau";
import {rezeptSuche} from "../../../services/api/rezeptService";
import {StateContext} from "../../../services/contexts/StateProvider";
import {StateContextType} from "../../../services/contexts/types";

export function RezeptSucheAusgabe() {
  const {state} = useContext(StateContext) as StateContextType

  const {
    isSuccess,
    isLoading,
    data
  } = useQuery<Rezept[]>(
    {
      queryKey: ["rezept-suche", state.rezeptSucheQuery.name],
      queryFn: () => rezeptSuche(state.rezeptSucheQuery.name)
    });

  return (<Row>
      {isLoading && <h1>Lädt...</h1>}
      {isSuccess && data.map(rezept => <RezeptVorschau key={rezept._id} rezept={rezept}/>)}
    </Row>
  );
}
