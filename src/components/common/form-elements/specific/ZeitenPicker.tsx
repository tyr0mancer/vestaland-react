import React from "react";
import {Box} from "@mui/material";
import {CustomTextField} from "../generic";

type ZeitenPickerProps = {
  name?: string,
  label?: string,
  variant: 'kochschritt' | 'rezept',
  berechneteArbeitszeit?: number,
  berechneteGesamtdauer?: number,
}

/**
 * TS Doc Info
 * @component ZeitenPicker
 */
export function ZeitenPicker({
                               name,
                               variant,
                               berechneteArbeitszeit,
                               berechneteGesamtdauer
                             }: ZeitenPickerProps): React.ReactElement {

  if (variant === 'kochschritt')
    return (<Box mt={2}>
      <div className={'form-group'}>
        <CustomTextField name={`${name}[gesamtdauer]`} label={'Gesamtdauer'} fullWidth type={'number'} />
        <CustomTextField name={`${name}[arbeitszeit]`} label={'Arbeitszeit'} fullWidth type={'number'} />
        <CustomTextField name={`${name}[wartezeit]`} label={'Wartezeit'} fullWidth type={'number'} />

        {/*<CustomSwitch
          name={`${name}[wartenErforderlich]`}
          label={'Warten erforderlich?'}
        />*/}
      </div>
    </Box>)

  return (<Box mt={2}>
    <div className={'form-group'}>
      <CustomTextField name={`realeGesamtdauer`} label={`Reale Gesamtdauer (${berechneteGesamtdauer})`} fullWidth type={'number'} />
      <CustomTextField name={`realeArbeitszeit`} label={`Reale Arbeitszeit (${berechneteArbeitszeit})`} fullWidth type={'number'} />

      <CustomTextField name={`extraPortionGesamtdauer`} label={'Zusätzliche Gesamtdauer / extra Portion'} fullWidth type={'number'} />
      <CustomTextField name={`extraPortionArbeitszeit`} label={'Zusätzliche Arbeitszeit / extra Portion'} fullWidth type={'number'} />
    </div>
  </Box>)
}

