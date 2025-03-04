module.exports = (sequelize, DataTypes) => {
  const TypeIntervention = sequelize.define(
    "TypeIntervention",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: "TypeID",
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "Nom",
      },
      prix_base: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: "Prix_base",
      },
    },
    {
      tableName: "Type_Interventions",
    }
  );
  return TypeIntervention;
};
