import React from "react";
import axios from "axios";
//useEffec ci permette di eseguire una funzione ogni volta che la pagina è rendereizzata
import { useEffect, useState } from "react";

function Home() {
  //Creiamo uno state che contiene una lista per la api request
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    //URL PER L'api Req, facciamo la richiesta degli eventi e aggiungendo then, quindi dopo eseguiamo una funzione
    //All'interno di response ci saranno i dati della richiesta precedente
    axios.get("http://localhost:3001/eventi").then((response) => {
      setEventList(response.data);
    });
  }, []);

  return (
    <div>
      {eventList.map((value, key) => {
        //key=index dell'elemento dell'array mentre value= il valore dell'elemento
        return (
          <div className="eventList">
            <div className="eventTitle">{value.nome}</div>
            <div className="eventDesc">{value.descrizione}</div>
            <div className="eventData">{value.dataEvento}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
