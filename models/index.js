const db = require("../db");
const FavoriteCards = require("./FavoriteCards");
const TradingCard = require("./TradingCard");
const Users = require("./Users");

// User owns many TradingCards
Users.hasMany(TradingCard, { foreignKey: "ownerId" });
TradingCard.belongsTo(Users, { foreignKey: "ownerId" });

// User has many favorites
Users.hasMany(FavoriteCards, { foreignKey: "userId" });
FavoriteCards.belongsTo(Users, { foreignKey: "userId" });

// Card has many favorites
TradingCard.hasMany(FavoriteCards, { foreignKey: "cardId" });
FavoriteCards.belongsTo(TradingCard, { foreignKey: "cardId" });

module.exports = { db, FavoriteCards, TradingCard, Users };
