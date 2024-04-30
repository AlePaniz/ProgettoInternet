//Gestito da sequelize, ed è il modo per gestire seq. e i dati
module.exports = (sequelize, DataTypes) => {
  const Eventi = sequelize.define(
    "Eventi",
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descrizione: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dataEvento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    { sequelize, tableName: "eventi" }
  );
  return Eventi;
};
