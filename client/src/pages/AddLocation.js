import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";

function AddLocation() {
  let history = useNavigate();

  const initialValues = {
    nome: "",
    descrizione: "",
    indirizzo: "",
    nPosti: 0,
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required(),
    descrizione: Yup.string().required(),
    indirizzo: Yup.string().required(),
    nPosti: Yup.number().integer(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/locations", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        window.alert("Location aggiunta!!");
        history("/");
      });
  };

  return (
    <>
      <Helmet>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
        <link rel="stylesheet" href="Style.css"/>
      </Helmet>
      <div className="addLocationPage">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="add-location-container">
            <label>Nome:</label>
            <ErrorMessage name="nome" component="span"/>
            <Field
              autoComplete="off"
              id="inputAddLocation"
              name="nome"
              placeholder="Nome location..."
            />
            <label>Descrizione:</label>
            <ErrorMessage name="descrizione" component="span" />
            <Field
              autoComplete="off"
              id="inputAddLocation"
              name="descrizione"
              placeholder="Descrizione location..."
            />
            <label>Indirizzo:</label>
            <ErrorMessage name="indirizzo" component="span" />
            <Field
              autoComplete="off"
              id="inputAddLocation"
              name="indirizzo"
              placeholder="Indirizzo location..."
            />
            <label>Numero di posti disponibili:</label>
            <ErrorMessage name="nPosti" component="span" />
            <Field
              autoComplete="off"
              id="inputAddLocation"
              name="nPosti"
              placeholder="Numero di posti massimo..."
            />
            <button type="submit">Aggiungi Location</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
export default AddLocation;
