import React from "react";
import {Table, TableContainer, TableRow, TableCell, TableBody} from "@mui/material";
import {Utensil} from "../../../models/utensil.model";

export function RezeptUtensilien({utensilien}: { utensilien: Utensil[] }) {

  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          {utensilien.map((utensil, index) => (
            <TableRow
              key={index}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell align="left">{utensil.utensilName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)

}
