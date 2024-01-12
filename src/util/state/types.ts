import React from "react";
import {Rezept} from "../../shared-types/models/rezept.model";
import {KochschrittAktion} from "../../shared-types/models/KochschrittAktion";
import {ReducerActionType, DataSyncNodes} from "./reducers";

export interface RezeptSucheQuery {
  rezeptName: string,
  vegetarisch?: boolean,
  healthy?: boolean,
  myRecipes?: boolean,
  soulfood?: boolean,
  zutaten?: string[]
}

export type RezeptPartial = Pick<Rezept, "_id" | "name" | "bild" | "beschreibung">;

export interface GlobalState {
  dataSync: DataSyncNodes,
  rezeptHistory: RezeptPartial[],
  rezeptSucheQuery: RezeptSucheQuery,
  rezeptCooking?: Rezept,
  kochstatus: Kochstatus,
  rezeptEditing?: Rezept
}


// Weitere Aktionstypen...

export interface StateContextType {
  state: GlobalState;
  dispatch: React.Dispatch<ReducerActionType>;
}


interface Timer {
  startTime: Date,
  totalLength: number,
  isActive: boolean,
  lastUpdate: Date,
  timeLeft: number
}

export interface KochschrittMeta {
  length: number
  ratio: number | null
  aktionen: KochschrittAktion[]
  startTime: Date | null
  endTime: Date | null
  timer?: Timer
}

export interface Kochstatus {
  meta: KochschrittMeta[]
  kochschrittFokusIndex: string | false,
  aktuellerKochschrittIndex: number,
  etd?: Date
}
