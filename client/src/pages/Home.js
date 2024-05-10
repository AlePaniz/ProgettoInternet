import React from "react";
import axios from "axios";
//useEffec ci permette di eseguire una funzione ogni volta che la pagina è rendereizzata
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  //Creiamo uno state che contiene una lista per la api request
  const [locationList, setLocationList] = useState([]);
  let history = useNavigate();
  const goToLocation = (idLocation) => {
    if (localStorage.getItem("accessToken")) {
      history(`/location/${idLocation}`);
    } else {
      history("/registration");
    }
  };
  useEffect(() => {
    //URL PER L'api Req, facciamo la richiesta degli eventi e aggiungendo then, quindi dopo eseguiamo una funzione
    //All'interno di response ci saranno i dati della richiesta precedente
    axios.get("http://localhost:3001/locations").then((response) => {
      setLocationList(response.data);
    });
  }, []);

  return (
    <div>
      {locationList.map((value, key) => {
        //key=index dell'elemento dell'array mentre value= il valore dell'elemento
        return (
          <div
            className="locationListItem"
            onClick={() => {
              goToLocation(value.id);
            }}
            key={key}
          >
            <div className="nome">{value.nome}</div>
            <div className="indirizzo">Indirizzo:{value.indirizzo}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
