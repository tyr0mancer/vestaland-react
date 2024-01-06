import React from "react";
import {useAuth} from "../../../services/auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import {customConfirm} from "../../../services/customConfirm";
import {logoutService} from "../../../services/api/authService";
import {ApiErrorResponse} from "../../../services/auth/types";
import {Box, Button, Typography} from "@mui/material";


/**
 * TS Doc Info
 * @component Account
 */
export function Account(): React.ReactElement {

  const {logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const result = await customConfirm({label: 'Abmelden?'})
    if (!result) return

    logout(() => logoutService()).then(() => {
      navigate('/');
    }).catch((err: ApiErrorResponse) => {
      console.log(err)
    })
  }

  return (<Box mt={2}>
    <Typography variant="h4">Mein Account</Typography>
    <ul>
      <li>Passwort ändern</li>
      <li>Benutzername, Email ändern</li>
      <li>Konto löschen</li>
    </ul>
    <Button onClick={handleLogout}>abmelden</Button>
  </Box>)

}

