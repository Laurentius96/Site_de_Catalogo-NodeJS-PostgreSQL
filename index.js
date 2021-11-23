const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());


require("dotenv").config();
const Filme = require("./models/filme"); // Faz a conexão com o banco e recebe o modelo do Sequelize

const message = "";


app.get("/", async (req, res) => {
  const filmes = await Filme.findAll();
  res.render("index", { filmes, message });
});

// Rota para trazer os detalhes de um filme através do seu ID(PK)
app.get("/filmes/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);
  res.render("detalhes", {
    filme,
  });
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
