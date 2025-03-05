const db = require("../models");
const Client = db.client;
const Vehicule = db.vehicule;
const Intervention = db.intervention;
const TypeIntervention = db.typeIntervention;
const { Op, fn, col, literal, where } = require("sequelize");

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
        message: `Une erreur est survenue lors de la requête `,
        error,
      });
    }
  },
  findAll: async (req, res) => {
    try {
      const clients = await Client.findAll({
        include: [
          {
            model: Vehicule,
            as: "vehicules",
            attributes: [
              "id",
              "immatriculation",
              "marque",
              "modele",
              "annee",
              "type",
            ],
          },
        ],
        order: [["nom", "ASC"]],
      });

      res.status(200).send(clients);
    } catch (error) {
      res.status(500).send({
        message: `Une erreur est survenue lors de la requête  `,
        error,
      });
    }
  },
  findOne: async (req, res) => {
    try {
      const id = req.params.id;

      const client = await Client.findByPk(id, {
        include: [
          {
            model: Vehicule,
            as: "vehicules",
            include: [
              {
                model: TypeIntervention,
                as: "type",
              },
            ],
          },
        ],
      });
      if (!client) {
        return res.status(404).send({
          message: `Le client avec l'id ${id} n'existe pas`,
        });
      }
      res.status(200).send(clients);
    } catch (error) {
      res.status(500).send({
        message: `Une erreur est survenue lors de la requête  `,
        error,
      });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      const [updated] = await Client.update(
        { ...req.body },
        {
          where: {
            ClientID: id,
          },
        }
      );

      if (updated === 0) {
        return res.status(404).send({
          message: `Le client avec l'id : ${id} n'existe pas, ou aucune modification effectuée`,
        });
      }

      res.status(200).send({
        message: "Modification du client effectuée avec succès",
      });
    } catch (error) {
      res.status(500).send({
        message: `Une erreur est survenue lors de la requête  `,
        error,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const vehicules = await Vehicule.findAll({
        where: {
          clientId: id,
        },
      });

      if (vehicules.length > 0) {
        return res.status(400).send({
          message:
            "Impossible de supprimer le client, veuillez supprimer son vehicule avant",
        });
      }

      const deleted = await Client.destroy({
        where: {
          ClientID: id,
        },
      });

      if (deleted === 0) {
        return res.status(404).send({
          message: `Le client avec l'id ${id} n'existe pas`,
        });
      }

      res.status(200).send({
        message: "Client supprimé avec succès",
      });
    } catch (error) {
      res.status(500).send({
        message: `Une erreur est survenue lors de la requête  `,
        error,
      });
    }
  },
};
module.exports = ClientController;
