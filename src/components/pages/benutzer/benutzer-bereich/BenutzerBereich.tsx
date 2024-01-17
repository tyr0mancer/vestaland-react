import React from "react";
import {Box, Button, Typography} from "@mui/material";
import {useAuth} from "../../../../util/auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import {LogoutOutlined} from "@mui/icons-material";


/**
 * TS Doc Info
 * @component BenutzerBereich
 */
export function BenutzerBereich(): React.ReactElement {
  const {logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout().then(() => navigate('/'))
  }

  return (<Box>
    <Typography variant={'h2'}>Benutzerbereich</Typography>
    <Button onClick={handleLogout} startIcon={<LogoutOutlined/>} color={'primary'}
            variant={'outlined'}>Abmelden</Button>
  </Box>)
}
