import React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {APIService} from "../../../util/api/APIService";
import {Rezept} from "../../../shared-types/models/Rezept";
import {CustomForm} from "../../common/form-elements/generic/CustomForm";
import {RezeptSchema} from "../../../shared-types/schemas/rezept-schema";
import {RezeptEditForm} from "./RezeptEditForm";
import {ConditionalDisplay} from "../../layout/ConditionalDisplay";


/**
 * Rezept Editor
 */
export function RezeptEdit(): React.ReactElement {
  const localStorageKey = 'rezeptEdit'

  const {rezeptId} = useParams();
  const {data: rezeptApi, isLoading} = useQuery(
    {
      queryKey: ["rezept-detail", rezeptId],
      queryFn: () => APIService.getById<Rezept>('rezept', rezeptId),
      enabled: !!rezeptId
    });

  const localStorageData = localStorage.getItem(localStorageKey)
    ? JSON.parse(localStorage.getItem(localStorageKey) || 'null') as Rezept
    : undefined

  const initialValues = rezeptApi ?? localStorageData ?? new Rezept()

  function handleSave(values: Rezept) {
    localStorage.setItem(localStorageKey, JSON.stringify(values || null))
  }

  return (<ConditionalDisplay restricted status={{isLoading}}>
    <CustomForm<Rezept>
      onSubmit={handleSave}
      defaultValues={initialValues}
      validationSchema={RezeptSchema}
      contextKey={'rezeptEdit'}
      dispatchFn={value => {
        return {key: 'rezeptEdit', data: value}
      }}
    >
      <RezeptEditForm/>
    </CustomForm>
  </ConditionalDisplay>)
}

