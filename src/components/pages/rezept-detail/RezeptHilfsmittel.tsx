import React from "react";
import {Table, TableContainer, TableRow, TableCell, TableBody} from "@mui/material";
import {Hilfsmittel} from "../../../models/hilfsmittel.model";

export function RezeptHilfsmittel({hilfsmittel}: { hilfsmittel: Hilfsmittel[] }) {

  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          {hilfsmittel.map((row, index) => (
            <TableRow
              key={index}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell align="left">{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)

}
