import {useQuery} from "@tanstack/react-query";
import {useContext, useEffect, useState} from "react";
import {ZodObject} from "zod";
import {CachePayloadType, CachePayloadTypeKeys, CachePayloadTypeValues} from "../state/reducers";
import {StateContext} from "../state/StateProvider";
import {StateContextType} from "../state/types";
import {CustomFormikProps} from "../../components/common/form-elements/generic/CustomForm";
import {validateFormZod} from "./validate-form-zod";
import {RezeptSucheFormType} from "../../shared-types/schemas/rezept-schema";

type UseSearchCollectionProps<T, F> = {
  queryKey?: string,
  contextKey: CachePayloadTypeKeys,
  queryFn: (params: F) => Promise<T[]>,
  enableQuery: (param: F) => boolean,
  dispatchFn?: (data: F) => CachePayloadType,
  defaultValues: F,
  validationSchema: ZodObject<any>,
}

interface UseSearchCollectionReturn<T, F> {
  results: T[],
  formikProps: CustomFormikProps<F>
}

/**
 *
 * @see useDataSync
 *
 * @typeParam T - Typ der Objekte der Collection die durchsucht werden soll
 * @typeParam F - Format der Sucheingabe
 */
export function useSearchCollection<T, F>({
                                            defaultValues,
                                            validationSchema,
                                            contextKey,
                                            dispatchFn,
                                            queryKey = contextKey,
                                            queryFn,
                                            enableQuery
                                          }: UseSearchCollectionProps<T, F>): UseSearchCollectionReturn<T, F> {
  /**
   * Daten aus Context lesen
   */
  const {state: {dataSync}, dispatch} = useContext(StateContext) as StateContextType
  const contextData = contextKey ? dataSync[contextKey] : undefined as T | undefined;

  /**
   * initialValues setzen
   */
  const initialValues = (contextData ?? defaultValues) as F;

  const [params, setParams] = useState<F>(defaultValues)
  const {
    refetch,
    isLoading,
    isSuccess,
    error,
    data
  } = useQuery<T[]>(
    {
      queryKey: [queryKey, params],
      queryFn: queryFn ? () => queryFn(params) : undefined,
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: enableQuery(params)
    })


  /**
   * Formik Form Validator
   * @param values
   */
  const validateForm = (values: F) => validateFormZod<F>(values, validationSchema)


  const results: T[] = []
  return {
    results,
    formikProps: {validateForm, initialValues, dispatchFn}
  }
}


type UseTapSearchResultsProps<T, S> = {
  queryKey?: string,
  contextKey: CachePayloadTypeKeys
  params?: S

}


export function useTapSearchResults<T, S extends CachePayloadTypeValues>({
                                                                           contextKey,
                                                                           queryKey = contextKey,
                                                                           params
                                                                         }: UseTapSearchResultsProps<T, S>) {
  const {state: {dataSync}, dispatch} = useContext(StateContext) as StateContextType
  /**
   * Daten aus Context lesen
   */
  if (!params && contextKey && dataSync && dataSync[contextKey])
    params = dataSync[contextKey] as S

  return useQuery<T[]>(
    {
      queryKey: [queryKey, params],
      enabled: false,
    });
}
