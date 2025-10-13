// Importar o módulo Express para usar suas funcionalidades
const express = require('express');

// Cria uma instância di aplicativo Express
const app = express();

const helmet = require('helmet');
// 2. Usar o Helmet e 3. Configurar a CSP
// AGORA O app ESTÁ DEFINIDO E A CSP FOI INCLUÍDA
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            // CORREÇÃO 1: Adiciona 'none' para default-src
            defaultSrc: ["'none'"], 
            // CORREÇÃO 2: Adiciona 'self' para img-src para permitir o favicon.ico
            imgSrc: ["'self'"], 
            
            // Opcional: Adicione outras diretivas que você precisa:
            scriptSrc: ["'self'"], // Permite scripts do seu próprio domínio
            styleSrc: ["'self'"],  // Permite estilos do seu próprio domínio
            connectSrc: ["'self'"], // Permite requisições XHR/fetch para o próprio domínio
        },
    },
}));

// Importar módulo de CORS
const cors = require('cors');

// Importar a função `conectarMongo`do arquivo `conexao/mongo.js`
const { conectarMongo } = require('./conexao/mongo');

// Adicionar o módulo de CORS em nossa aplicação
app.use(cors());

// Importa as rotas definidas em pessoa.js
const pessoaRouter = require('./rotas/pessoa');
const pessoaMongoRouter = require('./rotas/pessoaMongo');

// Ter acesso ao body (json) nas requisições POST, PUT E PATCH
app.use(express.json());

// Executa o projeto na porta especificada
// app.listen(8080, () => {
//     console.log('Servidor rodando em http://localhost:8080');
// });
 
// Chamar a função `conectarMongo()` para estabelecer a conexão.
conectarMongo().then(() => {
    
    // Após a conexão com o MongoDB ser bem-sucedida, o servidor Express é iniciado
    app.listen(8080, () => console.log('Servidor rondando na porta 8080'));
}).catch(err => {
    // Caso ocorra algum erro durante a conexão com o MongoDB ou iniciar o servidor
console.error('Erro ao conectar ao MongoDB ou iniciar o servidor:');
});