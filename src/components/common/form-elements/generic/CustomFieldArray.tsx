import React from "react";
import {FieldArray, FieldArrayRenderProps, useField} from "formik";
import {CustomFieldArrayProp} from "./types";
import {customConfirm} from "../../ui/ConfirmDialog";
import {DropResult} from "react-beautiful-dnd";

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
                                      name,
                                      renderChild,
                                      renderHeader,
                                      renderFooter,
                                      newValue,
                                      activeIndex,
                                      setActiveIndex,
                                      confirmDelete,
                                    }: CustomFieldArrayProp<T>): React.ReactElement {
  const [{value}] = useField<T[]>(name);

  const handleInsert = (arrayHelper: FieldArrayRenderProps) => (index: number = value.length, newElement: T | undefined = newValue) => {
    arrayHelper.insert(index, newElement)
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

  const handleDragEnd = (arrayHelper: FieldArrayRenderProps) => (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    arrayHelper.move(sourceIndex, destinationIndex);
    if (setActiveIndex) {
      setActiveIndex(destinationIndex);
    }
  }

  const createCustomArrayHelper = (arrayHelper: FieldArrayRenderProps) => {
    return {
      handleInsert: handleInsert(arrayHelper),
      handleDelete: handleDelete(arrayHelper),
      handleMoveUp: handleMoveUp(arrayHelper),
      handleMoveDown: handleMoveDown(arrayHelper),
      handleDragEnd: handleDragEnd(arrayHelper)
    }
  }

  return <>


    <FieldArray
      name={name}
      render={arrayHelper => <>

        {renderHeader && renderHeader(createCustomArrayHelper(arrayHelper), value.length)}
        {value.map((element, index) =>
          renderChild(createCustomArrayHelper(arrayHelper), index, element, value.length))
        }
        {renderFooter && renderFooter(createCustomArrayHelper(arrayHelper), value.length)}

      </>
      }/>


  </>
}


export interface CustomArrayHelper<T = any> {
  handleInsert: (index?: number, newValue?: T) => void,
  handleDelete: (index: number, withConfirm?: boolean) => void,
  handleMoveUp: (index: number) => void,
  handleMoveDown: (index: number) => void,
  handleDragEnd: (result: DropResult) => void,

}


/*
return <FieldArray
  name={name}
  render={arrayHelper => render({
    handleInsert: handleInsert(arrayHelper),
    handleDelete: handleDelete(arrayHelper),
    handleMoveUp: handleMoveUp(arrayHelper),
    handleMoveDown: handleMoveDown(arrayHelper),
  }, value)}
/>*/
