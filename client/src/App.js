import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import AddLocation from "./pages/AddLocation";
import Location from "./pages/Location";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import axios from "axios";

//Vogliamo la definizione di tutte le route
import { AuthContext } from "./helpers/AuthContext"; //Metto il context nel livello più alto dell'app che sarebbe appunto App.js
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
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
      id: 0,
      status: false,
    });
  };

  return (
    //Passo auhtstate e setauth state "circondando" tutta la mia app con il tag auhtcontext così da renderlo accessibile dappertutto
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to="/">Home</Link>

            {!authState.status ? ( //Se c'è qualcosa in sessione non mi mostrerà più i tasti login e registazione(forzando anche un refresh della pagina)
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registrati</Link>
              </>
            ) : (
              <>
                <Link to="/createevent">Crea Evento</Link>
                <Link to="/addlocation">Aggiungi Location</Link>
                <label id="usernameHome">{authState.username}</label>
                <button onClick={logout}>Logout</button>
              </>
            )}
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createevent" element={<CreateEvent />} />
            <Route path="/addlocation" element={<AddLocation />} />
            <Route path="/location/:id" element={<Location />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
