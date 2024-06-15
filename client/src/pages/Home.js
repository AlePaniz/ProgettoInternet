import React from "react";
import axios from "axios";
//useEffec ci permette di eseguire una funzione ogni volta che la pagina è rendereizzata
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import sfondo from "../Img/copertina.jpg";

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
    <>
      <Helmet>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
        <link rel="stylesheet" href="Style.css"/>
      </Helmet>

      
      <div className="container">
        <div className="background-container">
          <h1 className="titolo">Dream Events</h1>
          <img src={sfondo} className="img-copertina" /> 
        </div>
        <div className="center-content">
          <br/><br/><h1 className="testo1">Agenzia Dream Events</h1><br/>
          <h2 className="testo2">Creiamo Momenti Indimenticabili per Ogni Occasione Speciale</h2><br/>
          <h3 className="testo3">Benvenuti a Eventi da Sogno, la tua agenzia di eventi di fiducia. Specializzati nell'organizzazione di matrimoni, comunioni, cresime, compleanni e molto altro, siamo qui per trasformare ogni occasione in un ricordo prezioso. Con un team di esperti appassionati e creativi, ci occupiamo di ogni dettaglio, dalla pianificazione alla realizzazione, garantendo che ogni evento sia unico e perfetto. Collaboriamo con i migliori fornitori e location per offrire soluzioni su misura che soddisfano le vostre esigenze e superano le vostre aspettative. Affidati a noi per vivere momenti da sogno che rimarranno nel cuore per sempre.</h3>
        </div>
        <div>
          <h1 className="testo1">Le Nostre Location</h1>
          {locationList.map((value, key) => {
            //key=index dell'elemento dell'array mentre value= il valore dell'elemento
            return (
              <div
                className="location_container_item"
                onClick={() => {
                  goToLocation(value.id);
                }}
                key={key}
              >
                <div className="item_location">
                  <div className="testo_item">{value.nome}</div>
                  <div className="testo_item">{value.indirizzo}</div>
                </div>
              </div>

              
            );
          })}
        </div> 
      </div>     
    </>
  );
}

export default Home;
