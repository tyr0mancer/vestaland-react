import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {useAuth} from "../../services/auth/AuthProvider";
import {loginService} from "../../services/api/authService";
import {useNavigate} from "react-router-dom";

export function LoginForm() {
  const {login, error} = useAuth()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate();

  const handleLogin = (event: any) => {
    event.preventDefault()
    login(() => loginService(username, password)).then(() => {
      navigate('/user');
    }).catch(err => {
      console.log(err)
    })
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }


  return (<>
  <h4>{error && error?.message}</h4>
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Adresse</Form.Label>
        <Form.Control type="email" placeholder="Email eingeben" value={username} onChange={handleEmailChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Passwort</Form.Label>
        <Form.Control type="password" placeholder="Passwort" value={password} onChange={handlePasswordChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </>)
}
