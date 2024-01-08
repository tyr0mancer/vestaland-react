import React, {useState} from "react";
import {Field, FieldArray, FieldArrayRenderProps, useFormikContext} from "formik";
import {Rezept} from "../../../models/rezept.model";
import Box from "@mui/material/Box";
import {Button, Card, Grid, IconButton, MenuItem, Select, TextField} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {ZutatenForm} from "./ZutatenForm";
import {Zutat} from "../../../models/zutat.model";
import {KochschrittAktionPicker} from "../../common/form-elements/KochschrittAktionPicker";
import {Kochschritt} from "../../../models/kochschritt.model";
import {KochschrittAktion} from "../../../models/kochschritt-aktion.model";
import {CustomFieldProps} from "../../common/form-elements/types";
import {UtensilienForm} from "./UtensilienForm";
import {BetriebsartenProperties} from "../../../util/rezept-helper/enum/betriebsarten";
import {AktionIconImage} from "../../common/formatting/AktionIconImage";

/**
 * TS Doc Info
 * @component KochschritteForm
 *
 * @see KochschrittForm
 */
export function KochschritteForm(): React.ReactElement {
  const formik = useFormikContext<Rezept>()
  const name = 'kochschritte'
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)

  const handleInsert = (arrayHelpers: FieldArrayRenderProps) => {
    arrayHelpers.insert(formik.values.kochschritte.length,
      {zutaten: [new Zutat()], utensilien: []} as Kochschritt
      //new Kochschritt([new Zutat()])
    )
    setSelectedIndex(formik.values.kochschritte.length)
  }
  const handleMoveUp = (arrayHelpers: FieldArrayRenderProps, index: number) => {
    arrayHelpers.move(index, index - 1)
    if (index === selectedIndex)
      setSelectedIndex(index - 1)
    else if (index === selectedIndex + 1)
      setSelectedIndex(index)
  }
  const handleMoveDown = (arrayHelpers: FieldArrayRenderProps, index: number) => {
    arrayHelpers.move(index, index + 1)
    if (index === selectedIndex)
      setSelectedIndex(index + 1)
    else if (index === selectedIndex - 1)
      setSelectedIndex(index)
  }
  const handleDelete = (arrayHelpers: FieldArrayRenderProps, index: number) => {
    arrayHelpers.remove(index)
    setSelectedIndex(-1)
  }

  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <>
          {formik.values.kochschritte.map((kochschritt: Kochschritt, index: number) => (

            <Box key={index} className={'kochschritt-form-box'}>

              {/* Control-Buttons */}
              <IconButton aria-label="delete" onClick={() => handleDelete(arrayHelpers, index)}>
                <RemoveCircleIcon/>
              </IconButton>
              <IconButton aria-label="delete" disabled={index === 0}
                          onClick={() => handleMoveUp(arrayHelpers, index)}>
                <ArrowCircleUpIcon/>
              </IconButton>
              <IconButton aria-label="delete" disabled={index === formik.values.kochschritte.length - 1}
                          onClick={() => handleMoveDown(arrayHelpers, index)}>
                <ArrowCircleDownIcon/>
              </IconButton>

              <IconButton aria-label="edit" disabled={index === selectedIndex}
                          onClick={() => setSelectedIndex(index)}>
                <ModeEditIcon/>
              </IconButton>


              {/* Form or View */}
              {selectedIndex === index &&
                  <KochschrittForm index={index} name={`${name}[${index}]`} values={kochschritt}/>
              }
              {selectedIndex !== index &&
                  <KochschrittView kochschritt={kochschritt}/>
              }

            </Box>
          ))}
          <hr/>
          <Button variant={'contained'} color={'primary'} startIcon={<AddBoxIcon/>}
                  onClick={() => handleInsert(arrayHelpers)}>
            neuer Kochschritt
          </Button>
        </>
      )}
    />
  );
}


/**
 * @component KochschrittForm
 *
 * @see KochschritteForm
 */
