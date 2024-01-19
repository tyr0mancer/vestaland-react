import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button, FormGroup,
  Grid, MenuItem, Select,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {useAuth} from "../../../util/auth/AuthProvider";
import {CustomTextField} from "../../common/form-elements/generic/CustomTextField";
import {CustomCheckbox} from "../../common/form-elements/generic/CustomCheckbox";
import {Tags} from "../../../shared-types/enum";
import {Field} from "formik";
import {RefreshOutlined} from "@mui/icons-material";

export function RezeptSucheForm() {
  const {isAuthorized} = useAuth()

  return (<>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>
        <FormGroup>
          <CustomTextField name={'rezeptName'} label={'Rezeptname'}/>
        </FormGroup>
      </Grid>
      <Grid item>
        <Button type="submit" variant="contained" color="primary">
          <RefreshOutlined/>
        </Button>
      </Grid>
    </Grid>

    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant={"body2"}>Detail-Suche</Typography>
      </AccordionSummary>
      <AccordionDetails>

        <Field
          as={Select}
          multiple={true}
          name={"tags"}
          labelId="Tags"
        >
          {Object.entries(Tags).map(([key, value]) =>
            <MenuItem key={key} value={value}>{value}</MenuItem>)}
        </Field>


        {/*
          <CustomSelect<Tags>
            multiple={false}
            name={'tags'}
            label={'Tags'}
            options={Object.values(Tags)}
            getLabel={tag => TagProperties[tag].label}
          />
        */}


        {isAuthorized() &&
            <CustomCheckbox name={'nurEigene'} label={'nur meine eigenen Rezepte'}/>
        }
      </AccordionDetails>
    </Accordion>
  </>)
}
