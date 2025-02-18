// index.js
const express = require('express');
const userRoutes = require('./routes/users.routes');
const bodyParser = require('body-parser'); // Importe o body-parser

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});