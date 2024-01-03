import {Zutat} from "../../../models/zutat.model";
import {Field, FieldArray, FieldArrayRenderProps, useFormikContext} from "formik";
import {Lebensmittel} from "../../../models/lebensmittel.model";
import React, {useRef} from "react";
import {Button, Card, IconButton, Select, TextField} from "@mui/material";
import {LebensmittelPicker} from "../../form-elements/LebensmittelPicker";
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

//@todo umziehen
export interface ZutatenFormProps<T> {
  name: string;
  values: T;

  //... more optional attributes
}

export function ZutatenForm({name, values: zutaten}: ZutatenFormProps<Zutat[]>) {
  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <div>
          {zutaten.map((zutat: Zutat, index: number) =>
            <ZutatenPicker key={index} index={index} name={`${name}[${index}]`} values={zutat}
                           arrayHelpers={arrayHelpers}/>
          )}
          <hr/>
          <Button variant="contained" onClick={() => arrayHelpers.insert(zutaten.length, new Zutat())}>
            neue Zutat
          </Button>
          <Button variant="contained" onClick={() => arrayHelpers.insert(zutaten.length, new Zutat())}>
            neues Hilfsmittel
          </Button>
        </div>
      )}
    />
  )
}


interface FormComponentProps<T> {
  index: number,
  name: string,
  values: T,
  arrayHelpers: FieldArrayRenderProps
}


function ZutatenPicker({index, name, values, arrayHelpers}: FormComponentProps<Zutat>) {
  const {setFieldValue} = useFormikContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (lebensmittel: Lebensmittel) => {
    if (!lebensmittel?.defaultUnit) return
    await setFieldValue(`${name}[einheit]`, lebensmittel.defaultUnit)

    setTimeout(() => inputRef.current?.select(), 500);
  }


  return (<Card>
    <IconButton
      tabIndex={1}
      aria-label="delete"
      onClick={() => arrayHelpers.remove(index)}
    >
      <DeleteForeverIcon color="warning"/>
    </IconButton>


    <LebensmittelPicker
      onChange={handleChange}
      name={`${name}[lebensmittel]`}
      values={values.lebensmittel || new Lebensmittel()}
    />

    <Field as={Select}
           variant="outlined"
           name={`${name}[einheit]`}
           label="Einheit"
    />
    <Field as={TextField} type="text" variant="outlined"
           inputRef={inputRef}
           name={`${name}[menge]`} label="Menge"/>

    <Button
      startIcon={<SubdirectoryArrowLeftIcon/>}
      variant="outlined"
      onClick={() => arrayHelpers.insert(index + 1, new Zutat())}
    />


    {/*
    <Field as={Button}
           startIcon={<LoginIcon/>}
           label={'+++'}
           tabIndex={3}
           variant="outlined"
           onClick={() => arrayHelpers.insert(index + 1, new Zutat())}
    />*/}


  </Card>)
}
