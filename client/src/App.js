import "./Style.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import AddLocation from "./pages/AddLocation";
import Location from "./pages/Location";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProfilePage from "./pages/ProfilePage";
import PageNotFound from "./pages/PageNotFound";
import ChangePsw from "./pages/ChangePsw";
import LocationChanger from "./pages/LocationChanger";

import axios from "axios";

//Vogliamo la definizione di tutte le route
import { AuthContext } from "./helpers/AuthContext"; //Metto il context nel livello più alto dell'app che sarebbe appunto App.js
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    tipoUtente: "cliente",
    id: 0,
    status: false,
  }); //Per tenere traccia se è stato effettuato il login oppure no

  //Controllo che ci sia un utente loggato:
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/validation", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            tipoUtente: response.data.tipoUtente,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  //Logout una volta cliccato il bottone e impostiamo lo stato di utente loggato a falso (SetAuthState)
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      tipoUtente: "cliente",
      id: 0,
      status: false,
    });
  };

  return (
    //Passo auhtstate e setauth state "circondando" tutta la mia app con il tag auhtcontext così da renderlo accessibile dappertutto
    <>
      <Helmet>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
        <link rel="stylesheet" href="Style.css"/>
      </Helmet>

      <div className="App">
        <AuthContext.Provider value={{ authState, setAuthState }}>
          
          <Router>
            
              <header>
                <img src="./Img/background.jpg" class="img-navbar"/>
                <div className="navbar">
                  <Link to="/">HOME</Link>
                  <Link> SERVIZI</Link>
                  <Link>CHI SIAMO</Link>
                  <Link>CONTATTI</Link>

                  {!authState.status ? ( //Se c'è qualcosa in sessione non mi mostrerà più i tasti login e registazione(forzando anche un refresh della pagina)
                    <>
                      <Link to="/login">Login</Link>
                      <Link to="/registration">Registrati</Link>
                    </>
                  ) : (
                    <>
                      {authState.tipoUtente === "gestore" && (
                        <Link to="/addlocation">Aggiungi Location</Link>
                      )}

                      <button onClick={logout}>Logout</button>
                      <label id="usernameHome">
                        <Link to={`/profilepage/${authState.id}`}>
                          {authState.username}
                        </Link>
                      </label>
                    </>
                  )}

                  <button to="/login" class="btnLogin-popup">LOGIN</button>
                </div>
              </header>
            
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/createevent" element={<CreateEvent />} />
                <Route path="/addlocation" element={<AddLocation />} />
                <Route path="/location/:id" element={<Location />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/profilepage/:id" element={<ProfilePage />} />
                <Route path="/changepsw" element={<ChangePsw />} />
                <Route path="/locationchanger/:id" element={<LocationChanger />} />
                <Route path="/*" element={<PageNotFound />} />
              </Routes>
          </Router>
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;
