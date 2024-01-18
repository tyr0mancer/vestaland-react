import React, {useContext, useEffect} from "react";
import {UseDataSyncReturn} from "../../../../util/hooks/useDataSync";
import {Form, Formik, FormikValues} from "formik";
import {useDebounce} from "@react-hooks-library/core";
import {StateContext} from "../../../../util/state/StateProvider";
import {StateContextType} from "../../../../util/state/types";
import {ActionTypes} from "../../../../util/state/reducers";

type CustomFormProps<T> = {
  dataSync: UseDataSyncReturn<T>,
  children: React.ReactElement,
}

/**
 * Formik Form Komponente, die für den useDataSync Hook optimiert ist
 */
export function CustomForm<T extends FormikValues>({
                                                     dataSync: {initialValues, validateForm, dispatchFn},
                                                     children,
                                                   }: CustomFormProps<T>): React.ReactElement {

  return <Formik<T>
    initialValues={initialValues}
    onSubmit={() => {
    }}
    validate={validateForm}
  >
    {({values}) => {
      return (<Form>
        <SneakyCache<T> dispatchFn={dispatchFn} values={values}/>
        {children}
      </Form>)
    }}
  </Formik>
}


export type SneakyCacheProps<T> = Pick<UseDataSyncReturn<T>, 'dispatchFn'> & { values: T }

function SneakyCache<T>({dispatchFn, values}: SneakyCacheProps<T>) {
  const debouncedFormValues = useDebounce<T>(values, 500)
  const {dispatch} = useContext(StateContext) as StateContextType

  useEffect(() => {
    if (!debouncedFormValues || !dispatchFn) return
    const payload = dispatchFn(debouncedFormValues)
    dispatch({type: ActionTypes.UPDATE_CACHE, payload})
  }, [debouncedFormValues])

  return <></>
}
