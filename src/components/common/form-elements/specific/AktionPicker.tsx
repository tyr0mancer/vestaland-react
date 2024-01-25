import React from "react";
import {APIService} from "../../../../util/api/APIService";
import {CustomArrayHelper, CustomAutocomplete} from "../generic";
import {KochschrittAktion} from "../../../../shared-types/models/KochschrittAktion";
import {KochschrittAktionSchema} from "../../../../shared-types/schemas/kochschritt-aktion-schema";
import {KochschrittAktionForm} from "../form-layouts/KochschrittAktionForm";
import {useQuery} from "@tanstack/react-query";
import {ConditionalDisplay} from "../../../layout/ConditionalDisplay";

type AktionenPickerProps = {
  name: string,
  index: number,
  arrayHelper: CustomArrayHelper
}

/**
 * TS Doc Info
 * @component AktionenPicker
 */
export function AktionPicker({
                                 name,
                                 index,
                                 arrayHelper: {handleDelete}
                               }: AktionenPickerProps): React.ReactElement {

  const {data: initialOptions, isLoading, error} = useQuery(
    {
      queryKey: ["aktionen-suche"],
      queryFn: () => APIService.search<KochschrittAktion>('aktion'),
      enabled: true
    });


  function handleChange(aktion: KochschrittAktion | null) {
    if (!aktion?._id)
      handleDelete(index)
  }

  return (<ConditionalDisplay status={{isLoading, error}}>
    <CustomAutocomplete<KochschrittAktion>
      autoFocus
      size={'small'}
      initialOptions={initialOptions}

      name={`${name}`}
      getLabel={(e) => e.aktionName || ''}
      onChange={handleChange}
      autoSelect={false}

      label="Aktion wählen"

      newEntryRender={(inputValue) => <KochschrittAktionForm input={inputValue}/>}
      newValueDefault={new KochschrittAktion()}
      insertFn={(value: KochschrittAktion) => APIService.post<KochschrittAktion>('aktion', value)}
      validationSchema={KochschrittAktionSchema}
    />
  </ConditionalDisplay>)
}
