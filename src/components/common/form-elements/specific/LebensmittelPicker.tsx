import React from "react";
import {CustomAutocomplete} from "../generic";
import {Lebensmittel} from "../../../../shared-types/models/Lebensmittel";
import {APIService} from "../../../../util/api/APIService";
import {LebensmittelSchema} from "../../../../shared-types/schemas/lebensmittel-schema";
import {LebensmittelForm} from "../form-layouts/LebensmittelForm";
import {DefaultValues} from "../../../../util/default-values";

type LebensmittelPickerProps = {
  name: string,
  handleChange: (value: Lebensmittel|null) => void
}

/**
 * TS Doc Info
 * @component LebensmittelPicker
 */
export function LebensmittelPicker({name, handleChange}: LebensmittelPickerProps): React.ReactElement {

  return (<CustomAutocomplete<Lebensmittel>
    autoFocus
    size={'small'}
    autoSelect={true}

    name={`${name}`}
    idProp={'_id'}
    getLabel={(e) => e.name}
    queryFn={(input?: string) => APIService.search<Lebensmittel>('lebensmittel', {name: input})}
    onChange={handleChange}

    label="Lebensmittel"
    newEntryRender={(inputValue) => <LebensmittelForm input={inputValue}/>}

    newValueDefault={DefaultValues.lebensmittel}
    insertFn={(value: Lebensmittel) => APIService.post<Lebensmittel>('lebensmittel', value)}
    validationSchema={LebensmittelSchema}
  />)
}


