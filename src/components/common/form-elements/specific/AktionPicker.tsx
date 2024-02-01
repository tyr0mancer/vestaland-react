import React from "react";
import {APIService} from "../../../../util/api/APIService";
import {CustomArrayHelper, CustomAutocomplete} from "../generic";
import {KochschrittAktion} from "../../../../shared-types/models/KochschrittAktion";
import {KochschrittAktionSchema} from "../../../../shared-types/schemas/kochschritt-aktion-schema";
import {KochschrittAktionForm} from "../../form-layouts/KochschrittAktionForm";
import {useQuery} from "@tanstack/react-query";
import {ConditionalDisplay} from "../../../layout/ConditionalDisplay";
import {Box} from "@mui/material";
import {AktionViewer} from "../../viewer/AktionenViewer";

type AktionPickerProps = {
  name: string,
  label?: string,
  index: number,
  arrayHelper: CustomArrayHelper
}

/**
 * @see AktionenArray
 */
export function AktionPicker({
                               name,
                               label = 'Aktion wählen'
                             }: AktionPickerProps): React.ReactElement {

  const {data: initialOptions, isLoading, error} = useQuery(
    {
      queryKey: ["aktionen-suche"],
      queryFn: () => APIService.search<KochschrittAktion>('aktion'),
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: true
    });


  return (<ConditionalDisplay status={{isLoading, error}}>
    <CustomAutocomplete<KochschrittAktion>
      autoFocus
      size={'small'}
      initialOptions={initialOptions}

      name={`${name}`}
      getLabel={(e) => e.aktionName || ''}
      renderOption={(props, aktion: KochschrittAktion) =>
        <Box component="li" {...props}>
          <AktionViewer aktion={aktion}/>
        </Box>

      }

      autoSelect={false}
      label={label}

      newEntryRender={(inputValue) => <KochschrittAktionForm input={inputValue}/>}
      newValueDefault={new KochschrittAktion()}
      insertFn={(value: KochschrittAktion) => APIService.post<KochschrittAktion>('aktion', value)}
      validationSchema={KochschrittAktionSchema}
    />
  </ConditionalDisplay>)
}
