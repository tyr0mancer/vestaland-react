import React, {useContext} from 'react';
import {useQuery} from "@tanstack/react-query";
import {Formik} from 'formik';

import {StateContext} from "../../../util/state/StateProvider";
import {ActionTypes, RezeptSucheQuery, StateContextType} from "../../../util/state/types";
import {Rezept} from "../../../shared-types/models/rezept.model";
import {rezeptSuche} from "../../../util/api/rezeptService";

import {RezeptSucheForm} from './RezeptSucheForm';
import {RezeptSucheAusgabe} from "./RezeptSucheAusgabe";


export function RezeptSuche() {
  const {state: {rezeptSucheQuery}, dispatch} = useContext(StateContext) as StateContextType
  const {
    refetch
  } = useQuery<Rezept[]>(
    {
      queryKey: ["rezepte-suche", rezeptSucheQuery.rezeptName],
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
