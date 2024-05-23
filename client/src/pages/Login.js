import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Helmet } from "react-helmet";


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
          tipoUtente: response.data.tipoUtente,
          id: response.data.id,
          status: true,
        });
        history("/");
      }
    });
  };
  return (
    <>
      <Helmet>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
        <link rel="stylesheet" href="Style.css"/>
      </Helmet>
        <div className="login-box">
          <form action="">
            <h1>LOGIN</h1>
            <div class="input-box">
              <input 
              type="text" 
              placeholder="Username" 
              autoComplete="off" 
              onChange={(event) => {
                setUsername(event.target.value);
              }}/>
              <i class='bx bxs-user' ></i>
            </div>
            <div class="input-box">
              <input 
              type="password" 
              placeholder="Password" 
              autoComplete="off"
              onChange={(event) => {
                setPassword(event.target.value);
              }}/>
              <i class='bx bxs-lock-alt' ></i>
            </div>
            
            <button class="btn" onClick={login}>Login</button>

            <div class="register-link">
              <p>Non ha un account?  <Link to="/registration">Registrati</Link></p>
            </div>
          </form>
        </div>
    </>
    
  );
}

export default Login;
