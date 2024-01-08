// @todo sync with server
import React from "react";
import {Rezept} from "../../models/rezept.model";

export interface RezeptSucheQuery {
  rezeptName: string,
  vegetarisch?: boolean,
  healthy?: boolean,
  myRecipes?: boolean,
  soulfood?: boolean,
  zutaten?: string[]
}

export interface RezeptHistory {
  _id: string,
  name: string
}

export interface State {
  rezeptHistory: RezeptHistory[],
  rezeptSucheQuery: RezeptSucheQuery,
  rezeptViewing?: Rezept
  rezeptCooking?: Rezept,
  kochstatus: Kochstatus,
  rezeptEditing?: Rezept
}

export enum ActionTypes {
  SET_REZEPT_SUCHE = 'SET_REZEPT_SUCHE',
  PUSH_REZEPT_ID = 'PUSH_REZEPT_ID',
  SET_REZEPT_VIEW = 'SET_REZEPT_VIEW',
  SET_REZEPT_COOK = 'SET_REZEPT_COOK',
  SET_REZEPT_EDIT = 'SET_REZEPT_EDIT',
  SET_KOCHSTATUS = 'SET_KOCHSTATUS'
}


export type Action =
  | { type: ActionTypes.SET_REZEPT_SUCHE, payload: RezeptSucheQuery }
  | { type: ActionTypes.PUSH_REZEPT_ID, payload: RezeptHistory }
  | { type: ActionTypes.SET_REZEPT_VIEW, payload?: Rezept }
  | { type: ActionTypes.SET_REZEPT_COOK, payload?: Rezept }
  | { type: ActionTypes.SET_REZEPT_EDIT, payload?: Rezept }
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
