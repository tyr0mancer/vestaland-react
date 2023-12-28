// @todo sync with server
import React from "react";
import {Rezept} from "../../models/rezept.model";

export interface RezeptSucheQuery {
  name: string,
  vegetarian: boolean,
  healthy: boolean,
  myRecipes: boolean
}

export interface State {
  aktuelleRezeptId?: string | null
  rezeptSucheQuery: RezeptSucheQuery,
  aktuellesRezept?: Rezept

}
export enum ActionTypes {
  SET_REZEPT_CURRENT_ID = 'setze-Rezept-ID-des-aktuellen-Rezeptes',
  SET_REZEPT_SUCHE = 'set-rezept-suche'
}

export type Action =
  | { type: ActionTypes.SET_REZEPT_CURRENT_ID, payload: string }
  | { type: ActionTypes.SET_REZEPT_SUCHE, payload: RezeptSucheQuery }

// Weitere Aktionstypen...

export interface StateContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}
