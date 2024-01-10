import {ReducerActionType, ActionTypes, RezeptPartial, State} from "./types";
import {LocalStorage} from "./StateProvider";

export const reducer = (state: State, action: ReducerActionType): State => {

  switch (action.type) {

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

    case ActionTypes.SET_REZEPT_SUCHE:
      return {...state, rezeptSucheQuery: action.payload};

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


