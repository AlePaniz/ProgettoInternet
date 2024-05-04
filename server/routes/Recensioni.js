const express = require("express");
const router = express.Router();
const { Recensioni } = require("../models");
const { where } = require("sequelize");

//mi trova tutte le recensioni per quella location (trova tutte le recensioni che hanno come locationId quello della location cliccata)
router.get("/:locationId", async (req, res) => {
  const locationId = req.params.locationId;
  const recensione = await Recensioni.findAll({
    where: { LocationId: locationId },
  });
  res.json(recensione);
});

//Creazione Recensione:
router.post("/", async (req, res) => {
  const recensione = req.body;
  await Recensioni.create(recensione);
  res.json(recensione);
});

module.exports = router;
