const dotenv = require('dotenv');
const express = require ('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const passport = require('passport');

dotenv.config();

const database = require('./database');
const usersRouter = require('./src/routes/users.js');
const glucoseRouter = require('./src/routes/glucose.js');
const mealsRouter = require('./src/routes/meals.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'yuca',
  store: MongoStore.create({ 
    mongoUrl: database.url
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users',usersRouter); 
app.use('/glucose',glucoseRouter); 
app.use('/meals',mealsRouter); 

database.connect();

app.get('/', (req, res) => {
  if (req.user)
    res.status(200).send(req.user);
  else
    res.status(401).send('Unauthorized');
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Example app listening on ${port}!`);
});

module.exports = app;
