import React from "react";
import {Nutrients} from "../../../shared-types/model/Nutrients";
import {Card, Grid} from "@mui/material";

interface ShowNutrientsProps {
  nutrients?: Nutrients
}

/**
 * TS Doc Info
 * @component ShowNutrients
 */
export function ShowNutrients({nutrients}: ShowNutrientsProps): React.ReactElement {
  type EntryType = { label: string, value: number, score: 'good' | 'bad' | 'ok' }
  if (!nutrients) return (<></>)


  const entries: EntryType[] = [{
    label: "Kalorien",
    value: Math.floor(nutrients.kalorien),
    score: (nutrients.kalorien < 500) ? 'good' : (nutrients.kalorien > 5) ? 'ok' : 'bad'
  }, {
    label: "Proteine",
    value: Math.floor(nutrients.proteine * 10) / 10,
    score: (nutrients.proteine > 10) ? 'good' : (nutrients.proteine > 5) ? 'ok' : 'bad'
  }, {
    label: "Fett",
    value: Math.floor(nutrients.fett * 10) / 10,
    score: (nutrients.fett > 10) ? 'bad' : (nutrients.proteine > 5) ? 'ok' : 'good'
  }, {
    label: "K.hydrate",
    value: Math.floor(nutrients.kohlenhydrate * 10) / 10,
    score: 'ok'
  }, {
    label: "Zucker",
    value: Math.floor(nutrients.zucker * 10) / 10,
    score: (nutrients.zucker > 10) ? 'bad' : (nutrients.zucker > 5) ? 'ok' : 'good'
  }, {
    label: "Ballaststoffe",
    value: Math.floor(nutrients.ballaststoffe * 10) / 10,
    score: 'ok'
  }]

  return (<Grid container spacing={3}>
    {entries.map((e, index) => <Grid item xs={4} md={2} textAlign={'center'} key={index}><Card
      className={`nutrient-score-${e.score}`}><b>{e.value}</b> {e.label}</Card></Grid>)}
  </Grid>)
}
