const express = require("express");

// Importation des cors
const cors = require("cors");

const app = express();

// Initialisation des cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PORT } = process.env; //!  {} pour destructurer l'objet process.env et récupérer la valeur de PORT qui est dedans

// Import de l'objet db
const db = require("./models");

db.sequelize
  .sync({ force: process.env.NODE_ENV === "development" })
  .then(() => {
    console.log("Db sync 🔄");
    if (process.env.NODE_ENV === "development") {
      require("./utils/init")();
    }
  })
  .catch((error) => {
    console.log(`Erreur de synchonisation à la DB ❌, ${error}`);
  });

app.listen(PORT, () => {
  console.log(`Serveur is running on http://localhost: ${PORT} 🟢 `);
});
