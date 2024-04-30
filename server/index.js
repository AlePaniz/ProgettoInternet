const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const routerEventi = require("./routes/Eventi");
app.use("/eventi", routerEventi);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("SERVER RUNNING O PORT 3001");
  });
});
