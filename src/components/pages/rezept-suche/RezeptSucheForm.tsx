import {Field, Form, useFormikContext} from "formik";
import React, {useContext, useEffect} from "react";
import {StateContext} from "../../../services/contexts/StateProvider";
import {ActionTypes, RezeptSucheQuery, StateContextType} from "../../../services/contexts/types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button, Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useDebounce} from "../../../services/use-debounce";
import {useAuth} from "../../../services/auth/AuthProvider";

export function RezeptSucheForm() {
  const formik = useFormikContext<RezeptSucheQuery>();
  const {dispatch} = useContext(StateContext) as StateContextType
  const {isAuthorized} = useAuth()
  const searchQueryDebounced = useDebounce(formik.values, 300)

  useEffect(() => {
    dispatch({type: ActionTypes.SET_REZEPT_SUCHE, payload: searchQueryDebounced})
  }, [searchQueryDebounced, dispatch]);

  return (<Form>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>
        <Field as={TextField} type="text" variant="outlined" fullWidth
               name="rezeptName" label="Rezeptname"/>
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
        <Field
          type="checkbox"
          name="healthy"
          as={FormControlLabel}
          value={true}
          control={<Checkbox checked={formik.values.healthy}/>}
          label="nur gesundes Essen"
        />
        <Field
          type="checkbox"
          name="vegetarisch"
          as={FormControlLabel}
          value={true}
          control={<Checkbox checked={formik.values.vegetarisch}/>}
          label="nur vegetarisches"
        />
        <Field
          type="checkbox"
          name="soulfood"
          as={FormControlLabel}
          value={true}
          control={<Checkbox checked={formik.values.soulfood}/>}
          label="nur Soulfood"
        />

        {isAuthorized() &&
            <Field
                type="checkbox"
                name="myRecipes"
                as={FormControlLabel}
                value={true}
                control={<Checkbox checked={formik.values.myRecipes}/>}
                label="nur meine eigenen Rezepte"
            />
        }
      </AccordionDetails>
    </Accordion>
  </Form>)
}

