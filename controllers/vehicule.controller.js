const { where } = require("sequelize");
const db = require("../models");
const { findAll } = require("./client.controller");
const Vehicule = db.vehicule;
const Client = db.client;
const Intervention = db.intervention;
const TypeIntervention = db.typeIntervention;

const VehiculeController = {
  create: async (req, res) => {
    try {
      const { clientId, immatriculation, marque, modele, annee, type } =
        req.body;

      if (!clientId || !immatriculation || !marque || !modele || annee) {
        return res.status(400).send({
          message: "Tous les champs sont obligatoirs",
        });
      }

      const client = await Client.findByPk(clientId);

      if (!client) {
        return res.status(404).send({
          message: `Le client avec l'id : ${clientId} n'existe pas`,
        });
      }

      const newVehicule = {
        clientId,
        immatriculation,
        marque,
        modele,
        annee,
        type: type || "Autre",
      };

      const vehicule = await Vehicule.create(newVehicule);

      res.status(201).send(vehicule);
    } catch (error) {
      res.status(500).send({
        message: `Une erreur est survenue lors de la requête  `,
        error,
      });
    }
  },

  findAll: async (req, res) => {
    try {
      const vehicule = await Vehicule.findAll({
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["id", "nom", "prenom", "email"],
          },
        ],
        order: [["marque", "ASC"]],
      });
      res.status(200).send(vehicule);
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

      const vehicule = await Vehicule.findByPk(id, {
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["id", "nom", "prenom", "email", "telephone"],
          },
          {
            model: Intervention,
            as: "interventions",
          },
        ],
      });

      if (!vehicule) {
        return res.status(404).send({
          message: `Le véhicule avec : l'id : ${id} n'existe pas`,
        });
      }

      res.status(200).send(vehicule);
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

      const [updated] = await Vehicule.update(
        { ...req.body },
        {
          where: { VehiculeID: id },
        }
      );

      if (updated === 0) {
        return res.status(404).send({
          message: `Le véhicule avec : l'id : ${id} n'existe pas ou aucune modification n'a ete effectuée`,
        });
      }
      res.status(200).send({
        message: "Le véhicule a bien ete mis a jour",
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

      const intervention = await Intervention.findAll({
        where: {
          vehiculeID: id,
        },
      });

      if (intervention.length > 0) {
        return res.status(400).send({
          message:
            "Impossible de supprimer le vehicule car des intervention y sont associées",
        });
      }

      const deleted = await Vehicule.destroy({
        where: {
          VehiculeID: id,
        },
      });

      if (deleted === 0) {
        return res.status(404).send({
          message: `Le véhicule avec : l'id : ${id} n'existe pas`,
        });
      }

      res.status(200).send({ message: "Véhicule correctement supprimé" });
    } catch (error) {
      res.status(500).send({
        message: `Une erreur est survenue lors de la requête  `,
        error,
      });
    }
  },
  findByType: async (req, res) => {
    try {
      const vehicules = await Vehicule.findAll({
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["id", "nom", "prenom"],
          },
        ],
        order: [["type", "ASC"]],
      });

      const vehiculesByType = vehicules.reduce((acc, vehicule) => {
        const type = vehicule.type;

        if (!acc[type]) {
          acc[type] = [];
        }

        acc[type].push(vehicule);

        return acc;
      }, {});
      res.status(200).send(vehiculesByType);
    } catch (error) {
      res.status(500).send({
        message: `Une erreur est survenue lors de la requête  `,
        error,
      });
    }
  },
  getInterventionHistory: async (req, res) => {
    try {
      const id = req.params.id;

      const intervention = await Intervention.findAll({
        where: { VehiculeID: id },
        include: [
          {
            model: TypeIntervention,
            as: "type",
          },
        ],
        order: [["date_intervention", "DESC"]],
      });

      res.status(200).send(intervention);
    } catch (error) {
      res.status(500).send({
        message: `Une erreur est survenue lors de la requête  `,
        error,
      });
    }
  },
};

module.exports = VehiculeController;
