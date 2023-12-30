import React from "react";
import {useAuth} from "../../../services/auth/AuthProvider";
import {loginService, RegisterUserType} from "../../../services/api/authService";
import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {Alert, AlertTitle, Button, FormGroup, Grid, TextField, Typography} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

type LoginType = {
  username: string,
  password: string
}



export function LoginForm() {
  const {login, error} = useAuth()
  const navigate = useNavigate();

  const handleLogin = ({username, password}: LoginType) => {
    login(() => loginService(username, password)).then(() => {
      navigate('/user');
    }).catch(err => {
      console.log(err)
    })
  }

  const handleRegister = (newUser: RegisterUserType) => {
    console.log(newUser)
    alert('Aktuell keine Registrierung möglich')
    /*login(() => registerService(newUser)).then(() => {
      navigate('/user');
    }).catch(err => {
      console.log(err)
    })*/
  }


  return (<>
    <Grid container spacing={10}>
      <Grid item xs={12} md={6}>
        <Typography variant={"h5"} gutterBottom>Bitte melden Sie sich an:</Typography>
        {error &&
            <Alert severity="error">
                <AlertTitle>{error?.message}</AlertTitle>
              {error?.description}
            </Alert>
        }
        <Formik<LoginType>
          initialValues={{username: '', password: ''}}
          onSubmit={handleLogin}
          enableReinitialize
        >
          <Form>
            <FormGroup>
              <Field as={TextField} type="email" variant="outlined"
                     name="username" label="E-Mail"/>
              <Field as={TextField} type="password" variant="outlined"
                     name="password" label="Password"/>
              <br/>
              <Button type={'submit'} startIcon={<LoginIcon/>} color={'primary'} variant={'outlined'}>Anmelden</Button>
            </FormGroup>
          </Form>
        </Formik>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant={"h5"} gutterBottom>Oder registrieren Sie sich:</Typography>
        <Formik<RegisterUserType>
          initialValues={{name: '', email: '', password: ''}}
          onSubmit={handleRegister}
          enableReinitialize
        >
          <Form>
            <FormGroup>
              <Field as={TextField} type="text" variant="outlined"
                     name="name" label="Benutzername"/>
              <Field as={TextField} type="text" variant="outlined"
                     name="email" label="E-Mail"/>
              <Field as={TextField} type="password" variant="outlined"
                     name="password" label="Password"/>
              <br/>
              <Button type={'submit'} startIcon={<AppRegistrationIcon/>} color={'primary'} variant={'outlined'}>Registrieren</Button>
            </FormGroup>
          </Form>
        </Formik>

      </Grid>
    </Grid>

  </>)
}
