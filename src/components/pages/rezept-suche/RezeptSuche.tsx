import React, {useContext} from 'react';
import {useQuery} from "@tanstack/react-query";

import {StateContext} from "../../../util/state/StateProvider";
import {StateContextType} from "../../../util/state/types";
import {APIService} from "../../../util/api/APIService";
import {Rezept} from "../../../shared-types/models/Rezept";
import {RezeptSucheFormSchema, RezeptSucheFormType, RezeptSucheType} from "../../../shared-types/schemas/rezept-schema";
import {CustomForm} from "../../common/form-elements/generic/CustomForm";
import {ConditionalDisplay} from "../../layout/ConditionalDisplay";
import {RezeptSucheAusgabe} from "./RezeptSucheAusgabe";
import {RezeptSucheForm} from "./RezeptSucheForm";

export function RezeptSuche() {

  const {state: {dataSync: {rezeptSuche}}} = useContext(StateContext) as StateContextType
  const {data, isLoading, error, refetch} = useQuery({
    queryFn: () => APIService.search<Rezept>('rezept', parseForm(rezeptSuche)),
    queryKey: ['rezeptSuche', parseForm(rezeptSuche)],
    enabled: !!rezeptSuche
  })

  return (
    <>
      <CustomForm<RezeptSucheFormType>
        onSubmit={() => refetch()}
        defaultValues={formDefaultValues}
        validationSchema={RezeptSucheFormSchema}
        contextKey={'rezeptSuche'}
        dispatchFn={value => {
          return {key: 'rezeptSuche', data: value}
        }}
      >
        <RezeptSucheForm/>
      </CustomForm>

      <ConditionalDisplay status={{error, isLoading}}>
        <RezeptSucheAusgabe result={data}/>
      </ConditionalDisplay>
    </>
  )
}




const formDefaultValues = {rezeptName: '', tags: [], nurEigene: false, zutaten: []}
const parseForm = (values?: RezeptSucheFormType) => {
  const newParams: RezeptSucheType = {}
  if (!values) return {}
  if (values.rezeptName?.length) newParams["name"] = values.rezeptName // @todo add RegExp here instead of express
  if (values.nurEigene) newParams["nurEigene"] = '1'
  if (values.tags?.length) newParams["tags"] = values.tags.join(',')
  if (values.zutaten?.length) newParams["zutaten"] = values.zutaten.map(z => z.name || '').join(',')
  return newParams
}
