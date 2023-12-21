import React from "react";
import {MainMenu} from "../components/layout/Navbar";
import {Button} from "react-bootstrap";
import {useAuth} from "../services/AuthProvider";
import {useNavigate} from "react-router-dom";

export function Benutzer() {
  const {logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (<>
    <MainMenu/>
    <h1>Aktueller Benutzer</h1>

    <Button onClick={handleLogout}>abmelden</Button>
  </>);
}
