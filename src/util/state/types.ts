import React from "react";
import {Rezept} from "../../shared-types/models/rezept.model";
import {KochschrittAktion} from "../../shared-types/models/KochschrittAktion";

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
  SET_KOCHSTATUS = 'SET_KOCHSTATUS',
  DELETE_HISTORY = 'DELETE_HISTORY'
}


export type ReducerActionType =
  | { type: ActionTypes.SET_REZEPT_SUCHE, payload: RezeptSucheQuery }
  | { type: ActionTypes.PUSH_HISTORY, payload: Rezept }
  | { type: ActionTypes.DELETE_HISTORY, payload: string }
  | { type: ActionTypes.SET_REZEPT_COOK, payload?: Rezept }
  | { type: ActionTypes.SET_REZEPT_EDIT, payload?: Rezept }
  | { type: ActionTypes.SAVE_REZEPT_EDIT, payload?: Rezept }
  | { type: ActionTypes.SET_KOCHSTATUS, payload: Kochstatus }


// Weitere Aktionstypen...

export interface StateContextType {
  state: State;
  dispatch: React.Dispatch<ReducerActionType>;
}


interface KochschrittSummary {
  length: number
  ratio: number | null
  aktionen: KochschrittAktion[]
  startTime?: Date
  endTime?: Date
}

export interface Kochstatus {
  kochschrittSummary: KochschrittSummary[]
  kochschrittFokus: string | false,
  kochschrittIndex: number,
  etd?: Date
}
