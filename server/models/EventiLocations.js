module.exports = (sequelize, DataTypes) => {
  const EventiLocations = sequelize.define(
    "EventiLocations",
    {},
    { sequelize, tableName: "eventilocations" }
  );

  return EventiLocations;
};
