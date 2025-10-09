// Importar o módulo Express para usar suas funcionalidades
const express = require('express');

// Cria uma instância di aplicativo Express
const app = express();

// Importa as rotas definidas em pessoa.js
const pessoaRouter = require('./rotas/pessoa');

// Usa o router definido para o caminho "/pessoa"
app.use('/pessoa', pessoaRouter);

// Ter acesso ao body (json) nas requisições POST, PUT E PATCH
app.use(express.json());

// Executa o projeto na porta especificada
app.listen(8080, () => {
    console.log('Servidor rodando em http://localhost:8080');
});
