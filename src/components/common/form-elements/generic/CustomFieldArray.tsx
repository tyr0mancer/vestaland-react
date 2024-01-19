import React from "react";
import {FieldArray, FieldArrayRenderProps, useField} from "formik";
import {CustomFieldArrayProp} from "./types";

/**
 * CustomFieldArray Komponente - Ein spezialisierter Wrapper um Formik's FieldArray.
 * Ermöglicht die dynamische Bearbeitung von Arrays in Formularen.
 *
 * @typeParam T - Der Typ der Elemente in der FieldArray.
 *
 * @param props - Die Eigenschaften des CustomFieldArray, definiert in CustomFieldArrayProp.
 *
 * @example
 * <CustomFieldArray
 *  name={'zutaten'}
 *  child={<ZutatChild/>}
 *  header={<ZutatenHeader/>}
 *  newValue={newZutatValue}
 * />
 */
export function CustomFieldArray<T>({
                                      name, render, newValue
                                    }: CustomFieldArrayProp<T>): React.ReactElement {
  const [{value}] = useField<T[]>(name);

  const handleInsert = (arrayHelper: FieldArrayRenderProps) => (index: number = value.length) => {
    arrayHelper.insert(index, newValue)
  }
  const handleDelete = (arrayHelper: FieldArrayRenderProps) => (index: number) => {
    arrayHelper.remove(index)
  }

  const handleMoveUp = (arrayHelper: FieldArrayRenderProps) => (index: number) => {
    arrayHelper.move(index, index - 1)
  }
  const handleMoveDown = (arrayHelper: FieldArrayRenderProps) => (index: number) => {
    arrayHelper.move(index, index + 1)
  }

  return <FieldArray
    name={name}
    render={arrayHelper => render({
      handleInsert: handleInsert(arrayHelper),
      handleDelete: handleDelete(arrayHelper),
      handleMoveUp: handleMoveUp(arrayHelper),
      handleMoveDown: handleMoveDown(arrayHelper),
    }, value)}
  />
}


export interface CustomArrayHelper {
  handleInsert: (index?: number) => void,
  handleDelete: (index: number) => void,
  handleMoveUp: (index: number) => void,
  handleMoveDown: (index: number) => void,
}
