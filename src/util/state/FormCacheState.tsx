import React, {useContext, useEffect} from "react";
import {ActionTypes, CachePayloadType} from "./reducers";
import {StateContext} from "./StateProvider";
import {StateContextType} from "./types";
import {useDebounce} from "@react-hooks-library/core";

/**
 * TS Doc Info
 * @component CacheState
 */
export function FormCacheState({payload}: { payload: CachePayloadType }): React.ReactElement {
  const {dispatch} = useContext(StateContext) as StateContextType
  const debouncedFormValues = useDebounce(payload.data, 500)
  useEffect(() => {
    // @ts-ignore
    dispatch({type: ActionTypes.UPDATE_CACHE, payload: {key: payload.key, data: debouncedFormValues}})
  }, [debouncedFormValues, dispatch, payload.key])
  return <></>
}

