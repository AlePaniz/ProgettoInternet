import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Registration() {
  let history = useNavigate();

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
      history("/login");
      console.log(values);
    });
  };

  return (
    <>
      <Helmet>
          <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
          <link rel="stylesheet" href="Style.css"/>
      </Helmet>
      <div className="registration-box">
        <h1>REGISTRATI</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <div class="input-box">      
              <Field
                autoComplete="off"
                id="regUtente"
                name="nome"
                placeholder="Nome Utente"
              />
              <ErrorMessage class="errore" name="nome" component="span" />   
            </div>
            <div class="input-box">
              <Field
                autoComplete="off"
                id="regUtente"
                name="cognome"
                placeholder="Cognome Utente"
              />
              <ErrorMessage class="errore" name="cognome" component="span" />
            </div>
            <div class="input-box">
              <Field
                autoComplete="off"
                id="regUtente"
                name="codFiscale"
                placeholder="Codice Fiscale"
              />
              <ErrorMessage class="errore" name="codFiscale" component="span" />
            </div>
            <div class="input-box">
              <Field
                autoComplete="off"
                id="regUtente"
                name="indirizzo"
                placeholder="Indirizzo"
              />
              <ErrorMessage class="errore" name="indirizzo" component="span" />
            </div>
            <div class="input-box">
              <Field
                autoComplete="off"
                id="regUtente"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage class="errore" name="email" component="span" />
            </div>
            <div class="input-box">
              <Field
                autoComplete="off"
                id="regUtente"
                name="telefono"
                placeholder="Telefono"
              />
              <ErrorMessage class="errore" name="telefono" component="span" />
            </div>
            <div class="input-box">
              <Field
                autoComplete="off"
                id="regUtente"
                name="username"
                placeholder="Username"
              />
              <ErrorMessage class="errore" name="username" component="span" />
            </div>
            <div class="input-box">
              
              <Field
                autoComplete="off"
                type="password"
                id="regUtente"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage class="errore" name="password" component="span" />
            </div>
            <div class="tipo-utente">
              
            </div>
          
            <label>Tipo utente che si vuole registrare</label>
            <Field
              name="tipoUtente"
              render={({ field }) => (
                <>
                  <div className="radio-item">
                    <input
                      {...field}
                      id="cliente"
                      value="cliente"
                      checked={field.value === "cliente"}
                      name="tipoUtente"
                      type="radio"
                    />
                    <label htmlFor="cliente">    Cliente:</label>
                  </div>

                  <div className="radio-item">
                    <input
                        {...field}
                        id="gestore"
                        value="gestore"
                        name="tipoUtente"
                        checked={field.value === "gestore"}
                        type="radio"
                    />
                    <label htmlFor="gestore"> Gestore di Eventi:</label>
                  </div>
                </>
              )}
            />
            <button class="btn" type="submit">Registrati</button>
          </Form>
        </Formik>
      </div>
    </>
    
  );
}

export default Registration;
