import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePsw() {
  const [vecchiaPsw, setVecchiaPsw] = useState("");
  const [nuovaPsw, setNuovaPsw] = useState("");
  let history = useNavigate();
  const changePsw = () => {
    axios
      .put(
        `http://localhost:3001/auth/changepsw`,
        { vecchiaPsw: vecchiaPsw, nuovaPsw: nuovaPsw },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Password cambiata con successo");
          history("/");
        }
      });
  };
  return (
    <div className="changePswPage">
      <h1>Cambia la tua Password:</h1>
      <div className="formChange">
        <input
          type="password"
          placeholder="Vecchia Password..."
          onChange={(event) => {
            setVecchiaPsw(event.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="Nuova Password..."
          onChange={(event) => {
            setNuovaPsw(event.target.value);
          }}
        ></input>
        <button onClick={changePsw}>Cambia Password</button>
      </div>
    </div>
  );
}

export default ChangePsw;
