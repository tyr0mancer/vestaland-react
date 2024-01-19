import React, {useContext, useEffect} from "react";
import {UseDataSyncReturn} from "../../../../util/hooks/useDataSync";
import {Form, Formik, FormikValues} from "formik";
import {useDebounce} from "@react-hooks-library/core";
import {StateContext} from "../../../../util/state/StateProvider";
import {StateContextType} from "../../../../util/state/types";
import {ActionTypes, CachePayloadType} from "../../../../util/state/reducers";


export type CustomFormikProps<F> = {
  initialValues: F,
  validateForm: (value: F) => any
  dispatchFn?: (data: F) => CachePayloadType
}
//Pick<UseDataSyncReturn<T>, 'initialValues' | 'validateForm' | 'dispatchFn'>


type CustomFormProps<T> = {
  formikProps: CustomFormikProps<T>,
  children: React.ReactElement

}


/**
 * Formik Form Komponente, die für den useDataSync Hook optimiert ist
 *
 * @typeParam T - Der Typ des Suchformulars
 */
export function CustomForm<T extends FormikValues>({
                                                     formikProps: {initialValues, validateForm, dispatchFn},
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
        <SneakyDispatcher<T> dispatchFn={dispatchFn} values={values}/>
        {children}
      </Form>)
    }}
  </Formik>
}


export type SneakyCacheProps<T> = Pick<UseDataSyncReturn<T>, 'dispatchFn'> & { values: T }

function SneakyDispatcher<T>({dispatchFn, values}: SneakyCacheProps<T>) {
  const debouncedFormValues = useDebounce<T>(values, 500)
  const {dispatch} = useContext(StateContext) as StateContextType

  useEffect(() => {
    if (!debouncedFormValues || !dispatchFn) return
    const payload = dispatchFn(debouncedFormValues)
    dispatch({type: ActionTypes.UPDATE_CACHE, payload})
  }, [debouncedFormValues])

  return <></>
}
