import {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from "@tanstack/react-query";

import {StateContextType} from "../state/types";
import {StateContext} from "../state/StateProvider";
import {ActionTypes, CachePayloadType, CachePayloadTypeKeys} from "../state/reducers";
import {ZodObject} from "zod";
import {validateZodSchema} from "../helper/validate-zod";

export interface UseDataSyncParams<T> {
  parameterName?: string
  queryFn?: (id?: string) => Promise<T>
  queryKey?: string
  contextKey?: CachePayloadTypeKeys
  defaultValues: T
  validationSchema: ZodObject<any>
  dispatchFn?: (data: T) => CachePayloadType
}

export interface UseDataSyncReturn<T> {
  initialValues: T
  isLoading: boolean
  error: unknown
  handleSave: (value: T) => void
  validateForm: (value: T) => any
  dispatchFn?: (data: T) => CachePayloadType
  contextKey?: CachePayloadTypeKeys,

}

/**
 * TS-Doc
 */
export function useDataSync<T>({
                                 parameterName,
                                 queryFn,
                                 queryKey,
                                 contextKey,
                                 dispatchFn,
                                 defaultValues,
                                 validationSchema
                               }: UseDataSyncParams<T>): UseDataSyncReturn<T> {

  /**
   * Daten aus API lesen wenn parameter in URL
   */
  const params = useParams<{ [key: string]: string }>()
  const paramValue = parameterName ? params[parameterName] : undefined
  const {data: apiData, isLoading, error} = useQuery<T>(
    {
      queryFn: queryFn ? () => queryFn(paramValue) : undefined,
      queryKey: [queryKey, paramValue],
      enabled: !!(paramValue && (paramValue?.length > 0)),
    });


  /**
   * Schreibe Werte in Context, wenn API Daten liefert
   */
  const {state: {dataSync}, dispatch} = useContext(StateContext) as StateContextType
  useEffect(() => {
    if (!apiData || !contextKey || !dispatchFn) return;
    const payload = dispatchFn(apiData)
    dispatch({type: ActionTypes.UPDATE_CACHE, payload});
  }, [apiData, dispatch, contextKey]);


  /**
   * Daten aus Context lesen
   */
  const contextData = contextKey ? dataSync[contextKey] : undefined as T | undefined;


  /**
   * Daten aus Local Storage lesen
   */
  const localStorageData = !contextKey
    ? null
    : localStorage.getItem(contextKey)
      ? JSON.parse(localStorage.getItem(contextKey) || 'null') as T
      : null


  /**
   * Daten in Local Storage schreiben
   */
  const handleSave = (value: T) => {
    if (!contextKey) return
    localStorage.setItem(contextKey, JSON.stringify(value || null));
  }


  /**
   * initialValues je nach Priorität setzen
   */
  const initialValues = (apiData ?? contextData ?? localStorageData ?? defaultValues) as T;


  /**
   * Formik Form Validator
   * @param values
   */
  const validateForm = (values: T) => validateZodSchema<T>(values, validationSchema)


  return {
    initialValues,
    isLoading,
    error,
    handleSave,
    validateForm,
    dispatchFn,
    contextKey,
  };
}
