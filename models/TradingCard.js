const { DataTypes } = require("sequelize");
const db = require("../db");

const TradingCard = db.define("TradingCards", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  team: DataTypes.STRING,
  status: DataTypes.STRING,
  value: DataTypes.FLOAT,
  rare: DataTypes.BOOLEAN,
  ownerId: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = TradingCard;
