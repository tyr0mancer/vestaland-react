import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useAuth} from "../../../util/auth/AuthProvider";
import {CustomTextField} from "../../common/form-elements/generic/CustomTextField";
import {CustomCheckbox} from "../../common/form-elements/generic/CustomCheckbox";

export function RezeptSucheForm() {
  const {isAuthorized} = useAuth()

  return (<>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>
        <CustomTextField name={'name'} label={'Rezeptname'}/>
      </Grid>
      <Grid item>
        <Button type="submit" variant="contained" color="primary">
          Suchen
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
        {isAuthorized() &&
            <CustomCheckbox name={'nurEigene'} label={'nur meine eigenen Rezepte'}/>
        }
      </AccordionDetails>
    </Accordion>
  </>)
}

