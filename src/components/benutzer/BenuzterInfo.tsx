import React from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

import {useAuth} from "../../services/AuthProvider";

export function BenutzerInfo() {
  const {logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (<>
    <h1>Hallo Mark Otto!</h1>
    <h2>Hier kannst du</h2>
    <ul>
      <li>Deine Rezepte sehen</li>
      <li>Deine Daten sehen</li>
      <li>Dein Konto löschen</li>
    </ul>
    <Button onClick={handleLogout}>abmelden</Button>
  </>);
}
