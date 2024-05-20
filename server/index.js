const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Middleware per servire file statici dalla cartella 'public'
app.use(express.static("public"));

//Routers
const routerEventi = require("./routes/Eventi");
app.use("/eventi", routerEventi);
const routerLocations = require("./routes/Locations");
app.use("/locations", routerLocations);
const routerRecensioni = require("./routes/Recensioni");
app.use("/recensioni", routerRecensioni);
const routerUtenti = require("./routes/Utenti");
app.use("/auth", routerUtenti);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("SERVER RUNNING O PORT 3001");
  });
});
