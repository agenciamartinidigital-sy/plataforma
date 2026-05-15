const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/:nome/:lang", (req, res) => {
  let nome = req.params.nome;
  let lang = req.params.lang;
  let exibirMsg = true;
  res.render("principal/perfil", {
    nome,
    lang,
    empresa: "Nexxum",
    msg: exibirMsg
  })
})

app.listen(8080, () => {
  console.log("App rodando!");
});
