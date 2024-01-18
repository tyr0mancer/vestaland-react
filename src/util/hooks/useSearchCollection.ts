import {useQuery} from "@tanstack/react-query";
import {APIService} from "../api/APIService";
import {Rezept} from "../../shared-types/models/Rezept";
import {useState} from "react";

type UseSearchCollectionProps<T, S> = {
  queryKey: string,
  queryFn: (params: S) => Promise<T[]>,
  initialValue: S
}

interface UseSearchCollectionReturn<T> {
  results: T[]
}

/**
 *
 */
export function useSearchCollection<T, S>({
                                            initialValue,
                                            queryKey,
                                            queryFn
                                          }: UseSearchCollectionProps<T, S>): UseSearchCollectionReturn<T> {

  const [params, setParams] = useState<S>(initialValue)

  const {
    isLoading,
    isSuccess,
    error,
    data
  } = useQuery<T[]>(
    {
      queryKey: [queryKey, rezeptId],
      queryFn: (params) => new Promise<T[]>(resolve => {
      }),
      enabled: !!rezeptId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });


  const results: T[] = []
  return {
    results
  }
}
