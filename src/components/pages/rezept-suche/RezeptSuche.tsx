import React, {useContext} from 'react';
import {Formik} from 'formik';

import {StateContext} from "../../../services/contexts/StateProvider";
import {ActionTypes, RezeptSucheQuery, StateContextType} from "../../../services/contexts/types";
import {RezeptSucheForm} from './RezeptSucheForm';
import {useQuery} from "@tanstack/react-query";
import {Rezept} from "../../../models/rezept.model";
import {rezeptSuche} from "../../../services/api/rezeptService";
import {RezeptSucheAusgabe} from "./RezeptSucheAusgabe";


export function RezeptSuche() {
  const {state: {rezeptSucheQuery}, dispatch} = useContext(StateContext) as StateContextType
  const {
    refetch
  } = useQuery<Rezept[]>(
    {
      queryKey: ["rezept-suche", rezeptSucheQuery.rezeptName],
      queryFn: () => rezeptSuche(rezeptSucheQuery),
      enabled: (rezeptSucheQuery.rezeptName.length > 0),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  async function handleSubmit(rezeptSucheQuery: RezeptSucheQuery) {
    dispatch({type: ActionTypes.SET_REZEPT_SUCHE, payload: rezeptSucheQuery})
    await refetch()
  }

  return (
    <>
      <Formik<RezeptSucheQuery>
        initialValues={rezeptSucheQuery}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <RezeptSucheForm/>
      </Formik>
      <br/>
      <RezeptSucheAusgabe/>
    </>
  );
}
