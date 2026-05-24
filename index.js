const express = require("express");
const app = express();
const PORT = 3000;
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
// Database

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

app.set("view engine", "ejs");
app.use(express.static("public")); // middleware

app.use(express.urlencoded({ extended: false })); // middleware
app.use(express.json()); // middleware

app.get("/", (req, res) => {
  Pergunta.findAll({
    raw: true,
    attribuites: ["titulo", "descricao"],
    order: [["createdAt", "DESC"]],
  }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  let titulo = req.body.titulo;
  let descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/");
  });
  // res.send(`Formulário recebido! Título: ${titulo} | Descrição: ${descricao}`);
});

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});
