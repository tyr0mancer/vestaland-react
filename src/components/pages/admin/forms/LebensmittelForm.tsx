import React from "react";
import {Einheit} from "../../../../shared-types/enum";
import {CustomTextField} from "../../../common/form-elements/generic/CustomTextField";
import {CustomCheckbox} from "../../../common/form-elements/generic/CustomCheckbox";
import {CustomSelect} from "../../../common/form-elements/generic/CustomSelect";

type LebensmittelFormProps = {}

/**
 * Layout für ein Formular zur Eingabe und Verwaltung von Lebensmitteln
 * Sollte innerhalb eines <Formik></Formik> Blocks sein
 */
export function LebensmittelForm({}: LebensmittelFormProps): React.ReactElement {
  return (<>
    <CustomTextField name={'name'} label={'Lebensmittel-Name'}/>
    <CustomCheckbox name={'publicVisible'} label={'öffentlich'} />

    <CustomSelect<Einheit> name={'einheit'} />

  </>)
}
