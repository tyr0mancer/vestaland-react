import React, {useState} from "react";
import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {useField, useFormikContext} from "formik";
import {lebensmittelSuche} from "../../services/api/lebensmittelService";
import {Lebensmittel} from "../../models/lebensmittel.model";

interface LebensmittelPickerProps {
  name: string;
  values: Lebensmittel;
}

export function LebensmittelPicker({name, values}: LebensmittelPickerProps) {
  const {setFieldValue} = useFormikContext();
  const [field] = useField(name);

  const [open, setOpen] = React.useState(false);
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

  return (<Autocomplete
    {...field}
    id="lebensmittel-picker"
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
        label="Asynchronous"
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

