import {Action, ActionTypes, State} from "../types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.PUSH_REZEPT:
      return {...state};
    case ActionTypes.SET_REZEPT_SUCHE:
      return {...state, rezeptSucheQuery: action.payload};
    default:
      return state;
  }
};
