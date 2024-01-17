import React from "react";
import {FieldArray, useField} from "formik";
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
                                      name,
                                      child,
                                      header,
                                      footer,
                                      newValue
                                    }: CustomFieldArrayProp<T>): React.ReactElement {
  const [{value}] = useField<T[]>(name);
  return <FieldArray
    name={name}
    render={arrayHelpers => (<>
      {!!header && React.cloneElement(header, {
        handleInsert: () => arrayHelpers.insert(0, newValue),
      })}

      {value.map((element, index) => React.cloneElement(child, {
        key: index,
        name: `${name}[${index}]`,
        handleDelete: () => arrayHelpers.remove(index),
        handleInsert: () => arrayHelpers.insert(index, newValue),
        handleMoveUp: () => arrayHelpers.move(index, index - 1),
        handleMoveDown: () => arrayHelpers.move(index, index + 1),
      }))}
      {!!footer && React.cloneElement(footer, {arrayHelpers})}
    </>)}
  />
}



