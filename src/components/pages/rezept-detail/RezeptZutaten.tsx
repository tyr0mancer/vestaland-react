import React from "react";
import {Zutat} from "../../../models/zutat.model";
import {Table, TableContainer, TableRow, TableCell, TableBody,} from "@mui/material";

export function RezeptZutaten({zutaten}: { zutaten: Zutat[] }) {

  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          {zutaten.map((row, index) => (
            <TableRow
              key={index}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell align="left">{getLebensmittelName(row)}</TableCell>
              <TableCell align="right">{row.menge}</TableCell>
              <TableCell align="left">{row.einheit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)

}

function getLebensmittelName(zutat: any) {
  if (!zutat.lebensmittel?.nameSingular) return zutat.lebensmittel?.name || 'Eintrag fehlt'
  if (zutat.menge === 1 && zutat.einheit === 'St') return zutat.lebensmittel.nameSingular
  return zutat.lebensmittel?.name || 'Eintrag fehlt'
}
