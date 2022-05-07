const express = require ('express');
const session = require('express-session');
const passport = require('passport');
const database = require('./database');
const usersRouter = require('./src/routes/users.js');
const glucoseRouter = require('./src/routes/glucose.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
  secret: 'yuca-bolero-muerte-guayabera'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/users',usersRouter); 
app.use('/glucose',glucoseRouter); 

app.get('/', (req, res) => {
  if (! req.user)
    res.status(400).send('Unauthorized');

  res.status(200).send(req.user);
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Example app listening on ${port}!`);
});

module.exports = app;
