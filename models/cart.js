const Sequelize = require("sequelize");
const sequelize = require("../util/database");

// Defined Modal of table
const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
