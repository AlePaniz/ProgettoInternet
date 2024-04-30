const express = require("express");
const router = express.Router();
const { Eventi } = require("../models");

//Prende tutti gli eventi tramite sequelize
router.get("/", async (req, res) => {
  const listaEventi = await Eventi.findAll();
  res.json(listaEventi);
});

//Inserire dati nel db sfruttando sequelize
router.post("/", async (req, res) => {
  try {
    const evento = req.body;
    await Eventi.create(evento);
    res.json(evento);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
