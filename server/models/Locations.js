module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define(
    "Locations",
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descrizione: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      indirizzo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nPosti: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, tableName: "locations" }
  );

  Locations.associate = (models) => {
    Locations.hasMany(models.Eventi, {
      onDelete: "cascade",
    });

    Locations.hasMany(models.Recensioni, {
      onDelete: "cascade",
    });

    Locations.hasMany(models.Fotografie, {
      onDelete: "cascade",
    });
  };

  return Locations;
};