function KochschrittForm({values: kochschritt, name}: CustomFieldProps<Kochschritt>) {

  return (<Grid container spacing={2}>

    {/* Zutaten und Utensilien */}
    <Grid item xs={12} md={8}>
      <ZutatenForm name={`${name}[zutaten]`} values={kochschritt.zutaten}/>
      <hr/>
      <UtensilienForm name={`${name}[utensilien]`} values={kochschritt.utensilien}/>
    </Grid>

    {/* Weitere Angaben zum Kochschritt */}
    <Grid item xs={12} md={4}>
      <KochschrittAktionPicker
        name={`${name}[aktion]`} values={kochschritt.aktion || new KochschrittAktion()}/>

      <Box display="flex" justifyContent="space-between" mt={1}>
        <Box flexGrow={1}>
          <Field as={TextField} type="number" variant="outlined" fullWidth
                 size={'small'}
                 name={`${name}[gesamtdauer]`} label="Gesamtdauer (Min)"/>
        </Box>
        <Box flexGrow={1}>
          <Field as={TextField} type="number" variant="outlined" fullWidth
                 size={'small'}
                 name={`${name}[arbeitszeit]`} label="Arbeitszeit (Min)"/>
        </Box>
        <Box flexGrow={1}>
          <Field as={TextField} type="number" variant="outlined" fullWidth
                 size={'small'}
                 name={`${name}[wartezeit]`} label="Wartezeit (Min)"/>
        </Box>
      </Box>

      <Box mt={1}>
        <Field as={TextField} type="text" variant="outlined" mt={2}
               fullWidth
               multiline={true}
               name={`${name}[beschreibung]`} label="Kommentar"/>
      </Box>
      <Box mt={1}>
        <Field as={TextField} type="text" variant="outlined"
               fullWidth
               name={`${name}[videoUrl]`} label="URL"/>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={1}>
        <Box flexGrow={1} mr={1}>
          <Field as={TextField} type="number" variant="outlined"
                 name={`${name}[temperatur]`} label="Temperatur (°C)"/>
        </Box>
        <Box flexGrow={1} mr={1}>

          <Field
            as={Select}
            name={`${name}[betriebsart]`}
            labelId="Betriebsart"
          >
            {Object.entries(BetriebsartenProperties).map(([key, value]) =>
              <MenuItem key={key} value={key}>{value.fullName}</MenuItem>)}
          </Field>

        </Box>
      </Box>

    </Grid>
  </Grid>)
}


function KochschrittView({kochschritt}: { kochschritt: Kochschritt }) {

  return (<Grid container spacing={2}>

    {/* Zutaten und Utensilien */}
    <Grid item xs={12} md={8}>
      {kochschritt.zutaten.filter(z => !!z.lebensmittel).map(({menge, lebensmittel, einheit}, index) =>
        <Card key={index}>
          {menge} {einheit} {lebensmittel?.name}
        </Card>
      )}
      <hr/>
      {kochschritt.utensilien.map(({utensilName, volumen}, index) => <Card key={index}>
        {utensilName} ({volumen} ml)
      </Card>)}
    </Grid>

    {/* Weitere Angaben zum Kochschritt */}
    <Grid item xs={12} md={4}>
      <b><AktionIconImage aktion={kochschritt.aktion?.aktionIcon}/> {kochschritt.aktion?.aktionName}</b>
      <pre>{JSON.stringify(kochschritt.beschreibung, null, 2)}</pre>
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Box flexGrow={1} mr={1}>
          <pre>{kochschritt.temperatur && <>Temperatur: {kochschritt.temperatur} C</>} ({kochschritt.betriebsart})</pre>
        </Box>
      </Box>

      <Box flexGrow={1}>
        <pre>Gesamtdauer: {kochschritt.gesamtdauer}</pre>
        <pre>Arbeitszeit: {kochschritt.arbeitszeit}</pre>
        <pre>Wartezeit: {kochschritt.wartezeit}</pre>
      </Box>

      <Box mt={1}>
        <pre>{JSON.stringify(kochschritt.videoUrl)}</pre>
      </Box>

    </Grid>
  </Grid>)
}
