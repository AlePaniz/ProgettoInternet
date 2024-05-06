import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

function Registration() {
  const initialValues = {
    cognome: "",
    nome: "",
    codFiscale: "",
    indirizzo: "",
    email: "",
    telefono: "",
    tipoUtente: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    cognome: Yup.string().required(),
    nome: Yup.string().required(),
    codFiscale: Yup.string().required(),
    indirizzo: Yup.string().required(),
    email: Yup.string().required(),
    telefono: Yup.string().required(),
    tipoUtente: Yup.string().required(),
    username: Yup.string().required().min(4).max(15),
    password: Yup.string().required().min(4).max(15),
  });
  const onSubmit = (values) => {
    axios.post("http://localhost:3001/auth", values).then((response) => {
      window.alert("Registrazione riuscita!!");
      console.log(values);
    });
  };

  return (
    <div className="registrationPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Nome:</label>
          <ErrorMessage name="nome" component="span" />
          <Field
            autoComplete="off"
            id="regUtente"
            name="nome"
            placeholder="Nome utente..."
          />
          <label>Cognome:</label>
          <ErrorMessage name="cognome" component="span" />
          <Field
            autoComplete="off"
            id="regUtente"
            name="cognome"
            placeholder="Cognome utente..."
          />
          <label>Codice Fiscale:</label>
          <ErrorMessage name="codFiscale" component="span" />
          <Field
            autoComplete="off"
            id="regUtente"
            name="codFiscale"
            placeholder="Codice fiscale..."
          />
          <label>Indirizzo:</label>
          <ErrorMessage name="indirizzo" component="span" />
          <Field
            autoComplete="off"
            id="regUtente"
            name="indirizzo"
            placeholder="Indirizzo..."
          />
          <label>Email:</label>
          <ErrorMessage name="email" component="span" />
          <Field
            autoComplete="off"
            id="regUtente"
            name="email"
            placeholder="Email..."
          />
          <label>Telefono:</label>
          <ErrorMessage name="telefono" component="span" />
          <Field
            autoComplete="off"
            id="regUtente"
            name="telefono"
            placeholder="Telefono..."
          />
          <label>Tipo utente che si vuole registrare:</label>
          <Field
            name="tipoUtente"
            render={({ field }) => (
              <>
                <div className="radio-item">
                  <label htmlFor="cliente">Cliente:</label>
                  <input
                    {...field}
                    id="cliente"
                    value="cliente"
                    checked={field.value === "cliente"}
                    name="tipoUtente"
                    type="radio"
                  />
                </div>

                <div className="radio-item">
                  <label htmlFor="gestore">Gestore di Eventi:</label>
                  <input
                    {...field}
                    id="gestore"
                    value="gestore"
                    name="tipoUtente"
                    checked={field.value === "gestore"}
                    type="radio"
                  />
                </div>
              </>
            )}
          />
          <label>Username:</label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="regUtente"
            name="username"
            placeholder="Username..."
          />
          <label>Passowrd:</label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="regUtente"
            name="password"
            placeholder="Password..."
          />
          <button type="submit">Registrati</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
