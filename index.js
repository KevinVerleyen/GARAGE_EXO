const express = require("express");

// Importation des cors
const cors = require("cors");

const app = express();

// Initialisation des cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
