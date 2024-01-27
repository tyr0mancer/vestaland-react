import React, {useContext, useEffect, useState} from "react";
import {Form, Formik, FormikValues} from "formik";
import {ZodObject} from "zod";

import {StateContext} from "../../../../util/state/StateProvider";
import {StateContextType} from "../../../../util/state/types";
import {ActionTypes, CachePayloadType, CachePayloadTypeKeys} from "../../../../util/state/reducers";
import {validateFormZod} from "../../../../util/format/validateFormZod";
import {useDebounce} from "@react-hooks-library/core";


type CustomFormProps<T> = {
  defaultValues: T,
  validationSchema: ZodObject<any>,
  contextKey: CachePayloadTypeKeys,
  dispatchFn: (data: T) => CachePayloadType,
  onSubmit?: (data: T) => void,
  onChange?: (data: T) => void,
  children: React.ReactElement
}


/**
 * Formik Form Komponente, die für den useDataSync Hook optimiert ist
 *
 * @typeParam T - Der Typ des Suchformulars
 */
export function CustomForm<T extends FormikValues>({
                                                     defaultValues,
                                                     validationSchema,
                                                     dispatchFn,
                                                     contextKey,
                                                     onSubmit = () => {
                                                     },
                                                     onChange,
                                                     children,
                                                   }: CustomFormProps<T>): React.ReactElement {

  const {state: {dataSync}, dispatch} = useContext(StateContext) as StateContextType
  const contextData = contextKey ? dataSync[contextKey] : undefined as T | undefined;
  const initialValues = (contextData ?? defaultValues) as T;

  const [validatedValues, setValidatedValues] = useState<T>()
  const debouncedValues = useDebounce<T | undefined>(validatedValues, 300)

  useEffect(() => {
    if (!debouncedValues) return
    if (onChange)
      onChange(debouncedValues)
    const payload = dispatchFn(debouncedValues)
    dispatch({type: ActionTypes.UPDATE_CACHE, payload})

  }, [debouncedValues])

  const handleValidation = (values: T) => {
    const result = validateFormZod(values, validationSchema)
    if (result)
      return result
    setValidatedValues(values)
  }

  return <Formik<T>
    initialValues={initialValues}
    onSubmit={onSubmit}
    validate={handleValidation}
  >
    {() => {
      return (<Form>
        {children}
      </Form>)
    }}
  </Formik>
}
