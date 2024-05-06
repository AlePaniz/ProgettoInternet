import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Location() {
  let { id } = useParams();
  const [locationObject, setLocationObject] = useState({}); //{} Perchè p un oggetto
  const [voto, setVoto] = useState();
  const [recensioni, setRecensioni] = useState([]);
  const [nuovaRecensione, setNuovaRecensione] = useState("");

  useEffect(() => {
    //richiesta per la location in base all'id
    axios.get(`http://localhost:3001/locations/byId/${id}`).then((response) => {
      setLocationObject(response.data);
    });

    //Richiesta per tutte le recensioni in base all'id della location
    axios.get(`http://localhost:3001/recensioni/${id}`).then((response) => {
      setRecensioni(response.data);
    });
  }, []);

  const aggiungiRecensione = () => {
    axios
      .post("http://localhost:3001/recensioni", {
        recBody: nuovaRecensione,
        voto: voto,
        LocationId: id,
      })
      .then((response) => {
        const recDaAggiungere = { recBody: nuovaRecensione, voto: voto };
        setRecensioni([...recensioni, recDaAggiungere]); //Stiamo prendendo l'array e aggiungiamo un elemento in fondo lasciando l'array prima di quello come era
        //Utile per aggiungere in tempo reale le recensioni una volta scritte
        setNuovaRecensione("");
      });
  };
  return (
    <div className="locationPage">
      <div className="leftSide">
        <div className="nome">{locationObject.nome}</div>
        <div className="descrizione">
          descrizione location:
          <br />
          {locationObject.descrizione}
        </div>
        <div className="indirizzo">
          Indirizzo:
          <br />
          {locationObject.indirizzo}
        </div>
        <div className="nPosti">
          Numero posti disponibili:{locationObject.nPosti}
        </div>{" "}
      </div>
      <div className="rightSide">
        Sezione recensioni
        <div className="addTestoRecensione">
          <input
            type="text"
            placeholder="Recensione..."
            autoComplete="off"
            value={nuovaRecensione}
            onChange={(event) => {
              setNuovaRecensione(event.target.value);
            }}
          />
        </div>
        <div className="addVoto">
          <input
            type="radio"
            name="voto"
            value="1"
            onChange={(voto) => setVoto(voto.target.value)}
          />
          1
          <input
            type="radio"
            name="voto"
            value="2"
            onChange={(voto) => setVoto(voto.target.value)}
          />
          2
          <input
            type="radio"
            name="voto"
            value="3"
            onChange={(voto) => setVoto(voto.target.value)}
          />
          3
          <input
            type="radio"
            name="voto"
            value="4"
            onChange={(voto) => setVoto(voto.target.value)}
          />
          4
          <input
            type="radio"
            name="voto"
            value="5"
            onChange={(voto) => setVoto(voto.target.value)}
          />
          5<br />
          <button onClick={aggiungiRecensione}>Aggiungi Recensione</button>
        </div>
        <div className="listaRecensioni">
          {recensioni.map((recensione, key) => {
            return (
              <div key={key} className="recensione">
                {recensione.recBody}
                <br></br>voto:{recensione.voto}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Location;
