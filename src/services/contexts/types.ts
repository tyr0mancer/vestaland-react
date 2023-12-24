// @todo sync with server
import React from "react";

export interface RezeptSucheQuery {
  name: string,
  vegetarian: boolean,
  healthy: boolean,
  myRecipes: boolean
}

export interface State {
  aktuelleRezeptId?: string | null
  rezeptSucheQuery: RezeptSucheQuery
}
export enum ActionTypes {
  PUSH_REZEPT = 'remember-current-Rezept-ID',
  SET_REZEPT_SUCHE = 'set-rezept-suche'
}

export type Action =
  | { type: ActionTypes.PUSH_REZEPT, payload: string }
  | { type: ActionTypes.SET_REZEPT_SUCHE, payload: RezeptSucheQuery }

// Weitere Aktionstypen...

export interface StateContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}
