const express = require("express");
const router = express.Router();
const { Locations } = require("../models");

//Prende tutti le Locations tramite sequelize
router.get("/", async (req, res) => {
  const listaLocations = await Locations.findAll();
  res.json(listaLocations);
});

//Inserire dati nel db sfruttando sequelize
router.post("/", async (req, res) => {
  try {
    const location = req.body;
    await Locations.create(location);
    res.json(location);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
