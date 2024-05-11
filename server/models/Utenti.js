module.exports = (sequelize, DataTypes) => {
  const Utenti = sequelize.define(
    "Utenti",
    {
      cognome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      codFiscale: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      indirizzo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipoUtente: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, tableName: "utenti" }
  );

  Utenti.associate = (models) => {
    Utenti.hasMany(models.Locations, {
      onDelete: "cascade",
    });

    Utenti.hasMany(models.Eventi, {
      onDelete: "cascade",
    });
  };

  return Utenti;
};
