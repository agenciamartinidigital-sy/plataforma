const express = require("express");
const app = express();
const PORT = 3000;
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
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

// app.get("/", (req, res) => {
//   Pergunta.findAll({
//     raw: true,
//     attribuites: ["titulo", "descricao"],
//     order: [["createdAt", "DESC"]],
//   }).then((perguntas) => {
//     res.render("index", {
//       perguntas: perguntas,
//     });
//   });
// });
app.get("/", (req, res) => {
  Pergunta.findAll({
    raw: true,
    // attributes: ["id", "titulo", "descricao"],
    order: [["id", "DESC"]],
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

app.get("/pergunta/:id", (req, res) => {
  let id = req.params.id;
  Pergunta.findOne({
    where: { id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [["id", "DESC"]],
      }).then((respostas) => {
        res.render("pergunta", {
          pergunta,
          respostas: respostas,
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/responder", (req, res) => {
  let corpo = req.body.corpo;
  let perguntaId = req.body.pergunta;
  Resposta.create({
    corpo,
    perguntaId,
  }).then(() => {
    res.redirect("/pergunta/" + perguntaId);
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`App rodando na porta ${PORT}`);
  });
}

module.exports = app;
