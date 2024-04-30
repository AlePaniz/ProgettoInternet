import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import * as Yup from "yup";
import { format } from "date-fns";
import axios from "axios";

function CreateEvent() {
  //Valore iniziale degli elementi
  const initialValue = {
    nome: "",
    descrizione: "",
    dataEvento: format(new Date("2000-01-01"), "yyyy-MM-dd"),
  };

  //Per secificare imput validi
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required(),
    descrizione: Yup.string().required(),
    dataEvento: Yup.date().required(),
  });
  //Una volta inviati i dati
  const onSubmit = (values) => {
    axios.post("http://localhost:3001/eventi", values).then((response) => {
      console.log("Ha funzionatos");
    });
  };
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className="createEventPage">
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue }) => (
          <Form>
            <label>Nome evento:</label>
            <ErrorMessage name="nome" component="span" />
            <Field
              autocomplete="off"
              id="inputCreateEvent"
              name="nome"
              placeholder="Nome evento..."
            />
            <label>descrizione:</label>
            <ErrorMessage name="descrizione" component="span" />
            <Field
              autocomplete="off"
              id="inputCreateEvent"
              name="descrizione"
              placeholder="Descrizione evento..."
            />
            <label>data :</label>
            <ErrorMessage name="dataEvento" component="span" />
            <ReactDatePicker
              id="inputCreateEvent"
              name="dataEvento"
              selected={selectedDate}
              onChange={(date) => {
                const formattedDate = format(date, "yyyy-MM-dd");
                setFieldValue("dataEvento", formattedDate);
                setSelectedDate(date);
              }}
            />
            <button type="submit">Crea Evento</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateEvent;
