const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("Users", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,   // Auth0 may not provide a name
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,   // Auth0 email is optional depending on provider
    unique: true,
    validate: { isEmail: true },
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,   // Auth0 provides a profile picture URL
  }
});

module.exports = User;
