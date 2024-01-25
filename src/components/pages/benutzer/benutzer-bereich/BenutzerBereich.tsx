import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Typography} from "@mui/material";
import {LogoutOutlined} from "@mui/icons-material";
import {useAuth} from "../../../../util/auth/AuthProvider";
import {ConditionalDisplay} from "../../../layout/ConditionalDisplay";


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

  return (<ConditionalDisplay restricted>
    <Typography variant={'h2'}>Benutzerbereich</Typography>
    <Button onClick={handleLogout} startIcon={<LogoutOutlined/>} color={'primary'}
            variant={'outlined'}>Abmelden</Button>
  </ConditionalDisplay>)
}
