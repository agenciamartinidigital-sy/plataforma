const Sequelize = require("sequelize");
const connection = new Sequelize("guiaperguntas", "root", "luis140777", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

module.exports = connection;
