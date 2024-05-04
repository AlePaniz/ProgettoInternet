module.exports = (sequelize, DataTypes) => {
  const Recensioni = sequelize.define(
    "Recensioni",
    {
      recBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      voto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, tableName: "recensioni" }
  );

  return Recensioni;
};
