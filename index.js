const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

require("dotenv").config();
const Filme = require("./models/filme"); // Faz a conexão com o banco e recebe o modelo do Sequelize

var message = "";

app.get("/", async (req, res) => {
  const filmes = await Filme.findAll();
  res.render("index", { filmes, message });
});

// Rota para trazer os detalhes de um filme através do seu ID(PK)
app.get("/filmes/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);
  res.render("detalhes", { filme });
});

app.get("/criar", (req, res) => {
  res.render("criar", { message });
});

// Rota 'Post' chamada quando o formulario for submetido - (submit no criar.ejs)
app.post("/criar", async (req, res) => {
  const { nome, imagem, descricao } = req.body;

  if (!nome) {
    res.render("criar", {
      message: "Por favor, nome do filme não deve ficar em branco!",
    });
  } else if (!imagem) {
    res.render("criar", {
      message: "Por favor, colocar um poster do filme!",
    });
  } else if (!descricao) {
    res.render("criar", {
      message: "Por favor, sinopse do filme não deve ficar em branco!",
    });
  } else {
    try {
      const filme = await Filme.create({
        nome,
        descricao,
        imagem,
      });

      res.render("criar", {
        filme,
        message: "Seu filme foi cadastrado!",
      });
    } catch (err) {
      console.log(err);

      res.render("criar", {
        message: "Ocorreu um erro ao cadastrar o Filme!",
      });
    }
  }
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);

// Rota que edita o filme através do seu ID(PK)
app.get("/filmes/editar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  if (!filme) {
    res.render("editar", {
      message: "Filme não encontrado!",
    });
  }

  res.render("editar", {
    filme,
    message,
  });
});

app.post("/filmes/editar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  const { nome, descricao, imagem } = req.body;

  filme.nome = nome;
  filme.descricao = descricao;
  filme.imagem = imagem;

  const filmeEditado = await filme.save();

  res.render("editar", {
    filme: filmeEditado,
    message: "Filme editado!",
  });
});

// Rota que deleta o filme através do seu ID(PK)
app.get("/filmes/deletar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  if (!filme) {
    res.render("deletar", {
      filme,
      message: "Desculpa, mas o filme não encontrado!",
    });
  }
  res.render("deletar", {
    filme,
    message,
  });
});

app.post("/filmes/deletar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  if (!filme) {
    res.render("deletar", {
      filme,
      message: "Desculpa, mas o filme não encontrado!",
    });
  }

  await filme.destroy();

  message = `Filme ${filme.nome} deletado com sucesso!`;

  res.redirect("/");
});

// Rota que leva a página sobre o criador
app.get('/sobre' , (req,res) => {
	res.render('sobre.ejs', )
}); 