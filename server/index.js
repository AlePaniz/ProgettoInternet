const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const routerEventi = require("./routes/Eventi");
app.use("/eventi", routerEventi);
const routerLocations = require("./routes/Locations");
app.use("/locations", routerLocations);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("SERVER RUNNING O PORT 3001");
  });
});
