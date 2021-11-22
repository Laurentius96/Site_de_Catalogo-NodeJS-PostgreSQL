const database = require("./../database"); // conectando com a database
const Sequelize = require("sequelize");

const Filme = database.define(
  "filmes",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descricao: Sequelize.STRING,
    imagem: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, // Para evitar que o Sequelize tente adequar o nome da tabela
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Filme;
