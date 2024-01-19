import React, {useEffect, useState} from "react";
import {Alert, AlertTitle, Box, Button, Grid, Paper, Typography} from "@mui/material";
import {LoginScreen} from "../../layout/ConditionalDisplay/LoginScreen";
import {RegisterType} from "../../../shared-types/schemas/benutzer-schema";
import {RegisterForm} from "./RegisterForm";
import {AuthService} from "../../../util/auth/AuthService";

export function LoginRegister(): React.ReactElement {
  const [registered, setRegistered] = useState(false)
  const [error, setError] = useState<any>(null)


  const handleRegister = (registerInfo: RegisterType) => {
    AuthService.register(registerInfo).then(() => {
      setRegistered(true)
      localStorage.setItem('registered', '1');
      setError(null)
    })
      .catch(error => {
        setError(error.response?.data)
      })
  }

  useEffect(() => {
    const registered = localStorage.getItem('registered')
    if (registered)
      setRegistered(true)
  }, [])

  return (<Paper><Grid container spacing={10}>
    <Grid item xs={12} md={6}>
      <LoginScreen redirect={'/user'}/>
    </Grid>

    <Grid item xs={12} md={6}>
      {error &&
          <Alert severity="error">
              <AlertTitle>{error?.message}</AlertTitle>
            {error?.description}
          </Alert>
      }

      {!registered && <RegisterForm handleRegister={handleRegister}/>}
      {registered && <Box>
          <Typography variant={'h3'}>Vielen Dank für Ihr Interesse!</Typography>
          <Typography variant={'body1'} mt={5}>
              Ihre Registrierungsdaten sind bei uns angekommen.
          </Typography>

          <Typography variant={'body1'} mt={1}>
              Bitte beachten Sie: Vestaland befindet sich noch im Early Access. Sie erhalten eine Nachricht, sobald Ihr
              Account freigeschaltet
              wurde.
          </Typography>

          <Button onClick={() => setRegistered(false)}>OK Cool. Aber ich will noch nen Account!</Button>
      </Box>}
    </Grid>

  </Grid>
  </Paper>)
}
