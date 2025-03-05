const router = require("express").Router();
const authController = require("../controllers/auth.controller");

// ? Déclaration d'un middleware pour configurer les headers autorisés dans les CORS
router.use((req, res, next) => {
  // x-access-token : Autre headers pour stocker les JWT
  // Content-Type : Permet de préciser le type de contenu envoyé dans la requête
  // Authorization : Utilisé par les systèmes d'authentification (Bearer...)
  // Accept : Spécifier le type de contenu que le client peut traiter
  // Origin : Fourni l'origine de la requête

  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Content-Type, Authorization, Accept, Origin"
  );

  next();
});

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
