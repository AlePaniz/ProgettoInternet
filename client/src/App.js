import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import AddLocation from "./pages/AddLocation";
//Vogliamo la definizione di tutte le route

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">HOME</Link>
          <Link to="/createevent">Crea Evento</Link>
          <Link to="/addlocation">aggiungi una Location</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createevent" element={<CreateEvent />} />
          <Route path="/addlocation" element={<AddLocation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
