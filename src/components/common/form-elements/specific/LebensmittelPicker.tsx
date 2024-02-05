import React, {useContext} from "react";
import {CustomAutocomplete} from "../generic";
import {Lebensmittel} from "../../../../shared-types/models/Lebensmittel";
import {APIService} from "../../../../util/api/APIService";
import {LebensmittelSchema} from "../../../../shared-types/schemas/lebensmittel-schema";
import {LebensmittelForm} from "../../form-layouts/LebensmittelForm";

import {StateContext} from "../../../../util/state/StateProvider";
import {StateContextType} from "../../../../util/state/types";
import {Box} from "@mui/material";
import {LebensmittelKategorieProperties} from "../../../../shared-types/enum/LebensmittelKategorieProperties";


type LebensmittelPickerProps = {
  name?: string,
  label?: string,
  handleChange: (value: Lebensmittel | null) => void,
  tabIndex?: number
}

/**
 * TS Doc Info
 * @component LebensmittelPicker
 */
export function LebensmittelPicker({
                                     name,
                                     handleChange,
                                     label = 'Lebensmittel wählen',
                                     tabIndex
                                   }: LebensmittelPickerProps): React.ReactElement {

  const {cache: {lebensmittel}, update} = useContext(StateContext) as StateContextType

  function handleOptionsChange(options: Lebensmittel[]) {
    update({
      key: 'lebensmittel',
      data: options
    })
  }



  return (<CustomAutocomplete<Lebensmittel>
    autoFocus
    size={'small'}
    autoSelect={false}
    initialOptions={lebensmittel}
    onOptionsChange={handleOptionsChange}
    tabIndex={tabIndex}

    name={name}
    idProp={'_id'}
    getLabel={(e) => (e?.name) ? `${e.name}` : ''}
    queryFn={(input?: string) => APIService.search<Lebensmittel>('lebensmittel', {name: input})}
    onChange={handleChange}

    renderOption={(props, option: Lebensmittel) =>
      <Box component="li" {...props}>
        <b>{option.kategorie && LebensmittelKategorieProperties[option.kategorie].shortName}</b> {option.name}
        <i>{option.nameDetail && `(${option.nameDetail})`}</i>
      </Box>
    }

    label={label}
    newEntryRender={(inputValue) => <LebensmittelForm input={inputValue}/>}

    newValueDefault={new Lebensmittel()}
    insertFn={(value: Lebensmittel) => APIService.post<Lebensmittel>('lebensmittel', value)}
    validationSchema={LebensmittelSchema}
  />)
}


