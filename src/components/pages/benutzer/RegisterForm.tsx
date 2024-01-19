import React from "react";
import {Form, Formik} from "formik";
import {RegisterSchema, RegisterType} from "../../../shared-types/schemas/benutzer-schema";
import {validateFormZod} from "../../../util/format/validateFormZod";
import {Button, FormGroup} from "@mui/material";
import {CustomTextField} from "../../common/form-elements/generic/CustomTextField";
import {AppRegistration as AppRegistrationIcon} from "@mui/icons-material";

type RegisterFormProps = {
  handleRegister: (value: RegisterType) => void
}

export function RegisterForm({handleRegister}: RegisterFormProps): React.ReactElement {
  return (<Formik<RegisterType>
    initialValues={{name: '', email: '', password: ''}}
    onSubmit={handleRegister}
    validate={v => validateFormZod(v, RegisterSchema)}
  >
    <Form>
      <FormGroup><CustomTextField name={'name'} label={'Benutzername'}/></FormGroup>
      <FormGroup><CustomTextField name={'email'} label={'E-Mail'}/></FormGroup>
      <FormGroup><CustomTextField name={'password'} label={'Passwort'} type={'password'}/></FormGroup>

      <FormGroup><Button type={'submit'} startIcon={<AppRegistrationIcon/>} color={'primary'}
                         variant={'outlined'}>Registrieren</Button> </FormGroup>
    </Form>
  </Formik>)
}
