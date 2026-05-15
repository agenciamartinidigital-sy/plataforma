const express = require("express");
const app = express();
const port = 8080;

app.set("view engine", "ejs");

app.get("/:nome/:lang", (req, res) => {
  const nome = req.params.nome;
  const lang = req.params.lang;
  const exibirMsg = true;
  res.render("principal/perfil", {
    nome,
    lang,
    empresa: "Nexxum",
    msg: exibirMsg,
  });
});

app.listen(port, () => {
  console.log("App rodando!");
});
