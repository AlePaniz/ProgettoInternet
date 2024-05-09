const express = require("express");
const router = express.Router();
const { Recensioni } = require("../models");
const { where } = require("sequelize");
const { validateToken } = require("../middlewares/AuthMiddleware");

//mi trova tutte le recensioni per quella location (trova tutte le recensioni che hanno come locationId quello della location cliccata)
router.get("/:locationId", async (req, res) => {
  const locationId = req.params.locationId;
  const recensione = await Recensioni.findAll({
    where: { LocationId: locationId },
  });
  res.json(recensione);
});

//Creazione Recensione: (Aggiunta: passando validateTooken controlla che ci sia un utente loggato e che sia autorizzato!)
router.post("/", validateToken, async (req, res) => {
  const recensione = req.body;
  const username = req.utente.username;
  recensione.username = username;
  await Recensioni.create(recensione);
  res.json(recensione);
});

//Per cancellare una recensione però bisogna prima controllare che chi la vuole cancellare sia lo stesso che l'ha creata
router.delete("/:recId", validateToken, async (req, res) => {
  const recId = req.params.recId;
  await Recensioni.destroy({
    where: { id: recId },
  });

  res.json("Cancellata con successo");
});
module.exports = router;
