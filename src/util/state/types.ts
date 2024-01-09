import React from "react";
import {Rezept} from "../../shared-types/models/rezept.model";

export interface RezeptSucheQuery {
  rezeptName: string,
  vegetarisch?: boolean,
  healthy?: boolean,
  myRecipes?: boolean,
  soulfood?: boolean,
  zutaten?: string[]
}

export type RezeptPartial = Pick<Rezept, "_id" | "name" | "bild" | "beschreibung">;

export interface State {
  rezeptHistory: RezeptPartial[],
  rezeptSucheQuery: RezeptSucheQuery,
  rezeptCooking?: Rezept,
  kochstatus: Kochstatus,
  rezeptEditing?: Rezept
}

export enum ActionTypes {
  SET_REZEPT_SUCHE = 'SET_REZEPT_SUCHE',
  PUSH_HISTORY = 'PUSH_HISTORY',
  SET_REZEPT_COOK = 'SET_REZEPT_COOK',
  SET_REZEPT_EDIT = 'SET_REZEPT_EDIT',
  SAVE_REZEPT_EDIT = 'SAVE_REZEPT_EDIT',
  SET_KOCHSTATUS = 'SET_KOCHSTATUS'
}


export type Action =
  | { type: ActionTypes.SET_REZEPT_SUCHE, payload: RezeptSucheQuery }
  | { type: ActionTypes.PUSH_HISTORY, payload: Rezept }
  | { type: ActionTypes.SET_REZEPT_COOK, payload?: Rezept }
  | { type: ActionTypes.SET_REZEPT_EDIT, payload?: Rezept }
  | { type: ActionTypes.SAVE_REZEPT_EDIT, payload?: Rezept }
  | { type: ActionTypes.SET_KOCHSTATUS, payload: Kochstatus }

// Weitere Aktionstypen...

export interface StateContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}


export interface Kochstatus {
  kochschrittFokus: string | false,
  kochschrittIndex: number,
  etd?: Date
}
