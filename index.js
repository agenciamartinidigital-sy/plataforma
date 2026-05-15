import express, { static } from "express";
const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.use(static("public"));

app.get("/:nome/:lang", (req, res) => {
  let nome = req.params.nome;
  let lang = req.params.lang;
  let exibirMsg = true;
  let produtos = [
    { nome: "Doritos", preco: 3.14 },
    { nome: "Coca-cola", preco: 5.0 },
    { nome: "Leite", preco: 1.45 },
    { nome: "Carne", preco: 1.45 },
    { nome: "Verdura", preco: 1.45 },
    { nome: "Nescau", preco: 1.45 },
  ];
  res.render("principal/perfil", {
    nome,
    lang,
    empresa: "Nexxum",
    msg: exibirMsg,
    produtos,
  });
});

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});
