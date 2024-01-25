import React from "react";
import {Box, Chip} from "@mui/material";
import {
  CustomTextField,
  CustomFileDropper,
  CustomStringArray,
  CustomSelectMultiple
} from "../../common/form-elements/generic";

import {APIService} from "../../../util/api/APIService";
import {Datei} from "../../../shared-types/models/Datei";
import {ZutatenArray} from "./kochschritte/ZutatenArray";
import {Tags} from "../../../shared-types/enum";
import {TagProperties} from "../../../util/format/enum-properties/TagProperties";
import {CustomSlider} from "../../common/form-elements/generic/CustomSlider";

export function MainForm(): React.ReactElement {

  return (<>


    <Box mt={2}>
      <CustomTextField name={'name'} fastField={true}/>

      <ZutatenArray name={'zutaten'}/>
      <CustomStringArray name={`quelleUrl`} label={'Füge eine Quelle für das Rezept hinzu'}/>

      <CustomSelectMultiple<Tags>
        size={'small'}
        name={`[tags]`}
        label={'Tags auswählen'}
        options={Object.values(Tags)}
        getKey={(tag: Tags) => tag}
        getLabel={(tag: Tags) => <Chip label={TagProperties[tag].label} sx={{bgcolor: TagProperties[tag].color}}/>}
      />

      <CustomSlider
        type="number"
        defaultValue={3} step={1} min={1} max={5}
        marks={[
          {value: 2, label: "leicht"},
          {value: 3, label: "mittel"},
          {value: 4, label: "schwer"},
        ]}
        name="schwierigkeitsgrad" label="Schwierigkeitsgrad"
      />


      <CustomFileDropper
        name={'bild'}
        label={'Rezept-Bild'}
        uploadFn={(file: File) => APIService.upload<Datei>('datei', file, 'bild')}
      />

    </Box>

  </>)
}


