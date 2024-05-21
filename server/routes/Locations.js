const express = require("express");
const router = express.Router();
const { Locations, Fotografie } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const multer = require("multer");
const fs = require("fs");

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
  } catch (error) {
    res.send(error);
  }
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

//Utilizzo multer per lo storage delle immagini:
const storage = multer.diskStorage({
  //destinazione delle immagini
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  //Filename
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploadImmagine = multer({ storage });
//Caricare le immagini
router.post(
  "/uploadImmagine",
  uploadImmagine.single("file"),
  async (req, res) => {
    try {
      const { id } = req.body;
      const { filename, destination } = req.file;
      const foto = await Fotografie.create({
        nome: filename,
        percorso: destination,
        LocationId: id,
      });
      res.json(id);
    } catch (error) {
      res.send(error);
    }
  }
);

//Tutte le fotografie di una certa location
router.get("/immaginiById/:locationId", async (req, res) => {
  const locationId = req.params.locationId;
  const foto = await Fotografie.findAll({
    where: { LocationId: locationId },
  });
  res.json(foto);
});

//Cancella le fotografie sia dal db che dal filesystem
router.delete("/cancellaImg/:fotoId", async (req, res) => {
  const fotoId = req.params.fotoId;
  const foto = Fotografie.findByPk(fotoId);
  const filePath = `${foto.percorso}`;
  await Fotografie.destroy({
    where: {
      id: fotoId,
    },
  });

  //Cancella file dal filesystem tramite fs
  fs.unlink(filePath, async (err) => {
    if (err) {
      console.error("Errore nella cancellazione del file:, err");
    }
  });
  res.send("Elminazione della fotografia effettuata");
});

module.exports = router;
