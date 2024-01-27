import React, {useEffect, useState} from "react";
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
  TextField, IconButton, Tooltip
} from "@mui/material";
import {
  PostAdd as AddIcon
} from '@mui/icons-material';

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
                                                             idProp = '_id',
                                                             queryFn,
                                                             queryKey,
                                                             onChange,
                                                             size = 'small',
                                                             autoSelect = false,
                                                             autoFocus = false,
                                                             fullWidth = false,
                                                             initialOptions,
                                                             newEntryRender,
                                                             newValueDefault,
                                                             insertFn,
                                                             validationSchema,
                                                             onOptionsChange,
                                                             tabIndex,
                                                             renderOption,
                                                             openOnFocus = false
                                                           }: CustomAutocompleteProps<T>): React.ReactElement {
  const [field, , {setValue}] = name
    ? useField(name)
    : [{value: null}, null, {
      setValue: (val: T | null) => new Promise(res => res(val))
    }]

  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [inputValue, setInputValue] = useState('');
  const debouncedInput = useDebounce(inputValue, 500)

  /**
   * Optionen für das Autocomplete Formular
   */
  const [options, setOptions] = useState<T[]>(initialOptions ?? []);

  const {
    isLoading,
    data
  } = useQuery(
    {
      queryKey: [queryKey, debouncedInput],
      queryFn: queryFn ? () => queryFn(debouncedInput) : () => [],
      enabled: !!debouncedInput && debouncedInput.length > 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  useEffect(() => {
    if (!data) return
    const idArray = data.filter(d => d[idProp]).map(d => d[idProp])

    const newOptions = options
      .filter(o => !(!o[idProp] || idArray.includes(o[idProp])))
      .concat(data)

    if (onOptionsChange)
      onOptionsChange(newOptions)

    setOptions(newOptions)
  }, [data])


  const handleChange = (newValue: T | null) => {
    setValue(newValue).then(() => {
      if (!!onChange)
        onChange(newValue)
    })
  }

  const handleInsert = (value: T) => {
    setModalOpen(false)
    if (!insertFn) return
    insertFn(value).then(newValue => {
      setOptions([...options, newValue])
      handleChange(newValue)
    })
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
      {...field}
      value={field.value || null}

      size={size}
      autoSelect={autoSelect}
      fullWidth={fullWidth}

      clearText={'Eintrag entfernen'}
      closeText={'schließen'}
      openText={'öffnen'}


      openOnFocus={openOnFocus}
      handleHomeEndKeys={false}
      multiple={false}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(e, v) => handleChange(v)}
      isOptionEqualToValue={(option, value) => !value[idProp] || (option[idProp] === value[idProp])}

      getOptionLabel={getLabel}
      /* getOptionKey={option => option["idProp"]} */

      options={options}
      loading={isLoading}

      clearOnBlur={true}
      blurOnSelect={true}

      renderOption={renderOption}

      renderInput={(params) => (<TextField
        autoFocus={autoFocus}
        {...params}
        label={label}
        onChange={(e) => setInputValue(e.target.value)}
        InputProps={{
          tabIndex: tabIndex,
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {isLoading &&
                  <CircularProgress color="inherit" size={20}/>
              }
              {newEntryRender &&
                  <Tooltip title={'Neue Option für dieses Feld anlegen'}>
                      <IconButton
                          onClick={() => setModalOpen(true)}
                          color="primary"
                      ><AddIcon/></IconButton>
                  </Tooltip>
              }
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}
      />)}
    />

    {newValueDefault && !!newEntryRender &&
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
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

