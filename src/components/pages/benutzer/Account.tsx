import React from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";

import {useAuth} from "../../../util/auth/AuthProvider";
import {customConfirm} from "../../common/ui/ConfirmDialog";


/**
 * TS Doc Info
 * @component Account
 */
export function Account(): React.ReactElement {

  const {logout, authInfo} = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const result = await customConfirm({label: 'Abmelden?'})
    if (!result) return
    logout().then(() => navigate('/'))
  }

  return (<Box mt={2}>
    <Typography variant="h6" color="inherit" component="div" sx={{mr: 4}}>
      Angemeldet als {authInfo?.name}
    </Typography>

    <Typography variant="h6">To Do:</Typography>
    <ul>
      <li>Passwort ändern</li>
      <li>Benutzername, Email ändern</li>
      <li>Konto löschen</li>
    </ul>
    <Button onClick={handleLogout}>abmelden</Button>
  </Box>)

}

