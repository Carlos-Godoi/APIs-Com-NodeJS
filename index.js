// Importar o módulo Express para usar suas funcionalidades
const express = require('express');

// Importar módulo de CORS
const cors = require('cors');

// Cria uma instância di aplicativo Express
const app = express();

// Adicionar o módulo de CORS em nossa aplicação
app.use(cors());

// Importa as rotas definidas em pessoa.js
const pessoaRouter = require('./rotas/pessoa');

// Ter acesso ao body (json) nas requisições POST, PUT E PATCH
app.use(express.json());

// Executa o projeto na porta especificada
app.listen(8080, () => {
    console.log('Servidor rodando em http://localhost:8080');
});
  