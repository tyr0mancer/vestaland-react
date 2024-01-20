import React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Paper} from "@mui/material";

import {APIService} from "../../../util/api/APIService";
import {Rezept} from "../../../shared-types/models/Rezept";
import {RezeptSchema} from "../../../shared-types/schemas/rezept-schema";

import {CustomForm} from "../../common/form-elements/generic/CustomForm";
import {ConditionalDisplay} from "../../layout/ConditionalDisplay";

import {MainForm} from "./MainForm";


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

  const localStorageData = (!rezeptId && localStorage.getItem(localStorageKey))
    ? JSON.parse(localStorage.getItem(localStorageKey) || 'null') as Rezept
    : undefined

  const initialValues = rezeptApi ?? localStorageData ?? new Rezept()

  return (<ConditionalDisplay restricted status={{isLoading}}>
    <Paper>
      <CustomForm<Rezept>
        defaultValues={initialValues}
        validationSchema={RezeptSchema}
        contextKey={'rezeptEdit'}
        dispatchFn={value => {
          return {key: 'rezeptEdit', data: value}
        }}
      >
        <MainForm/>
      </CustomForm>
    </Paper>
  </ConditionalDisplay>)
}

