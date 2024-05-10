const express = require("express");
const router = express.Router();
const { Locations } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//Prende tutti le Locations tramite sequelize
router.get("/", async (req, res) => {
  const listaLocations = await Locations.findAll();
  res.json(listaLocations);
});

//Prende  la location che ci interessa  tramite la chiave primaria(id)
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const location = await Locations.findByPk(id);
  res.json(location);
});

//Inserire dati nel db sfruttando sequelize
router.post("/", validateToken, async (req, res) => {
  try {
    const location = req.body;
    location.UtentiId = req.utente.id;
    await Locations.create(location);
    res.json(location);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:locationId", validateToken, async (req, res) => {
  const locationId = req.params.locationId;
  await Locations.destroy({
    where: {
      id: locationId,
    },
  });
  res.send("Elminazione effettuata");
});

module.exports = router;
