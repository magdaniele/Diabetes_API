const express = require ('express');
const session = require('express-session');
const passport = require('passport');
const database = require('./database');
const usersRouter = require('./src/routes/users.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
  secret: 'yuca-bolero-muerte-guayabera'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/users',usersRouter); 

app.get('/', (req, res) => {
  res.send(req.user? req.user : "Not logged");
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Example app listening on ${port}!`);
});

module.exports = app;
