import React from "react";
import {Grid, Tab, Tabs} from "@mui/material";
import {AllgemeinesFields} from "./allgemeines/AllgemeinesFields";
import {KochschritteFields} from "./kochschritte/KochschritteFields";
import {RezeptEditorControls} from "./RezeptEditorControls";
import {SimpleTabPanel} from "../../common/ui/SimpleTabPanel";
import {Form} from "formik";


/**
 * Top-Level Form Layout
 * Tab Navigation zwischen 'Allgemeines' und 'Kochschritte'
 *
 * @component RezeptEditorForm
 *
 * @see RezeptEditorControls
 * @see AllgemeinesFields
 * @see KochschritteFields
 */
export function RezeptEditorForm(): React.ReactElement {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={7} md={10}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Allgemeines"/>
            <Tab label="Kochschritte"/>
          </Tabs>
        </Grid>
        <Grid item xs={5} md={2} textAlign={'right'}>
          <RezeptEditorControls/>
        </Grid>
      </Grid>

      <SimpleTabPanel value={value} index={0}>
        <AllgemeinesFields/>
      </SimpleTabPanel>
      <SimpleTabPanel value={value} index={1}>
        <KochschritteFields/>
      </SimpleTabPanel>
    </Form>
  );
}
