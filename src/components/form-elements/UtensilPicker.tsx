import React, {useState} from "react";
import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import {Utensil} from "../../models/utensil.model";
import {utensilienSucheService} from "../../services/api/utensilService";
import {useQuery} from "@tanstack/react-query";
import {useField, useFormikContext} from "formik";
import {CustomFieldProps} from "./types";

export function UtensilPicker({name, values}: CustomFieldProps<Utensil>) {
  const {setFieldValue} = useFormikContext();
  const [field] = useField(name);

  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState('');

  const {
    isLoading,
    data
  } = useQuery(
    {
      queryKey: ["hilfsmittel-suche", input],
      queryFn: () => utensilienSucheService(input),
      enabled: input.length > 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  return (<Autocomplete
    {...field}
    id="hilfsmittel-picker"
    sx={{width: 300}}
    open={open}
    onOpen={() => {
      setOpen(true);
    }}
    onClose={() => {
      setOpen(false);
    }}
    defaultValue={values}
    isOptionEqualToValue={(option, value) => option.name === value.name}
    getOptionLabel={(option) => option.name}
    options={data || []}
    onChange={(event, newValue) => setFieldValue(name, newValue)}
    loading={isLoading}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Utensilien"
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
  />)
}

