const express = require("express");
const router = express.Router();
const { Eventi } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//Prende tutti gli eventi per la location dove siamo tramite sequelize
router.get("/byId/:locationId", async (req, res) => {
  const locationId = req.params.locationId;
  const evento = await Eventi.findAll({
    where: { LocationId: locationId },
  });
  res.json(evento);
});

//Inserire dati nel db sfruttando sequelize
router.post("/:locationId", validateToken, async (req, res) => {
  try {
    const evento = req.body;
    evento.LocationId = req.params.locationId;
    evento.UtentiId = req.utente.id;
    await Eventi.create(evento);
    res.json(evento);
  } catch (error) {
    res.send(error);
  }
});

//Per cancellare un evento
router.delete("/:eventoId", validateToken, async (req, res) => {
  const eventoId = req.params.eventoId;
  await Eventi.destroy({
    where: { id: eventoId },
  });

  res.json("Cancellata con successo");
});
module.exports = router;
