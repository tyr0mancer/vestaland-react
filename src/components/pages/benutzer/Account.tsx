import React from "react";
import {useAuth} from "../../../util/auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import {customConfirm} from "../../common/ui/ConfirmDialog";
import {ApiErrorResponse} from "../../../util/auth/types";
import {Box, Button, Typography} from "@mui/material";
import {AuthService} from "../../../util/api/AuthService";


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

    logout(() => AuthService.logout()).then(() => {
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

