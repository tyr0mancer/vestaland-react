import {useQuery} from "@tanstack/react-query";
import {useContext, useEffect, useState} from "react";
import {ZodObject} from "zod";
import {CachePayloadType, CachePayloadTypeKeys, CachePayloadTypeValues} from "../state/reducers";
import {StateContext} from "../state/StateProvider";
import {StateContextType} from "../state/types";

type UseSearchCollectionProps<T, S> = {
  queryKey?: string,
  contextKey: CachePayloadTypeKeys,
  queryFn: (params: S) => Promise<T[]>,
  dispatchFn?: (data: T) => CachePayloadType,
  defaultValues: S,
  validationSchema?: ZodObject<any>
}

interface UseSearchCollectionReturn<T> {
  results: T[]
}

/**
 *
 * @see useDataSync
 */
export function useSearchCollection<T, S>({
                                            defaultValues,
                                            validationSchema,
                                            contextKey,
                                            dispatchFn,
                                            queryKey = contextKey,
                                            queryFn,
                                          }: UseSearchCollectionProps<T, S>): UseSearchCollectionReturn<T> {

  const [params, setParams] = useState<S>(defaultValues)
  const {state: {dataSync}, dispatch} = useContext(StateContext) as StateContextType

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
    })


  const results: T[] = []
  return {
    results
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
