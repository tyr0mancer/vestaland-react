import React, {useEffect} from "react";
import {Box, Grid} from "@mui/material";

import {APIService} from "../../../util/api/APIService";
import {Datei} from "../../../shared-types/models/Datei";

import {
  CustomTextField,
  CustomFileDropper,
  CustomStringArray,
  CustomSlider
} from "../../common/form-elements/generic";

import {
  TagsPicker, ZeitenPicker
} from "../../common/form-elements/specific";
import {useFormikContext} from "formik";
import {Rezept} from "../../../shared-types/models/Rezept";
import {getKochschrittSummary} from "../../../util/format/array-reducer/kochschritt-reducer";
import {ShowNutrients} from "../../common/viewer/ShowNutrients";
import {ShowZutaten} from "../../common/viewer/ShowZutaten";
import {ShowUtensilien} from "../../common/viewer/ShowUtensilien";


/**
 *
 * @see Rezept
 * @see KochschrittForm
 */
export function MainForm(): React.ReactElement {

  const {values, setFieldValue} = useFormikContext<Rezept>()

  useEffect(() => {
    reduceForm().then()
  }, [])


  const reduceForm = async () => {
    if (!values) return
    const summary = getKochschrittSummary(values.kochschritte)
    await setFieldValue('utensilien', summary.utensilien)
    await setFieldValue('nutrients', summary.nutrients)
    await setFieldValue('zutaten', summary.zutaten)
    await setFieldValue('berechneteArbeitszeit', summary.berechneteArbeitszeit)
    await setFieldValue('berechneteGesamtdauer', summary.berechneteGesamtdauer)
  }


  return (<Box mt={2}>
    <Grid container spacing={1}>

      {/* Rezept-Bild */}
      <Grid item xs={12} md={4}>
        <CustomFileDropper
          name={'bild'}
          label={'Rezept-Bild'}
          uploadFn={(file: File) => APIService.upload<Datei>('datei', file, 'bild')}
        />
      </Grid>

      {/* Name und Beschreibung */}
      <Grid item xs={12} md={4}>
        <div className={'form-group'}>
          <CustomTextField name={'name'} label={'Rezeptname'} fastField fullWidth/>
        </div>
        <div className={'form-group'}>
          <CustomTextField name={'beschreibung'} label={'Kurzer Infotext'} minRows={3} fastField multiline fullWidth/>
        </div>
      </Grid>

      {/* Schwierigkeitsgrad, Tags, Quellen */}
      <Grid item xs={12} md={4}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <div className={'form-group'}>
              <CustomTextField name={'portionen'} label={'Portionen'} type={'number'}/>
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className={'form-group'}>
              <CustomSlider name={'[schwierigkeitsgrad]'} type={'difficulty'}/>
            </div>
          </Grid>
        </Grid>
        <div className={'form-group'}>
          <TagsPicker name={'[tags]'}/>
        </div>
        <div className={'form-group'}>
          <CustomStringArray name={`quelleUrl`} label={'Links zu weiteren Infos und Quellen'}/>
        </div>
      </Grid>

      {/* Zeiten */}
      <Grid item xs={12} md={4}>
        <ZeitenPicker variant={'rezept'} berechneteArbeitszeit={values.berechneteArbeitszeit} berechneteGesamtdauer={values.berechneteGesamtdauer}/>
      </Grid>

      {/* Zutaten (reduced) */}
      <Grid item xs={12} md={4}>
        <ShowZutaten zutaten={values.zutaten}/>
      </Grid>

      {/* Utensilien (reduced) */}
      <Grid item xs={12} md={4}>
        <ShowUtensilien utensilien={values.utensilien} />
      </Grid>
    </Grid>

      {/* Nährwerte (reduced) */}
      <Box mt={2}>
        <ShowNutrients nutrients={values.nutrients}/>
      </Box>

      {/* Freitext */}
      <Box mt={2} mb={5}>
        <CustomTextField name={'freitext'} label={'Freitext (optional)'}  multiline minRows={5} fastField fullWidth/>
      </Box>

    <hr/>

  </Box>)
}

