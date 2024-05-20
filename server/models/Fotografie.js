module.exports = (sequelize, DataTypes) => {
  const Fotografie = sequelize.define(
    "Fotografie",
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      percorso: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, tableName: "fotografie" }
  );
  return Fotografie;
};
