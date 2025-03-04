const dbConfig = require("../config/database");

// Importation de la librairie sequelize. Le S va permettre de differencier la variable contenant la
// librairie de la variable contenant la connexion a la db
const Sequelize = require("sequelize");

// preparation de l'instance de connexion a la db
const sequelize = new Sequelize(dbConfig);

// Initialisation de l'objet qui va contenir tout ce qui aura un rapport a nos models et notre DB
const db = {};

// Insertion de Sequelize et de sequelize dans l'objet DB
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import des models
db.client = require("./client.model")(sequelize, Sequelize);
db.vehicule = require("./vehicule.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.intervention = require("./intervention.model")(sequelize, Sequelize);
db.typeIntervention = require("./type_intervention.model")(
  sequelize,
  Sequelize
);

// Definition des relations entre les différents models
//! Relation entre clients et vehicules (one-to-many)
db.client.hasMany(db.vehicule, {
  as: "vehicules",
  foreignKey: "clientId",
});
db.vehicule.belongsTo(db.client, {
  as: "client",
  foreignKey: "clientId",
});
// Relation entre vehivule et intervention (one-to-many)
db.vehicule.hasMany(db.intervention, {
  as: "interventions",
  foreignKey: "vehiculeId",
});
db.intervention.belongsTo(db.vehicule, {
  as: "vehicule",
  foreignKey: "vehiculeId",
});

// relation entre type intervention et intervention (one-)
db.typeIntervention.hasMany(db.intervention, {
  as: "interventions",
  foreignKey: "typeId",
});
db.intervention.belongsTo(db.typeIntervention, {
  as: "type",
  foreignKey: "typeId",
});
module.exports = db;
