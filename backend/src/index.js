// Importando o módulo express para dentro da var express
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

// Armazenar a aplicação, instanciando a aplicação
const app = express();

// Segurança para definir quem terá acesso a aplicação
app.use(cors());

// Converter o corpo da requisição em JSON
app.use(express.json());

// Usar as rotas criadas no arquivo routes.js
app.use(routes);

// Ouvir a porta localhost:3333
app.listen(3333);