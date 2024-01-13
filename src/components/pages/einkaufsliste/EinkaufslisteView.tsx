import React from "react";
import {FieldArrayRenderProps, Form, Formik, useField, useFormikContext} from "formik";
import {Box, Button} from "@mui/material";

import {APIService} from "../../../util/api/APIService";
import {useDataSync} from "../../../util/state/useDataSync";
import {CacheState} from "../../../util/state/CacheState";
import {Rezept} from "../../../shared-types/models/rezept.model";
import {Zutat} from "../../../shared-types/models/Zutat";
import {RezeptSchema} from "../../../shared-types/models/rezept.schema";
import {StatusWrapper} from "../../common/ui/StatusWrapper";
import {CustomFieldArray} from "../../common/form-elements/CustomFieldArray";
import {CustomTextField} from "../../common/form-elements/CustomTextField";



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

  return (<StatusWrapper dataSync={{isLoading, error}}>

    <Formik<Rezept>
      initialValues={initialValues}
      onSubmit={() => {
      }}
      validate={validateForm}
    >
      {({values}) => {
        return (<Form>
          <ControlBar handleSave={handleSave}/>
          <CacheState payload={{key: 'rezeptEdit', data: values}}/>

          <CustomTextField name={`name`} label="Rezeptname" type={'text'}/>
          <CustomTextField name={`schwierigkeitsgrad`} label="schwierigkeitsgrad" type={'text'}/>

          <CustomFieldArray name={'zutaten'}
                            child={<ZutatChild/>}
                            header={<ZutatenHeader/>}
                            newValue={new Zutat()}
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

    <pre>{JSON.stringify(value)}</pre>
    <Button onClick={handleDelete}>delete</Button>
    <Button onClick={handleInsert}>insert</Button>
    <Button onClick={handleMoveDown}>down</Button>
    <Button onClick={handleMoveUp}>up</Button>
  </Box>)
}

type ZutatenHeaderProps = { arrayHelpers?: FieldArrayRenderProps }

function ZutatenHeader({arrayHelpers}: ZutatenHeaderProps): React.ReactElement {
  return <Box><Button onClick={() => !arrayHelpers ? {} : arrayHelpers.insert(0, new Zutat())}>Add</Button></Box>
}

function ControlBar({handleSave}: { handleSave: (value: Rezept) => void }): React.ReactElement {
  const {values, handleReset} = useFormikContext<Rezept>();

  return <Box>
    <Button onClick={handleReset}>Reset</Button>
    <Button onClick={() => handleSave(values)}>Save</Button>
    <Button type={'submit'}>Submit</Button>
  </Box>
}


