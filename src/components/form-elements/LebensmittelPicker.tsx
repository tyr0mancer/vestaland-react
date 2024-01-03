import React, {useEffect, useRef, useState} from "react";
import {
  Autocomplete,
  Button,
  CircularProgress, MenuItem, Select,
  TextField
} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {Field, useField, useFormikContext} from "formik";
import {lebensmittelPostService, lebensmittelSuche} from "../../services/api/lebensmittelService";
import {Lebensmittel} from "../../models/lebensmittel.model";
import {AddOptionDialog} from "./AddOptionDialog";

interface LebensmittelPickerProps {
  name: string;
  values: Lebensmittel;
  onChange: (value: Lebensmittel) => void

}

export function LebensmittelPicker({name, values, onChange}: LebensmittelPickerProps) {
  const {setFieldValue} = useFormikContext();
  const [field, ] = useField<Lebensmittel>(name);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [input, setInput] = useState('');

  const {
    isLoading,
    data
  } = useQuery(
    {
      queryKey: ["lebensmittel-suche", input],
      queryFn: () => lebensmittelSuche(input),
      enabled: input.length > 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  const getOptionLabel = (option: Lebensmittel) => option.nameDetail || option.name

  const handleChange = async (values: Lebensmittel | null) => {
    if (!values) {
      return
    }
    await setFieldValue(name, values)
    if (onChange)
      onChange(values)
  }

  return (<>
      <Autocomplete
        {...field}
        id="lebensmittel-picker"
        sx={{width: 300}}

        multiple={false}
        value={values}
        isOptionEqualToValue={(option, value) => option.name === value?.name}
        getOptionLabel={getOptionLabel}
        options={data || []}
        onChange={(event, newValue) => handleChange(newValue)}
        loading={isLoading}
        noOptionsText={
          <Button
            onClick={() => setOpenModal(true)}
            color="primary">
            Hinzufügen
          </Button>
        }

        renderInput={(params) => (
          <TextField
            autoFocus
            {...params}
            label="Lebensmittel"
            onChange={(e) => setInput(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? <CircularProgress color="inherit" size={20}/> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />

      <AddOptionDialog<Lebensmittel>
        title={'Neues Lebensmittel in DB anlegen'}
        open={openModal} handleClose={() => setOpenModal(false)}
        onAdded={handleChange}
        initialValues={new Lebensmittel(input)}
        mutationFn={lebensmittelPostService}
      >
        <LebensmittelNeuForm open={openModal}/>
      </AddOptionDialog>
    </>
  );
}

function LebensmittelNeuForm({open}: { open: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open)
      inputRef.current?.select()
  }, [open])

  return (
    <>
      <Field as={TextField} type="text" variant="outlined"
             inputRef={inputRef}
             name="name" label="Lebensmittel Name"/>
      <Field
        as={Select}
        name="defaultUnit"
        labelId="Standard Einheit"
      >
        <MenuItem value={"St"}>Stück</MenuItem>
        <MenuItem value={"ml"}>Milliliter</MenuItem>
        <MenuItem value={"g"}>Gram</MenuItem>
      </Field>
    </>)
}


/*
public kategorie?: string
public name: string = ""
public nameDetail?: string
public nameSingular?: string
public beschreibung?: string
public defaultUnit: string = "St"

// Gramm pro Kubikzentimeter bzw kg pro Liter
// Beispiel: Mehl hat eine Dichte von 0.7 - das heißt das ein kg Mehl etwa 1,5 L Volumen haben, oder 1 L Mehl, etwa 0,7 kg wiegt.
public density?: number
public unitWeight?: number*/
