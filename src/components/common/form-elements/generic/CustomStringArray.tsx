import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {useField} from "formik";

type CustomStringArrayProps = {
  name: string,
  label?: string
}

export function CustomStringArray({name, label}: CustomStringArrayProps) {
  const [{value = []}, , {setValue}] = useField<string[]>(name)
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Beim Drücken von Enter und wenn das Eingabefeld nicht leer ist
    if (event.key === 'Enter' && inputValue) {
      // Füge den neuen Wert zum Array hinzu, falls er noch nicht vorhanden ist
      if (!value?.includes(inputValue)) {
        setValue([...value, inputValue]).then(() => setInputValue(''))
      }
    }
  };

  const handleDelete = (itemToDelete: string) => async () => {
    await setValue(value.filter((item: string) => item !== itemToDelete))
  };

  return (
    <Stack direction="column" spacing={2}>
      <TextField
        size={'small'}
        label={label}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        variant="outlined"
        fullWidth
      />
      <Stack direction="row" spacing={1}>
        {value?.map((item, index) => (
          <Chip
            key={index}
            label={item}
            onDelete={handleDelete(item)}
            color="primary"
          />
        ))}
      </Stack>
    </Stack>
  );
}
