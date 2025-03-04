const db = require("../models");
const Client = db.client;
const Vehicule = db.vehicule;
const Intervention = db.intervention;
const TypeIntervention = db.typeIntervention;
const { Op, fn, col, literal } = require("sequelize");

const ClientController = {
  create: async (req, res) => {
    try {
      const { nom, prenom, email, telephone } = req.body;

      if (!nom || !prenom || !email) {
        return res.status(400).send({
          message: "Les champs nom, prenom, email sont obligatoires",
        });
      }

      const client = await Client.create({
        nom,
        prenom,
        email,
        telephone,
      });
      res.status(201).send(client);
    } catch (error) {
      res.status(500).send({
        message: `Une erreur est survenue lors de la requête : ${error}`,
      });
    }
  },
};
module.exports = ClientController;
