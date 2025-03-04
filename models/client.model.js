module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: "ClientID",
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Nom",
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Prenom",
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "Telephone",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "L'email est requis",
          },
        },
        field: "Email",
      },
    },
    {
      tableName: "clients",
    }
  );
  return Client;
};
