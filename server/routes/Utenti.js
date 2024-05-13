const express = require("express");
const router = express.Router();
const { Utenti } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
//Una libreria per la crittorafia delle password che aiuta nella gestione sicura del sito

const { sign } = require("jsonwebtoken");

//Inserire dati nel db sfruttando sequelize
router.post("/", async (req, res) => {
  try {
    const {
      cognome,
      nome,
      codFiscale,
      indirizzo,
      email,
      telefono,
      tipoUtente,
      username,
      password,
    } = req.body; //Nella richiesta ci vanno tutti i dettagli dell'utente

    bcrypt.hash(password, 10).then((hash) =>
      Utenti.create({
        cognome: cognome,
        nome: nome,
        codFiscale: codFiscale,
        indirizzo: indirizzo,
        email: email,
        telefono: telefono,
        tipoUtente: tipoUtente,
        username: username,
        password: hash,
      })
    ); //dentro hash ci sarà la password dopo essere stata "hashata"
    res.json("success");
  } catch (error) {
    res.send(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const utente = await Utenti.findOne({ where: { username: username } });
  if (!utente) {
    res.json({ error: "Utente inesistente" });
  }
  //Se username non esiste ritorno un errore e mi fermo
  else {
    //Con compare faccio una comparazione della password che l'utente ha inserito con quella salvata nel database(quella appena inserita viene
    bcrypt.compare(password, utente.password).then((eq) => {
      //viene hashata e controllata automaticamente
      if (!eq) {
        res.json({ error: "Utente e/o password sbagliata" });
      } else {
        //Per tenere l'utente in sessione una volta loggato creo un token(una stringa utile per l'identificazione)
        const accessToken = sign(
          {
            username: utente.username,
            tipoUtente: utente.tipoUtente,
            id: utente.id,
          },
          "plqwenfNCSLmemdaadASDnenf"
        ); //passiamo i dati dell'utente e una stringa di lettere generata casualmente
        //che serve per garantire sicurezza una volta effettuato il login
        res.json({
          token: accessToken,
          username: utente.username,
          tipoUtente: utente.tipoUtente,
          id: utente.id,
        });
      }
    });
  }
});

router.get("/validation", validateToken, (req, res) => {
  //Faccio runnare questo e mi ritornerà se è valido oppure no
  res.json(req.utente);
});

//Richiede le informazioni dell'utente loggato
router.get("/getinfo/:idUtente", async (req, res) => {
  const id = req.params.idUtente;
  const infoUtente = await Utenti.findByPk(id, {
    attributes: { exclude: ["password"] }, //Escludiamo la password perchè non ci interessa
  });

  res.json(infoUtente);
});

router.put("/changepsw", validateToken, async (req, res) => {
  const { vecchiaPsw, nuovaPsw } = req.body; //Bisogna passare i dati con le chiavi esattamente vecchiaPsw e nuovaPsw
  const utente = await Utenti.findOne({ where: { id: req.utente.id } });

  bcrypt.compare(vecchiaPsw, utente.password).then((eq) => {
    if (!eq) {
      res.json({ error: "Password sbagliata" });
    } else {
      bcrypt.hash(nuovaPsw, 10).then((hash) => {
        Utenti.update({ password: hash }, { where: { id: req.utente.id } });
        res.json("SUCCESS");
      });
    }
  });
});
module.exports = router;
