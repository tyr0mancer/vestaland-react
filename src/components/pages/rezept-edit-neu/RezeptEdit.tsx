import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Paper} from "@mui/material";

import {APIService} from "../../../util/api/APIService";
import {Rezept} from "../../../shared-types/models/Rezept";
import {RezeptSchema} from "../../../shared-types/schemas/rezept-schema";

import {CustomForm} from "../../common/form-elements/generic";
import {ConditionalDisplay} from "../../layout/ConditionalDisplay";

import {MainForm} from "./MainForm";
import {useLocalStorage} from "../../../util/hooks/useLocalStorage";
import {LocalStorageKey} from "../../../util/config/enums";
import {ControlBar} from "./ControlBar";
import {KochschritteArray} from "./kochschritte/KochschritteArray";


/**
 * Rezept Editor
 */
export function RezeptEdit(): React.ReactElement {
  const {rezeptId} = useParams();
  const {data: rezeptApi, isLoading} = useQuery(
    {
      queryKey: ["rezept-detail", rezeptId],
      queryFn: () => APIService.getById<Rezept>('rezept', rezeptId),
      enabled: !!rezeptId
    });

  const [localStorageData] = useLocalStorage<Rezept>(LocalStorageKey.REZEPT_EDIT)

  const initialValues = rezeptApi ?? localStorageData ?? new Rezept()

  const [tabIndex, setTabIndex] = useState(0)

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
        <>
          <ControlBar setTabIndex={setTabIndex} tabIndex={tabIndex}/>

          {(tabIndex === 0) && <MainForm/>}
          {(tabIndex === 1) && <KochschritteArray/>}


        </>
      </CustomForm>
    </Paper>
  </ConditionalDisplay>)
}

