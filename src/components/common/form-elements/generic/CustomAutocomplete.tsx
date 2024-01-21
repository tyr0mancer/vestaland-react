import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {Form, Formik, FormikValues, useField} from "formik";
import {
  Autocomplete,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField
} from "@mui/material";
import {ZodError} from "zod";

import {CustomAutocompleteProps} from "./types";
import {useDebounce} from "@react-hooks-library/core";


/**
 * Custom Autocomplete Form Field, arbeitet mit @tanstack/react-query und formik
 * @example Einfaches Autocomplete
 *     <CustomAutocomplete<Lebensmittel>
 *       name={`${name}[lebensmittel]`}
 *       label="Lebensmittel"
 *       idProp={'_id'}
 *       getLabel={(e) => e.name}
 *       queryKey={'lebensmittel-picker'}
 *       queryFn={(param?: string) => APIService.search<Lebensmittel>('lebensmittel', {name: param})}
 *     />
 *
 * @example Komplexes Autocomplete
 *     <CustomAutocomplete<Lebensmittel>
 *       autoFocus
 *       size={'medium'}
 *       autoSelect={true}
 *
 *       name={`${name}[lebensmittel]`}
 *       label="Lebensmittel"
 *
 *       idProp={'_id'}
 *       getLabel={(e) => e.name}
 *       queryKey={'lebensmittel-picker'}
 *       queryFn={(param?: string) => APIService.search<Lebensmittel>('lebensmittel', {name: param})}
 *       onChange={v => (!!handleDelete && !v) ? handleDelete() : {}}
 *
 *       newEntryRender={(input)=><LebensmittelForm input={input}/>}
 *       newValueDefault={new Lebensmittel()}
 *       insertFn={(value: Lebensmittel) => APIService.post<Lebensmittel>('lebensmittel', value)}
 *       validationSchema={LebensmittelSchema}
 *     />
 *
 * @example
 *     <CustomAutocomplete<Lebensmittel>
 *       autoFocus
 *       size={'medium'}
 *       autoSelect={true}
 *
 *       name={`${name}[lebensmittel]`}
 *       idProp={'_id'}
 *       getLabel={(e) => e.name}
 *       queryKey={'lebensmittel-picker'}
 *       queryFn={(param?: string) => APIService.search<Lebensmittel>('lebensmittel', {name: param})}
 *       onChange={v => (!!handleDelete && !v) ? handleDelete() : {}}
 *
 *       label="Lebensmittel"
 *       newEntryRender={(input)=><LebensmittelForm input={input}/>}
 *       newValueDefault={new Lebensmittel()}
 *       insertFn={(value: Lebensmittel) => APIService.post<Lebensmittel>('lebensmittel', value)}
 *       validationSchema={LebensmittelSchema}
 *     />
 *
 * @component
 */
export function CustomAutocomplete<T extends FormikValues>({
                                                             name,
                                                             label = '',
                                                             getLabel,
                                                             idProp,
                                                             queryFn,
                                                             queryKey,
                                                             onChange,
                                                             size = 'small',
                                                             autoSelect = true,
                                                             autoFocus = false,
                                                             fullWidth = false,

                                                             newEntryRender,
                                                             newValueDefault,
                                                             insertFn,
                                                             validationSchema
                                                           }: CustomAutocompleteProps<T>): React.ReactElement {
  const [field, , {setValue}] = useField(name);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const debouncedInput = useDebounce(inputValue, 500)

  const {
    isLoading,
    data: options
  } = useQuery(
    {
      queryKey: [queryKey, debouncedInput],
      queryFn: queryFn ? () => queryFn(debouncedInput) : undefined,
      enabled: !!debouncedInput && debouncedInput.length > 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  const handleChange = (newValue: T | null) => {
    setValue(newValue).then(() => {
      if (!!onChange)
        onChange(newValue)
    })
  }

  const handleInsert = (value: T) => {
    setModalOpen(false)
    if (!insertFn) return
    console.log(value, 'value')
    insertFn(value).then(val => handleChange(val))
  }

  const validateForm = (values: T) => {
    if (!validationSchema) return
    try {
      validationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  return (<>
    <Autocomplete<T>
      size={size}
      autoSelect={autoSelect}
      fullWidth={fullWidth}


      {...field}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      multiple={false}
      onChange={(e, v) => handleChange(v)}
      isOptionEqualToValue={(option, value) => value && (option[idProp] === value[idProp])}
      getOptionLabel={getLabel}
      options={options || []}
      loading={isLoading}


      noOptionsText={!!newEntryRender ?
        <Button
          onClick={() => setModalOpen(true)}
          color="primary">
          Hinzufügen
        </Button>
        : <></>
      }

      renderInput={(params) => (<TextField
        autoFocus={autoFocus}
        {...params}
        label={label}
        onChange={(e) => setInputValue(e.target.value)}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {isLoading ? <CircularProgress color="inherit" size={20}/> : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}
      />)}
    />


    {newValueDefault && !!newEntryRender &&
        <Dialog open={modalOpen}>
            <DialogTitle>{label}</DialogTitle>
            <Formik<T>
                initialValues={newValueDefault}
                onSubmit={handleInsert}
                validate={validateForm}
            >
              {() => <Form>
                <DialogContent>
                  {newEntryRender(inputValue)}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setModalOpen(false)}>Abbrechen</Button>
                  <Button type={'submit'}>Hinzufügen</Button>
                </DialogActions>
              </Form>}
            </Formik>
        </Dialog>
    }
  </>)
}

