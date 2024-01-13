import React from "react";
import {Form, Formik, useField, useFormikContext} from "formik";
import {Box, Button} from "@mui/material";

import {APIService} from "../../../util/api/APIService";
import {useDataSync} from "../../../util/state/useDataSync";
import {FormCacheState} from "../../../util/state/FormCacheState";
import {Rezept} from "../../../shared-types/model/Rezept";
import {Zutat} from "../../../shared-types/model/Zutat";
import {RezeptSchema} from "../../../shared-types/model/rezept.schema";
import {StatusWrapper} from "../../common/ui/StatusWrapper";
import {CustomFieldArray} from "../../common/form-elements/generic/CustomFieldArray";
import {CustomTextField} from "../../common/form-elements/generic/CustomTextField";
import {CustomAutocomplete} from "../../common/form-elements/generic/CustomAutocomplete";
import {Lebensmittel} from "../../../shared-types/model/Lebensmittel";
import {LebensmittelSchema} from "../../../shared-types/model/lebensmittel.schema";
import {LebensmittelForm} from "../admin/forms/LebensmittelForm";


type EinkaufslisteViewProps = {}

/**
 * DataSync Component
 * @component Einkaufsliste
 */
export function EinkaufslisteView({}: EinkaufslisteViewProps): React.ReactElement {

  const {initialValues, isLoading, error, handleSave, validateForm} = useDataSync<Rezept>({
    defaultValues: new Rezept(),
    contextKey: 'rezeptEdit',
    queryKey: 'rezeptEdit',
    queryFn: (param?: string) => APIService.getById<Rezept>('rezept', param),
    validationSchema: RezeptSchema,
  })

  const newZutatValue = {"einheit": "ST", "menge": 1, lebensmittel: new Lebensmittel()} as Zutat


  return (<StatusWrapper dataSync={{isLoading, error}}>

    <Formik<Rezept>
      initialValues={initialValues}
      onSubmit={() => {
      }}
      validate={validateForm}
    >
      {({values}) => {
        return (<Form>
          <FormControlBar handleSave={handleSave}/>
          <FormCacheState payload={{key: 'rezeptEdit', data: values}}/>

          <CustomTextField name={`name`} label="Rezeptname" type={'text'}/>
          <CustomTextField name={`schwierigkeitsgrad`} label="schwierigkeitsgrad" type={'number'}/>

          <CustomFieldArray name={'zutaten'}
                            child={<ZutatChild/>}
                            header={<ZutatenHeader/>}
                            newValue={newZutatValue}
          />
          <pre>{JSON.stringify(values, null, 1)}</pre>
        </Form>)
      }}
    </Formik>

  </StatusWrapper>)
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
    <CustomTextField name={`${name}[menge]`} type={'email'}/>

    <CustomAutocomplete<Lebensmittel>
      autoFocus
      size={'medium'}
      autoSelect={true}

      name={`${name}[lebensmittel]`}
      idProp={'_id'}
      getLabel={(e) => e.name}
      queryFn={(param?: string) => APIService.search<Lebensmittel>('lebensmittel', {name: param})}
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

