import React, {useState} from "react";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField
} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {useField, useFormikContext} from "formik";
import {lebensmittelPostService, lebensmittelSucheService} from "../../services/api/lebensmittelService";
import {Lebensmittel} from "../../models/lebensmittel.model";
import {AddOptionDialog} from "./AddOptionDialog";
import {LebensmittelNeuForm} from "./LebensmittelNeuForm";

interface LebensmittelPickerProps {
  name: string;
  values: Lebensmittel;
  onChange?: (value: Lebensmittel) => void

}

export function LebensmittelPicker({name, values, onChange}: LebensmittelPickerProps) {
  const {setFieldValue} = useFormikContext();
  const [field,] = useField<Lebensmittel>(name);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [input, setInput] = useState('');

  const {
    isLoading,
    data
  } = useQuery(
    {
      queryKey: ["lebensmittel-suche", input],
      queryFn: () => lebensmittelSucheService(input),
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
        style={{flexGrow: 1}} // Lässt das Autocomplete den restlichen Platz einnehmen
        autoSelect={true}

        {...field}
        size={'small'}
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
        initialValues={{name: input} as Lebensmittel}
        mutationFn={lebensmittelPostService}
      >
        <LebensmittelNeuForm open={openModal}/>
      </AddOptionDialog>
    </>
  );
}

