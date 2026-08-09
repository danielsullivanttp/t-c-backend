const { DataTypes } = require("sequelize");
const db = require("../db");

const FavoriteCards = db.define("FavoriteCards", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = FavoriteCards;
