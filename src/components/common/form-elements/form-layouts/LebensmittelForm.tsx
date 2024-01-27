import React, {useEffect} from "react";
import {Box, Paper} from "@mui/material";
import {CustomTextField} from "../generic";
import {useFormikContext} from "formik";
import {Lebensmittel} from "../../../../shared-types/models/Lebensmittel";
import {EinheitPicker} from "../specific";

type LebensmittelFormProps = {
  input?: string
}

/**
 * @see Lebensmittel
 */
export function LebensmittelForm({input}: LebensmittelFormProps): React.ReactElement {
  const {setFieldValue} = useFormikContext<Lebensmittel>()

  useEffect(() => {
    setFieldValue('name', input).then()
  }, [input])


  return (<Paper variant={'outlined'} color={'primary'}>
    <Box mt={2}>
      <CustomTextField
        name={'name'}
        label={'Lebensmittel-Name'}
      />
      <CustomTextField
        name={'nameDetail'}
        label={'Detail-Name'}
      />
      <CustomTextField
        name={'nameSingular'}
        label={'Singular-Name (falls abweichend)'}
      />
      <CustomTextField
        name={'defaultMenge'}
        label={'Default Menge'}
        type={'number'}
      />

      <EinheitPicker name={'defaultEinheit'}/>

      <CustomTextField
        name={'beschreibung'}
        label={'Infotext'}
      />

      <CustomTextField
        name={'density'}
        label={'Dichte'}
        type={'number'}
      />
      <CustomTextField
        name={'unitWeight'}
        label={'Stückgewicht'}
        type={'number'}
      />


      <h1><b>Nährwerte</b></h1>
      <CustomTextField
        name={'nutrients.kalorien'}
        label={'Kalorien'}
        type={'number'}
      />
      <CustomTextField
        name={'nutrients.fett'}
        label={'fett'}
        type={'number'}
      />
      <CustomTextField
        name={'nutrients.proteine'}
        label={'proteine'}
        type={'number'}
      />
      <CustomTextField
        name={'nutrients.kohlenhydrate'}
        label={'kohlenhydrate'}
        type={'number'}
      />
      <CustomTextField
        name={'nutrients.zucker'}
        label={'zucker'}
        type={'number'}
      />
      <CustomTextField
        name={'nutrients.ballaststoffe'}
        label={'ballaststoffe'}
        type={'number'}
      />

    </Box>


  </Paper>)
}
