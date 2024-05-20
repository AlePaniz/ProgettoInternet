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

//Richiesta di tutte le location create
router.get("/byIdUtente/:id", async (req, res) => {
  const id = req.params.id;
  const listaLocation = await Locations.findAll({ where: { UtentiId: id } });
  res.json(listaLocation);
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

//Richiesta per il cambiamento di un determinato capo di una location passando il campo che vogliamo cambiare
router.put("/cambiamento/:campoDaCambiare", async (req, res) => {
  try {
    const campoDaCambiare = req.params.campoDaCambiare;
    const { cambiamento, id } = req.body;
    const updateFields = {};
    // Creo un oggetto dinamico per specificare quale campo cambiare e il suo nuovo valore
    updateFields[campoDaCambiare] = cambiamento;

    await Locations.update(updateFields, { where: { id: id } });
    res.json(cambiamento);
  } catch (error) {}
});

//Per cancellare la location di cui passiamo l'id
router.delete("/:locationId", validateToken, async (req, res) => {
  const locationId = req.params.locationId;
  await Locations.destroy({
    where: {
      id: locationId,
    },
  });
  res.send("Elminazione effettuata");
});

//PARTE RIGUARDANTE LE IMMMAGINI:
router.post("uploadImmagine", async (req, res) => {});
module.exports = router;
