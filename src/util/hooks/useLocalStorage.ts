import {LocalStorageKey} from "../config/enums";
import {useEffect, useState} from "react";

export type LocalStorageReturn<T> = [T | undefined, (data?: T) => void, () => T | undefined]

export function useLocalStorage<T>(storageKey: LocalStorageKey, defaultData?: T): LocalStorageReturn<T> {

  const [result, setResult] = useState<T | undefined>(defaultData)

  useEffect(() => {
    reloadData()
  }, [])

  function setData(data?: T) {
    const dataString = (data === null)
      ? 'null'
      : (data === undefined)
        ? ''
        : JSON.stringify(data)
    localStorage.setItem(storageKey, dataString)
    setResult(data)
  }

  function reloadData() {
    let result: T | undefined
    try {
      const dataString = localStorage.getItem(storageKey)
      result = (!dataString)
        ? undefined
        : JSON.parse(dataString) as T

    } catch (e) {
      console.log(e)
    }
    setResult(result)
    return result
  }

  return [result, setData, reloadData]
}


