const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define("perguntas", {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Pergunta.sync({ force: false }).then(() => {});
// .catch(e => console.log(e))
// Pergunta.sync({ force: false })
// .then(() => {
//     console.log("Tabela criada")
// })
// .catch(e => console.log(e))
module.exports = Pergunta;
