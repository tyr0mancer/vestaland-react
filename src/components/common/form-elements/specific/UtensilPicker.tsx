import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useField, useFormikContext} from "formik";
import {Autocomplete, Button, CircularProgress, TextField} from "@mui/material";

import {APIService} from "../../../../util/api/APIService";
import {Utensil} from "../../../../shared-types/models/Utensil";
import {CustomFieldProps} from "../types";
import {AddOptionDialog} from "./_AddOptionDialog";
import {UtensilNeuForm} from "./UtensilNeuForm";

export function UtensilPicker({name, values}: CustomFieldProps<Utensil>) {
  const {setFieldValue} = useFormikContext();
  const [field] = useField(name);

  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const [input, setInput] = useState('');
  const handleChange = async (values: Utensil | null) => {
    if (!values) {
      return
    }
    await setFieldValue(name, values)
  }

  const {
    isLoading,
    data
  } = useQuery(
    {
      queryKey: ["utensil-suche", input],
      queryFn: () => APIService.search<Utensil>('utensil', {utensilienName: input}),
      enabled: input.length > 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  return (<>
    <Autocomplete
      {...field}
      id="utensil-picker"
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      size={'small'}
      multiple={false}
      defaultValue={values}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.utensilName}
      options={data || []}
      onChange={(event, newValue) => setFieldValue(name, newValue)}
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
    />
    <AddOptionDialog<Utensil>
      title={'Neues Utensil in DB anlegen'}
      open={openModal} handleClose={() => setOpenModal(false)}
      onAdded={handleChange}
      initialValues={{utensilName: input} as Utensil}
      mutationFn={(utensil) => APIService.post<Utensil>('utensil', utensil)}
    >
      <UtensilNeuForm open={openModal}/>
    </AddOptionDialog>
  </>)
}

APIService.post<Utensil>
