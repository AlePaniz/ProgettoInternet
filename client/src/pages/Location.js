import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Location() {
  let { id } = useParams();
  const [locationObject, setLocationObject] = useState({}); //{} Perchè p un oggetto
  useEffect(() => {
    axios.get(`http://localhost:3001/locations/byId/${id}`).then((response) => {
      setLocationObject(response.data);
    });
  }, []);
  return (
    <div className="locationPage">
      <div className="leftSide">
        <div className="nome">{locationObject.nome}</div>
        <div className="descrizione">
          descrizione location:{locationObject.descrizione}
        </div>
        <div className="indirizzo">Indirizzo:{locationObject.indirizzo}</div>
        <div className="nPosti">
          Numero posti disponibili:{locationObject.nPosti}
        </div>{" "}
      </div>
      <div className="rightSide">Sezione recensioni</div>
    </div>
  );
}

export default Location;
