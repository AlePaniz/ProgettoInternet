import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
//Vogliamo la definizione di tutte le route

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/createevent">Crea Evento</Link>
        <Link to="/">HOME</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createevent" element={<CreateEvent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
