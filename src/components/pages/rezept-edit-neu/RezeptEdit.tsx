import React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {APIService} from "../../../util/api/APIService";
import {Rezept} from "../../../shared-types/models/Rezept";
import {CustomForm} from "../../common/form-elements/generic/CustomForm";
import {RezeptSchema} from "../../../shared-types/schemas/rezept-schema";
import {RezeptEditForm} from "./RezeptEditForm";
import {ConditionalDisplay} from "../../layout/ConditionalDisplay";
import {customConfirm} from "../../common/ui/ConfirmDialog";
import {Paper} from "@mui/material";


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

  const handlePublish = (values: Rezept) => {
    customConfirm({
      label: 'veröffentlichen?'
    }).then(() => {
      APIService.post<Rezept>('rezept', values).then(res => {
        console.log(res)
      })
    })
  }

  return (<ConditionalDisplay restricted status={{isLoading}}>
    <Paper>
      <CustomForm<Rezept>
        onSubmit={handlePublish}
        defaultValues={initialValues}
        validationSchema={RezeptSchema}
        contextKey={'rezeptEdit'}
        dispatchFn={value => {
          return {key: 'rezeptEdit', data: value}
        }}
      >
        <RezeptEditForm/>
      </CustomForm>
    </Paper>
  </ConditionalDisplay>)
}

