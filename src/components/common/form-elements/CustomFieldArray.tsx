import React from "react";
import {FieldArray, useField} from "formik";

type CustomFieldArrayProp<T> = {
  name: string,
  child: React.ReactElement,
  header?: React.ReactElement,
  footer?: React.ReactElement,
  newValue: T
}

/**
 * TS Doc Info
 * @component CustomFieldArray
 */
export function CustomFieldArray<T>({name, child, header, footer, newValue}: CustomFieldArrayProp<T>): React.ReactElement {
  const [{value}] = useField<T[]>(name);
  return <FieldArray
    name={name}
    render={arrayHelpers => (<>
      {!!header && React.cloneElement(header, {arrayHelpers})}
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



