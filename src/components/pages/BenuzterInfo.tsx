import React from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

import {useAuth} from "../../services/auth/AuthProvider";
import {ApiErrorResponse} from "../../services/auth/types";
import {logoutService} from "../../services/api/authService";

export function BenutzerInfo() {
  const {logout, authInfo} = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    logout(() => logoutService()).then(() => {
      navigate('/');
    }).catch((err: ApiErrorResponse) => {
      console.log(err)
    })

  }

  return (<>
    <h1>Hallo {authInfo?.name}!</h1>
    <hr/>
    <h4>Hier kannst du</h4>
    <ul>
      <li>Deine Daten</li>
      <li>Deine Rezepte</li>
      <li>Konto löschen</li>
    </ul>
    <hr/>
    <Button onClick={handleLogout}>abmelden</Button>
  </>);
}
