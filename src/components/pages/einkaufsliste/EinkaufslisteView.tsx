import React from "react";
import {useField, useFormikContext} from "formik";
import {Box, Button} from "@mui/material";

import {APIService} from "../../../util/api/APIService";
import {useDataSync} from "../../../util/hooks/useDataSync";
import {Rezept} from "../../../shared-types/models/Rezept";
import {Zutat} from "../../../shared-types/models/Zutat";
import {ConditionalDisplay} from "../../layout/ConditionalDisplay";
import {CustomTextField} from "../../common/form-elements/generic/CustomTextField";
import {CustomAutocomplete} from "../../common/form-elements/generic/CustomAutocomplete";
import {Lebensmittel} from "../../../shared-types/models/Lebensmittel";
import {LebensmittelForm} from "../admin/forms/LebensmittelForm";
import {LebensmittelSchema} from "../../../shared-types/schemas/lebensmittel-schema";
import {RezeptSchema} from "../../../shared-types/schemas/rezept-schema";
import {CustomSelect} from "../../common/form-elements/generic/CustomSelect";
import {Einheit} from "../../../shared-types/enum";
import {EinheitProperties} from "../../../util/format/enum-properties/EinheitProperties";
import {CustomFileDropper} from "../../common/form-elements/generic/CustomFileDropper";
import {Datei} from "../../../shared-types/models/Datei";


/**
 * DataSync Component
 * @component Einkaufsliste
 */
export function EinkaufslisteView(): React.ReactElement {

  const {isLoading, error, handleSave} = useDataSync<Rezept>({
    defaultValues: new Rezept(),
    contextKey: 'rezeptEdit',
    dispatchFn: (data) => {
      return {key: 'rezeptEdit', data}
    },
    queryKey: 'rezeptEdit',
    queryFn: (param?: string) => APIService.getById<Rezept>('rezept', param),
    validationSchema: RezeptSchema,
  })


  const newZutatValue = {"einheit": "ST", "menge": 1, lebensmittel: new Lebensmittel()} as Zutat


  return (<ConditionalDisplay restricted status={{isLoading, error}}>

{/*    <CustomForm formikProps={formikProps}>
      <>
        <FormControlBar handleSave={handleSave}/>

        <CustomTextField name={`name`} label="Rezeptname" type={'text'}/>
        <CustomTextField name={`schwierigkeitsgrad`} label="schwierigkeitsgrad" type={'number'}/>

        <CustomFieldArray name={'zutaten'}
                          child={<ZutatChild/>}
                          header={<ZutatenHeader/>}
                          newValue={newZutatValue}
        />
      </>
    </CustomForm>*/}

  </ConditionalDisplay>)
}


type ZutatChildProps = {
  name?: string,
  handleDelete?: () => void,
  handleInsert?: () => void,
  handleMoveUp?: () => void,
  handleMoveDown?: () => void,

}

function ZutatChild({
                      name,
                      handleDelete,
                      handleInsert,
                      handleMoveDown,
                      handleMoveUp
                    }: ZutatChildProps): React.ReactElement {
  const [{value}] = useField<Zutat>(name || '')


  return (<Box>
    <CustomTextField name={`${name}[menge]`} label={'Menge'}/>
    <CustomSelect<Einheit>
      name={`${name}[einheit]`}
      label={'Einheit'}
      options={Object.values(Einheit)}
      getLabel={einheit => EinheitProperties[einheit].fullName}
    />

    <CustomFileDropper
      name={'bild'}
      label={'Rezept-Bild'}
      uploadFn={(file: File) => APIService.upload<Datei>('datei', file, 'bild')}
    />


    <CustomAutocomplete<Lebensmittel>
      autoFocus
      size={'medium'}
      autoSelect={true}

      name={`${name}[lebensmittel]`}
      idProp={'_id'}
      getLabel={(e) => e.name}
      queryFn={(input?: string) => APIService.search<Lebensmittel>('lebensmittel', {name: input})}
      onChange={v => (!!handleDelete && !v) ? handleDelete() : {}}

      label="Lebensmittel"
      newEntryFormComponent={<LebensmittelForm/>}
      newValueDefault={new Lebensmittel()}
      insertFn={(value: Lebensmittel) => APIService.post<Lebensmittel>('lebensmittel', value)}
      validationSchema={LebensmittelSchema}
    />

    <Button onClick={handleDelete}>delete</Button>
    <Button onClick={handleInsert}>insert</Button>
    <Button onClick={handleMoveDown}>down</Button>
    <Button onClick={handleMoveUp}>up</Button>
    <pre>{JSON.stringify(value)}</pre>
  </Box>)
}

type ZutatenHeaderProps = {
  handleInsert?: () => void,
}

function ZutatenHeader({handleInsert}: ZutatenHeaderProps): React.ReactElement {
  return <Box><Button onClick={handleInsert}>Add</Button></Box>
}

function FormControlBar({handleSave}: { handleSave: (value: Rezept) => void }): React.ReactElement {
  const {values, handleReset} = useFormikContext<Rezept>();

  return <Box>
    <Button onClick={handleReset}>Reset</Button>
    <Button onClick={() => handleSave(values)}>Save</Button>
    <Button type={'submit'}>Submit</Button>
  </Box>
}

