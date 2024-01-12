import {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from "@tanstack/react-query";

import {StateContextType} from "./types";
import {StateContext} from "./StateProvider";
import {ActionTypes, CachePayloadTypeKeys} from "./reducers";

interface UseDataSyncParams<T> {
  parameterName?: string
  queryFn?: (id?: string) => Promise<T>
  queryKey?: string
  contextKey?: CachePayloadTypeKeys
  defaultValues: T
}

export interface UseDataSyncReturn<T> {
  initialValues: T
  isLoading: boolean
  error: unknown
  handleSave: (value: T) => void
}

export function useDataSync<T>({
                                 parameterName,
                                 queryFn,
                                 queryKey,
                                 contextKey,
                                 defaultValues
                               }: UseDataSyncParams<T>): UseDataSyncReturn<T> {

  const params = useParams<{ [key: string]: string }>()
  const paramValue = parameterName ? params[parameterName] : undefined
  const {data: apiData, isLoading, error} = useQuery<T>(
    {
      queryFn: queryFn ? () => queryFn(paramValue) : undefined,
      queryKey: [queryKey, paramValue],
      enabled: !!(paramValue && (paramValue?.length > 0)),
    });

  const {state: {dataSync}, dispatch} = useContext(StateContext) as StateContextType
  useEffect(() => {
    if (!apiData || !contextKey) return;
    // @ts-ignore
    dispatch({type: ActionTypes.UPDATE_CACHE, payload: {key: contextKey, data: apiData}});
  }, [apiData, dispatch, contextKey]);
  const contextData = contextKey ? dataSync[contextKey] : undefined as T | undefined;

  const localStorageData = !contextKey
    ? null
    : localStorage.getItem(contextKey)
      ? JSON.parse(localStorage.getItem(contextKey )|| 'null') as T
      : null

  const initialValues = (apiData ?? contextData ?? localStorageData ?? defaultValues) as T;

  const handleSave = (value: T) => {
    if (!contextKey) return
    localStorage.setItem(contextKey, JSON.stringify(value || null));
  }

  return {initialValues, isLoading, error, handleSave};
}
