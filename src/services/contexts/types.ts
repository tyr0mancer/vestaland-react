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
  PUSH_REZEPT = 'remember-current-Rezept-ID',
  SET_REZEPT_SUCHE = 'set-rezept-suche',
  SET_REZEPT_EDIT = 'set-rezept-edit'
}

export type Action =
  | { type: ActionTypes.SET_REZEPT_EDIT, payload: Rezept }
  | { type: ActionTypes.PUSH_REZEPT, payload: string }
  | { type: ActionTypes.SET_REZEPT_SUCHE, payload: RezeptSucheQuery }

// Weitere Aktionstypen...

export interface StateContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}
