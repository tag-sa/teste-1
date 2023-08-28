const mongoose = require("mongoose");
require("dotenv").config();

const SETURL = "mongodb://localhost:27017/mongodb";
const { DB_URL, DB_DATABASE, DB_HOSTNAME, DB_PORT, DB_USERNAME } = process.env;
const ENV_URL = `mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`;
const db = mongoose.connect(ENV_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const con = mongoose.connection;

con.on("open", function () {
  console.log("Conectado ao MongoDB!");
});

con.on("error", function () {
  console.log("Erro na conexão com o MongoDB!");
});

con.on("close", function () {
  console.log("Desconetado do MongoDB!");
});

module.exports = db;
