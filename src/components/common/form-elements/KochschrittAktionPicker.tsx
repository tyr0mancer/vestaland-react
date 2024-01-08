import React, {useState} from "react";
import {useField, useFormikContext} from "formik";
import {useQuery} from "@tanstack/react-query";
import {Autocomplete, Button, CircularProgress, InputAdornment,  TextField} from "@mui/material";
import {AddOptionDialog} from "./AddOptionDialog";
import {KochschrittAktion} from "../../../shared-types/models/KochschrittAktion";
import {kochschrittConfigFindService, kochschrittConfigPostService} from "../../../util/api/rezeptService";
import {KochschrittAktionNeuForm} from "./KochschrittAktionNeuForm";
import {AktionIconImage} from "../formatting/AktionIconImage";

interface KochschrittAktionPickerProps {
  name: string;
  values: KochschrittAktion;
  onChange?: (value: KochschrittAktion) => void
}

/**
 * TS Doc Info
 * @component KochschrittAktionPicker
 */
export function KochschrittAktionPicker({name, values, onChange}: KochschrittAktionPickerProps) {
  const {setFieldValue} = useFormikContext();
  const [field,] = useField<KochschrittAktion>(name);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [input, setInput] = useState('');

  const {
    isLoading,
    data
  } = useQuery(
    {
      queryKey: ["config-aktion"],
      queryFn: () => kochschrittConfigFindService(''),
      staleTime: 1000 * 60 * 15, // 15 minutes
    });

  const handleChange = async (values: KochschrittAktion | null) => {
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
        id="kochschritt-aktion-picker"
        size={'medium'}
        multiple={false}
        value={values}
        isOptionEqualToValue={(option, value) => option.aktionName === value?.aktionName}
        getOptionLabel={option => option.aktionName}
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
            {...params}
            label="Aktion"
            onChange={(e) => setInput(e.target.value)}

            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? <CircularProgress color="inherit" size={20}/> : null}
                  <InputAdornment position="end">
                    <AktionIconImage aktion={values.aktionIcon}/>
                  </InputAdornment>
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />

      <AddOptionDialog<KochschrittAktion>
        title={'Neue Aktion in DB anlegen'}
        open={openModal} handleClose={() => setOpenModal(false)}
        onAdded={handleChange}
        initialValues={{aktionName: input} as KochschrittAktion}
        mutationFn={kochschrittConfigPostService}
      >
        <KochschrittAktionNeuForm open={openModal}/>
      </AddOptionDialog>
    </>
  );
}


