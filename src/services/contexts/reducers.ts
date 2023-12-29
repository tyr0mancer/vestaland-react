import {Action, ActionTypes, State} from "./types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_REZEPT_SUCHE:
      return {...state, rezeptSucheQuery: action.payload};
    case ActionTypes.PUSH_REZEPT_ID:
      return {...state, rezeptHistory: [action.payload, ...state.rezeptHistory]};
    case ActionTypes.SET_REZEPT_VIEW:
      return {...state, rezeptViewing: action.payload};
    case ActionTypes.SET_REZEPT_COOK:
      return {...state, rezeptCooking: action.payload};
    case ActionTypes.SET_REZEPT_EDIT:
      return {...state, rezeptEditing: action.payload};
    default:
      return state;
  }
};
