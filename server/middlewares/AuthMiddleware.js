//Questo middleware serve per l'autenticazione dell'utente prendendo il token mandato nel frontend e validandolo tramite una funzione jwt e se è valido continua con la richiesta altrimenti
//Ritornerà un errore
const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  //next verrà richiamato se sarà tutto ok si andra avanti quindi next nella richiesta
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({ error: " User not logged in!  " });
  }

  try {
    const validToken = verify(accessToken, "plqwenfNCSLmemdaadASDnenf");
    req.utente = validToken; //Possiamo accedere nelle altre pagine all'username tramite il validToken che contiene le info dell'utente loggato
    if (validToken) {
      return next(); //Qundi se esiste il validToken, quindi la funzione verify è andata a buon fine passando lo stesso codice che passo una volta effettuato il login allora avanzo con la richiesta
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
