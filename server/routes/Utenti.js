const express = require("express");
const router = express.Router();
const { Utenti } = require("../models");
const bcrypt = require("bcrypt");
//Una libreria per la crittorafia delle password che aiuta nella gestione sicura del sito

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
    res.json({ errror: "Utente inesistente" });
  }
  //Se username non esiste ritorno un errore e mi fermo
  else {
    bcrypt.compare(password, utente.password).then((eq) => {
      if (!eq) {
        res.json({ errror: "Utente e/o password sbagliata" });
      } else {
        res.json("YOU LOGGED IN");
      }
    }); //Con compare faccio una comparazione della password che l'utente ha inserito con quella salvata nel database(quella appena inserita viene
  } //viene hashata e controllata automaticamente
});
module.exports = router;
