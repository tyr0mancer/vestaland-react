import {RezeptPartial, GlobalState, Kochstatus} from "./types";
import {LocalStorage} from "./StateProvider";
import {Rezept} from "../../shared-types/models/Rezept";
import {updateCacheReducer} from "./updateCacheReducer";
import {Einkaufsliste} from "../../shared-types/models/Einkaufsliste";
import {RezeptSucheFormType} from "../../shared-types/schemas/rezept-schema";

export enum ActionTypes {
  UPDATE_CACHE = 'UPDATE_CACHE',

  PUSH_HISTORY = 'PUSH_HISTORY',
  SET_REZEPT_COOK = 'SET_REZEPT_COOK',
  SET_REZEPT_EDIT = 'SET_REZEPT_EDIT',
  SAVE_REZEPT_EDIT = 'SAVE_REZEPT_EDIT',
  SET_KOCHSTATUS = 'SET_KOCHSTATUS',
  DELETE_HISTORY = 'DELETE_HISTORY'
}

export const DefaultDataSyncNodes: DataSyncNodes = {}

export interface DataSyncNodes {
  rezeptEdit?: Rezept,
  rezeptView?: Rezept,
  rezeptSuche?: RezeptSucheFormType,
  einkaufslisten?: Einkaufsliste[],
}

export type CachePayloadType =
  | { key: 'rezeptEdit', data: Rezept }
  | { key: 'rezeptSuche', data: RezeptSucheFormType }
  | { key: 'einkaufslisten', data: Einkaufsliste[] }

export type CachePayloadTypeKeys = CachePayloadType extends { key: infer K } ? K : never;
export type CachePayloadTypeValues = CachePayloadType['data'];

export type ReducerActionType =
  | { type: ActionTypes.UPDATE_CACHE, payload: CachePayloadType }




  | { type: ActionTypes.PUSH_HISTORY, payload: Rezept }
  | { type: ActionTypes.DELETE_HISTORY, payload: string }
  | { type: ActionTypes.SET_REZEPT_COOK, payload?: Rezept }
  | { type: ActionTypes.SET_REZEPT_EDIT, payload?: Rezept }
  | { type: ActionTypes.SAVE_REZEPT_EDIT, payload?: Rezept }
  | { type: ActionTypes.SET_KOCHSTATUS, payload: Kochstatus }


export const reducer = (state: GlobalState, action: ReducerActionType): GlobalState => {

  switch (action.type) {
    case ActionTypes.UPDATE_CACHE:
      return updateCacheReducer(state, action.payload)

    case ActionTypes.DELETE_HISTORY:
      const newHistory = state.rezeptHistory.filter(r => r._id !== action.payload)
      localStorage.setItem(LocalStorage.REZEPT_HISTORY, JSON.stringify(newHistory || []));
      return {...state, rezeptHistory: newHistory};

    case ActionTypes.PUSH_HISTORY:
      const newEntry: RezeptPartial = {
        _id: action.payload._id,
        name: action.payload.name,
        bild: action.payload.bild,
        beschreibung: action.payload.beschreibung
      };
      const rezeptHistory = [newEntry, ...state.rezeptHistory.filter(e => e._id !== newEntry._id)]
      localStorage.setItem(LocalStorage.REZEPT_HISTORY, JSON.stringify(rezeptHistory || []));
      return {...state, rezeptHistory: rezeptHistory};

    case ActionTypes.SET_REZEPT_COOK:
      localStorage.setItem(LocalStorage.REZEPT_COOK, JSON.stringify(action.payload || null));
      return {...state, rezeptCooking: action.payload};

    case ActionTypes.SET_REZEPT_EDIT:
      return {...state, rezeptEditing: action.payload};
    case ActionTypes.SAVE_REZEPT_EDIT:
      localStorage.setItem(LocalStorage.REZEPT_EDIT, JSON.stringify(action.payload || null));
      return {...state, rezeptEditing: action.payload};

    case ActionTypes.SET_KOCHSTATUS:
      localStorage.setItem(LocalStorage.KOCHSTATUS, JSON.stringify(action.payload));
      return {...state, kochstatus: action.payload};

    default:
      return state;
  }
};


