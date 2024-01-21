import React from "react";
import {FieldArray, FieldArrayRenderProps, useField} from "formik";
import {CustomFieldArrayProp} from "./types";
import {customConfirm} from "../../ui/ConfirmDialog";

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
                                      name, render, newValue, activeIndex, setActiveIndex, confirmDelete,
                                    }: CustomFieldArrayProp<T>): React.ReactElement {
  const [{value}] = useField<T[]>(name);

  const handleInsert = (arrayHelper: FieldArrayRenderProps) => (index: number = value.length) => {
    arrayHelper.insert(index, newValue)
    if (setActiveIndex)
      setActiveIndex(index)
  }

  const handleDelete = (arrayHelper: FieldArrayRenderProps) => async (index: number) => {
    if (confirmDelete) {
      const confirm = await customConfirm(confirmDelete)
      if (!confirm) return
    }

    arrayHelper.remove(index)
    if (setActiveIndex)
      setActiveIndex(-1)
  }

  const handleMoveUp = (arrayHelper: FieldArrayRenderProps) => (index: number) => {
    arrayHelper.move(index, index - 1)
    if (setActiveIndex && index === activeIndex)
      setActiveIndex(index - 1)
    else if (setActiveIndex && activeIndex && index === activeIndex + 1)
      setActiveIndex(index)
  }
  const handleMoveDown = (arrayHelper: FieldArrayRenderProps) => (index: number) => {
    arrayHelper.move(index, index + 1)
    if (setActiveIndex && index === activeIndex)
      setActiveIndex(index + 1)
    else if (setActiveIndex && activeIndex && index === activeIndex - 1)
      setActiveIndex(index)
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
  handleDelete: (index: number, withConfirm?: boolean) => void,
  handleMoveUp: (index: number) => void,
  handleMoveDown: (index: number) => void,
}
