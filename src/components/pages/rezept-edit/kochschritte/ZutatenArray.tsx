import React from "react";
import {Box, Grid} from "@mui/material";
import {useField} from "formik";

import {
  ZutatPicker,
  LebensmittelPicker
} from "../../../common/form-elements/specific";

import {
  CustomArrayHelper,
  CustomFieldArray
} from "../../../common/form-elements/generic";

import {Zutat} from "../../../../shared-types/models/Zutat";
import {Lebensmittel} from "../../../../shared-types/models/Lebensmittel";
import {Einheit} from "../../../../shared-types/enum";


type ZutatenArrayProps = {
  name: string,
  variant?: 'mobile' | 'desktop'
  tabIndex?: number
}

/**
 * TS Doc Info
 * @component ZutatenArray
 */
export function ZutatenArray({name, variant = 'desktop'}: ZutatenArrayProps): React.ReactElement {
  const newValue = new Zutat()
  const [{value: zutaten}, , {setValue}] = useField<Zutat[]>('zutaten');

  const handleChange = (lebensmittel: Lebensmittel | null, arrayHelper: CustomArrayHelper) => {
    if (!lebensmittel)
      return

    const zutat = new Zutat()
    zutat.lebensmittel = lebensmittel
    zutat.einheit = lebensmittel.defaultEinheit
    if (lebensmittel.defaultMenge)
      zutat.menge = lebensmittel.defaultMenge

    /**
     * Falls rezept.zutaten als erstes definiert wurde
     * @todo check this, might be buggy as frack
     */
    const zutatIndex = zutaten.findIndex(z => z.lebensmittel?._id === lebensmittel._id)
    if (zutatIndex !== -1) {
      zutat.menge = zutaten[zutatIndex].menge || 1
      zutat.einheit = zutaten[zutatIndex].einheit || Einheit.ST
      zutaten.splice(zutatIndex, 1)
      setValue(zutaten).then()
    }

    arrayHelper.handleInsert(undefined, zutat)
  }


  return (<Box mt={2}>

    <CustomFieldArray<Zutat>
      newValue={newValue}
      name={`${name}`}

      renderChild={
        (arrayHelper, index) =>
          <ZutatPicker key={index} name={`${name}[${index}]`} variant={variant} arrayHelper={arrayHelper}
                       index={index}/>
      }

      renderFooter={
        (arrayHelper) =><Box mt={3} borderTop={1} paddingTop={1}>
          <Grid container>

            <Grid item xs={(variant === 'desktop') ? 11 : 12}>
              <LebensmittelPicker
                label={'Lebensmittel hinzufügen'}
                tabIndex={2}
                handleChange={v => handleChange(v, arrayHelper)}/>
            </Grid>
          </Grid>
        </Box>
      }

    />
  </Box>)
}
