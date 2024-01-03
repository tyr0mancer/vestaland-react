import React from "react";
import {Grid, Tab, Tabs} from "@mui/material";
import {OverviewForm} from "./OverviewForm";
import {KochschritteForm} from "./KochschritteForm";
import {ControlPanel} from "./ControlPanel";
import {SimpleTabPanel} from "../../layout/SimpleTabPanel";


/**
 * Tab Navigation zwischen übersicht und Kochschritten
 *
 * @component RezeptEditorTabs
 */
export function RezeptEditorTabs(): React.ReactElement {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={7} md={10}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Main"/>
            <Tab label="Anleitung"/>
          </Tabs>
        </Grid>
        <Grid item xs={5} md={2} textAlign={'right'}>
          <ControlPanel/>
        </Grid>
      </Grid>

      <SimpleTabPanel value={value} index={0}>
        <OverviewForm/>
      </SimpleTabPanel>
      <SimpleTabPanel value={value} index={1}>
        <KochschritteForm/>
      </SimpleTabPanel>
    </>
  );
}
