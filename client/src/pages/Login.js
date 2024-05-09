import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext); //Così posso informare del login avvenuto tramite setAuthState
  let history = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        //tramite auhtState posso controllare il login in ogni parte dell'app
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        history("/");
      }
    });
  };
  return (
    <div className="loginPage">
      <h1>Effettua il login al tuo account:</h1>
      <input
        type="text"
        placeholder="Username..."
        autoComplete="off"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      ></input>
      <input
        type="password"
        placeholder="Password..."
        autoComplete="off"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      ></input>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
