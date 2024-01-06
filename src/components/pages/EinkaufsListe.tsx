import * as React from 'react';
import {useQuery} from "@tanstack/react-query";
import {Einkaufsliste} from "../../models/einkaufsliste.model";
import {einkaufslistenAbfrageService} from "../../services/api/einkaufslistenService";

export function EinkaufsListe() {


  const data = useQuery<Einkaufsliste[]>(
    {
      queryKey: ["config-aktion"],
      queryFn: () => einkaufslistenAbfrageService(),
      staleTime: 1000 * 60 * 15, // 15 minutes
    });


  return (
    <>
      <h2>Einkaufslisten</h2>
      {JSON.stringify(data)}
    </>
  );
}
