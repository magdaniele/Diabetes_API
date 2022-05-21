const { model } = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');

const User = require('../models/users');

User.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

const UserModel = model('Users', User);

passport.use(new LocalStrategy({
  usernameField: 'email'
}, UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

const createUser = async(req, res)=>{
    const {name, email, height, weight, password} = req.body;
    UserModel.register({
      name,
      email,
      height,
      weight
    }, password)
      .then(() => {
        passport.authenticate('local', {
          failureMessage: true
        })(req, res, () => {
          res.status(200).send(req.user);
        })
      })
      .catch(err => {
        res.status(400).send(err);
      });
}

const loginUser = async(req, res) => {
    passport.authenticate('local', {
      failureMessage: true
    })(req, res, () => {
      res.status(200).send(req.user);
    });
}

const updateUser = async(req, res) => {
  if (req.user) {
    for (let key in req.body)
      if (key in req.user && key !== "glucoseTests")
        req.user[key] = req.body[key];
    req.user.save()
      .then((doc)=> {
        res.status(200).send(doc);
      })
      .catch((err)=> {
        res.status(400).send(err);
      });
  } else
    res.status(401).send('Unauthorized');
}

const logoutUser = async(req, res)=>{
  req.logout();
  res.status(200).send('Logged out');
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    logoutUser
}
