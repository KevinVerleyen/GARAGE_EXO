module.exports = (sequelize, DataTypes) => {
  const Vehicule = sequelize.define(
    "Vehicule",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: "VehiculeID",
      },
      clientId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        field: "ClientID",
        references: {
          model: "Clients",
          key: "ClientID",
        },
      },
      immatriculation: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "Immatriculation",
      },
      marque: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Marque",
      },
      modele: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Modele",
      },
      annee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "Annee",
        validate: {
          min: 1950,
          max: new Date().getFullYear() + 1,
        },
      },
      type: {
        type: DataTypes.ENUM(
          "Berline",
          "Coupé",
          "Citadine",
          "Utilitaire",
          "Monospace",
          "Suv",
          "Autre"
        ),
        defaultValue: "Autre",
        field: "Type",
      },
    },
    {
      tableName: "vehicules",
    }
  );
  return Vehicule;
};
