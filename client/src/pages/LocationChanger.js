import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function LocationChanger() {
  let { id } = useParams();
  const [locationObject, setLocationObject] = useState({}); //{} Perchè è un oggetto
  const { authState } = useContext(AuthContext);
  const [img, setImg] = useState();

  useEffect(() => {
    //richiesta per la location in base all'id
    axios.get(`http://localhost:3001/locations/byId/${id}`).then((response) => {
      setLocationObject(response.data);
    });
  }, []);

  const editLocation = (opt) => {
    let cambiamento;
    switch (opt) {
      case "nome":
        cambiamento = prompt("Inserisci il nuovo nome per la location:");
        break;
      case "descrizione":
        cambiamento = prompt("Inserisci la nuova descrizione per la location:");
        break;
      case "indirizzo":
        cambiamento = prompt("Inserisci il nuovo indirizzo per la location:");
        break;
      case "nPosti":
        cambiamento = prompt(
          "Inserisci il nuovo numero di posti per la location:"
        );
        break;
    }
    if (cambiamento) {
      axios
        .put(`http://localhost:3001/locations/cambiamento/${opt}`, {
          cambiamento: cambiamento,
          id: id,
        })
        .then((response) => {
          //con le arentesi quadre opt che sarebbe il nome del cambio che abbiamo cambiato viene utilizzato appunto come nome per il campo da cambiare
          setLocationObject({ ...locationObject, [opt]: cambiamento });
        });
    }
  };
  const uploadImmagine = () => {
    const formData = new FormData();
    formData.append("file", img);
    axios
      .post("http://localhost:3001/locations/uploadImmagine", formData)
      .then((response) => {});
  };
  return (
    <div className="locationChangerPage">
      <div className="leftSide">
        Gestisci la tua location, cliccando su il campo da modificare lo puoi
        fare comodamente:
        <div className="infoLocationDaCambiare">
          <div
            className="cambiaNome"
            onClick={() => {
              editLocation("nome");
            }}
          >
            {locationObject.nome}
          </div>
          <div
            className="cambiaDescrizione"
            onClick={() => {
              editLocation("descrizione");
            }}
          >
            descrizione location:
            {locationObject.descrizione}
          </div>
          <div
            className="cambiaIndirizzo"
            onClick={() => {
              editLocation("indirizzo");
            }}
          >
            Indirizzo:
            {locationObject.indirizzo}
          </div>
          <div
            className="cambiaNPosti"
            onClick={() => {
              editLocation("nPosti");
            }}
          >
            Numero posti disponibili:{locationObject.nPosti}
          </div>{" "}
        </div>
      </div>
      <div className="rightSide">
        Aggiungi le fotografie della location:
        <input
          type="file"
          onChange={(immagine) => setImg(immagine.targetfiles[0])}
        />
        <button onClick={uploadImmagine}>Aggiungi Immagine</button>
      </div>
    </div>
  );
}

export default LocationChanger;
