const express = require ('express');
const usersRouter = require('./src/routes/users.js');
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use('/users',usersRouter); 

module.exports = app;