import React from "react";
import {CustomArrayHelper, CustomAutocomplete} from "../generic";
import {Utensil} from "../../../../shared-types/models/Utensil";
import {APIService} from "../../../../util/api/APIService";
import {Box} from "@mui/material";
import {UtensilForm} from "../form-layouts/UtensilForm";
import {UtensilSchema} from "../../../../shared-types/schemas/utensil-schema";

type UtensilPickerProps = {
  name: string,
  label?: string,
  index: number,
  arrayHelper: CustomArrayHelper
}

/**
 * @see UtensilienArray
 */
export function UtensilPicker({
                                name,
                                label
                              }: UtensilPickerProps): React.ReactElement {


  return (<CustomAutocomplete<Utensil>
    autoFocus
    size={'small'}
    autoSelect={false}

    name={name}
    idProp={'_id'}
    getLabel={(e) => (e?.utensilName) ? `${e.utensilName}` : ''}
    queryFn={(input?: string) => APIService.search<Utensil>('utensil', {utensilName: input})}

    renderOption={(props, option: Utensil) =>
      <Box component="li" {...props}>
        <b>{option.utensilName}</b>
      </Box>
    }

    label={label}
    newEntryRender={(inputValue) => <UtensilForm input={inputValue}/>}

    newValueDefault={new Utensil()}
    insertFn={(value: Utensil) => APIService.post<Utensil>('utensil', value)}
    validationSchema={UtensilSchema}
  />)

}
