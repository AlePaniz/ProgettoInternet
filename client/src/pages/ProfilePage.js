import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  //Id dell'utente passato
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [locationList, setLocationList] = useState([]);
  const { authState } = useContext(AuthContext);
  let history = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/getinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios
      .get(`http://localhost:3001/locations/byIdUtente/${id}`)
      .then((response) => {
        setLocationList(response.data);
      });
  }, []);
  return (
    <div className="paginaProfilo">
      <div className="informazioniUtente">
        <h1>Utente: {username}</h1>
        {authState.username === username && (
          <button onClick={() => history("/changepsw")}>CambiaPassword</button>
        )}
      </div>
      <div className="listaLocation">
        {locationList.map((value, key) => {
          //key=index dell'elemento dell'array mentre value= il valore dell'elemento
          return (
            <div className="locationListItem" key={key}>
              <div className="nome">{value.nome}</div>
              <div className="indirizzo">Indirizzo:{value.indirizzo}</div>
              <div className="descrizione">Descrizione:{value.descrizione}</div>
              <div className="nPosti">
                Numero posti disponibili:{value.nPosti}
              </div>
            </div>
          );
        })}
      </div>
      <div className="listaEventi"></div>
    </div>
  );
}

export default ProfilePage;
