const Sequelize = require("sequelize");

// Connectivity of Database 
const sequelize = new Sequelize("node-complete", "root", "Pass22@22", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
