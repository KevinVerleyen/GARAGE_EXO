const db = require("../models");
const TypeIntervention = db.typeIntervention;
const Intervention = db.intervention;
const { Op, where } = require("sequelize");
const { findAll, findOne, update } = require("./client.controller");

const TypeInterventionController = {
  create: async (req, res) => {
    try {
      const { nom, prix_base } = req.body;

      if (!nom || !prix_base) {
        return res.status(400).send({
          message:
            "Le nom et le prix de base du type d'intervention sont obligatoires",
        });
      }

      const newType = await TypeIntervention.create({ nom, prix_base });

      res.status(201).send(newType);
    } catch (error) {
      res.status(500).send({
        message: `Une erreur est survenue lors de la requête  `,
        error,
      });
    }
  },

  findAll: async (req, res) => {
    try {
      // Exemple d'utilisation de Op
      // On va récupérer un queryParam et l'utiliser pour faire une recherche spécifique dans la DB

      const { nom } = req.query;
      let condition = {};

      if (nom) {
        condition.nom = { [Op.like]: `%${nom}%` };
      }

      const types = await TypeIntervention.findAll({
        where: condition,
        order: [["nom", "ASC"]],
      });

      res.status(200).send(types);
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
      const type = await TypeIntervention.findByPk(id);

      if (!type) {
        return res.status(404).send({
          message: `Le type d'intervention avec l'id : ${id} n'existe pas`,
        });
      }

      res.status(200).send(type);
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
      const [update] = await TypeIntervention.update(
        { ...req.body },
        {
          where: { TypeID: id },
        }
      );

      if (update === 0) {
        return res.status(404).send({
          message: `Le type d'intervention avec l'id ${id} n'existe pas ou aucune modification eddectuée`,
        });
      }
      res
        .status(200)
        .send({ message: "Type d'intervention modifié avec succès" });
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
          TypeID: id,
        },
      });

      if (intervention.length > 0) {
        return res.status(400).send({
          message:
            "Impossible de supprimer le type d'intervention, terminer avant les intervention l'utilisant",
        });
      }

      const deleted = await TypeIntervention.destroy({
        where: { TypeID: id },
      });

      if (deleted === 0) {
        return res.status(404).send({
          message: `Le type d'intervention avec l'id : ${id} n'existe pas`,
        });
      }
      res
        .status(200)
        .send({ message: "Type d'intervention coorectement supprimé" });
    } catch (error) {
      res.status(500).send({
        message: `Une erreur est survenue lors de la requête  `,
        error,
      });
    }
  },
};

module.exports = TypeInterventionController;
