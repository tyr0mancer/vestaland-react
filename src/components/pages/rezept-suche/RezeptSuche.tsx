import React from 'react';

import {APIService} from "../../../util/api/APIService";
import {useSearchCollection} from "../../../util/hooks/useSearchCollection";
import {CustomTextField} from "../../common/form-elements/generic/CustomTextField";
import {CustomForm} from "../../common/form-elements/generic/CustomForm";

import {Rezept} from "../../../shared-types/models/Rezept";
import {
  RezeptSucheFormType,
  RezeptSucheFormSchema,
  RezeptSucheType
} from "../../../shared-types/schemas/rezept-schema";


export function RezeptSuche() {

  function parseParams(params?: RezeptSucheFormType): RezeptSucheType {
    return {}
  }


  const {formikProps} = useSearchCollection<Rezept, RezeptSucheFormType>({
    contextKey: 'rezeptSuche',
    dispatchFn: (data) => {
      return {key: 'rezeptSuche', data}
    },
    queryFn: (param?: RezeptSucheFormType) => APIService.search<Rezept>('rezept', parseParams(param)),
    enableQuery: (param?: RezeptSucheFormType) => true,
    defaultValues: {name: '', tags: [], nurEigene: false, zutaten: []},
    validationSchema: RezeptSucheFormSchema,
  })

  return (
    <>
      <h1>Suchen</h1>

      <CustomForm<RezeptSucheFormType> formikProps={formikProps}>
        <>
          <CustomTextField name={'name'}/>

        </>
      </CustomForm>
    </>
  )
}


/*
  const dataSync = useDataSync<Rezept>({
    defaultValues: new Rezept(),
    contextKey: 'rezeptEdit',
    dispatchFn: (data) => {
      return {key: 'rezeptEdit', data}
    },
    queryKey: 'rezeptEdit',
    queryFn: (param?: string) => APIService.getById<Rezept>('rezept', param),
    validationSchema: RezeptSchema,
  })
*/
