import React from "react";
import {Alert, AlertTitle, Button, FormGroup} from "@mui/material";
import {Form, Formik} from "formik";
import {LoginSchema, LoginType} from "../../../shared-types/schemas/benutzer-schema";
import {validateFormZod} from "../../../util/format/validateFormZod";
import {CustomTextField} from "../../common/form-elements/generic";
import {useAuth} from "../../../util/auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

type LoginScreeProps = {
  redirect?: string
}

export function LoginScreen({redirect}: LoginScreeProps): React.ReactElement {
  const {handleLogin, error} = useAuth()
  const navigate = useNavigate()

  const loginAndRedirect = (loginInfo: LoginType) => {
    handleLogin(loginInfo).then(() => {
      if (redirect)
        navigate(redirect)
    })
  }

  return (<Formik<LoginType>
    initialValues={{username: '', password: ''}}
    onSubmit={loginAndRedirect}
    validate={v => validateFormZod(v, LoginSchema)}
  >
    {() => {
      return (<Form>
        {error &&
            <Alert severity="error">
                <AlertTitle>{error?.message}</AlertTitle>
              {error?.description}
            </Alert>
        }
        <FormGroup>
          <CustomTextField name={'username'} label={'Email Adresse'} type={'email'} autoComplete={'username'}/>
        </FormGroup>
        <FormGroup>
          <CustomTextField name={'password'} label={'Passwort'} type={'password'} autoComplete={'current-password'}/>

          <Button type={'submit'} startIcon={<LoginIcon/>} color={'primary'}
                  variant={'outlined'}>Anmelden</Button>
        </FormGroup>
      </Form>)
    }}
  </Formik>)
}
