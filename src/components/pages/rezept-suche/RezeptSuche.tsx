import React from 'react';

import {useDataSync} from "../../../util/hooks/useDataSync";
import {CustomForm} from "../../common/form-elements/generic/CustomForm";

import {RezeptSucheSchema, RezeptSucheType} from "../../../shared-types/schemas/rezept-schema";
import {RezeptSucheForm} from './RezeptSucheForm';
import {RezeptSucheAusgabe} from "./RezeptSucheAusgabe";
import {useSearchCollection} from "../../../util/hooks/useSearchCollection";
import {Rezept} from "../../../shared-types/models/Rezept";
import {APIService} from "../../../util/api/APIService";


export function RezeptSuche() {

  const searchCollection = useSearchCollection<Rezept, RezeptSucheType>({
    queryKey: 'rezeptSuche',
    queryFn: (param?: RezeptSucheType) => APIService.search<Rezept>('rezept', param),
    defaultValues: {name: '', tags: [], nurEigene: false, zutaten: []},
    validationSchema: RezeptSucheSchema
  })


  const dataSync = useDataSync<RezeptSucheType>({
    defaultValues: {name: '', tags: [], nurEigene: false, zutaten: []},
    contextKey: 'rezeptSuche',
    dispatchFn: (data) => {
      return {key: 'rezeptSuche', data}
    },
    validationSchema: RezeptSucheSchema,
  })

  return (
    <>
      <h1>Suchen</h1>

      <CustomForm dataSync={dataSync}>
        <>
          <RezeptSucheForm/>
          <RezeptSucheAusgabe/>
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
