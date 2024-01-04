import {Zutat} from "../../../models/zutat.model";
import {Field, FieldArray, FieldArrayRenderProps, useFormikContext} from "formik";
import {Lebensmittel} from "../../../models/lebensmittel.model";
import React, {useRef} from "react";
import {Box, Button, Card, Grid, IconButton, MenuItem, Select, TextField} from "@mui/material";
import {LebensmittelPicker} from "../../form-elements/LebensmittelPicker";
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MenuIcon from '@mui/icons-material/Menu';
import {EinheitProperties} from "../../../services/einheitenService";

//@todo umziehen
export interface FieldProps<T> {
  name: string;
  values: T;
  index?: number;
}

export function ZutatenForm({name, values: zutaten}: FieldProps<Zutat[]>) {
  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <Box>
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
        </Box>
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
    if (lebensmittel?.defaultEinheit)
      await setFieldValue(`${name}[einheit]`, lebensmittel.defaultEinheit)
    if (lebensmittel?.defaultMenge)
      await setFieldValue(`${name}[menge]`, lebensmittel.defaultMenge)

    // @todo big NO-NO ursache für nebenl. problem finden!!!
    setTimeout(() => inputRef.current?.select(), 500);
  }


  return (<Card style={{paddingTop: 15}}>

    <Grid container>
      <Grid item xs={6} md={6} style={{display: 'flex', alignItems: 'center'}}>
        <IconButton
          tabIndex={1}
          size={'small'}
          aria-label="delete"
          onClick={() => arrayHelpers.remove(index)}
        ><DeleteForeverIcon color="warning"/></IconButton>

        <LebensmittelPicker
          onChange={handleChange}
          name={`${name}[lebensmittel]`}
          values={values.lebensmittel || new Lebensmittel()}
        />
      </Grid>


      {/* Menge und Einheit */}
      <Grid item xs={2} md={2}>
        <Field as={TextField} type="number" variant="outlined"
               size={'small'}
               inputRef={inputRef}
               name={`${name}[menge]`} label="Menge"/>
      </Grid>
      <Grid item xs={3} md={2}>
        <Field as={Select}
               inputProps={{tabIndex: 2}}
               fullWidth
               size={'small'}
               variant="outlined"
               name={`${name}[einheit]`}
               labelId="Einheit"
        >
          {Object.entries(EinheitProperties).map(([key, value]) =>
            <MenuItem dense={true} key={key} value={key}>{value.fullName}</MenuItem>)}
        </Field>
      </Grid>


      <Grid item xs={12} md={1} sx={{display: {xs: 'none', md: 'flex'}}}>
        <IconButton
          size={'small'}
          aria-label="Zutat einfügen"
          onClick={() => arrayHelpers.insert(index + 1, new Zutat())}
        ><SubdirectoryArrowLeftIcon/></IconButton>
      </Grid>

      <Grid item xs={1} md={12} sx={{display: {xs: 'flex', md: 'none'}}}>
        <IconButton
          size={'small'}
          aria-label="Zutat verschieben"

        ><MenuIcon/></IconButton>
      </Grid>


    </Grid>

  </Card>)
}
