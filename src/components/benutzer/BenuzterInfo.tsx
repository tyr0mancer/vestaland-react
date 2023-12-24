import React from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

import {useAuth} from "../../services/auth/AuthProvider";

export function BenutzerInfo() {
  const {logout, authInfo} = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleRefresh = () => {

  }

  return (<>
    <h1>Hallo {authInfo?.name}!</h1>
    <hr/>
    <h4>Hier kannst du</h4>
    <ul>
      <li>Deine Rezepte sehen</li>
      <li>Deine Daten sehen</li>
      <li>Dein Konto löschen</li>
    </ul>
    <Button onClick={handleRefresh}>refresh Token</Button>
    <hr/>
    <Button onClick={handleLogout}>abmelden</Button>
    <hr/>
    <p>{JSON.stringify(authInfo)}</p>
  </>);
}
