const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const { GlucoseTest } = require('./glucose')

const User = new mongoose.Schema({
  password: String,
  username: String,
  name: String,
  email: String,
  glucoseTests: [GlucoseTest]
});

User.plugin(passportLocalMongoose);

const UserModel = mongoose.model('Users', User);

passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

const createUser = async(req, res)=>{
    const {username, name, email, password} = req.body;
    UserModel.register({
      username,
      name,
      email,
      glucoseTests: [],
    }, password, (err) => {
      if (err) 
        res.status(400).send(err);
  
      passport.authenticate('local', {
        failureMessage: true
      })(req, res, () => {
        res.status(200).send('Registered');
      });
    })
}

const loginUser = async(req, res)=>{
    passport.authenticate('local', {
      failureMessage: true
    })(req, res, () => {
      res.status(200).send('Logged in');
    });
}

const logoutUser = async(req, res)=>{
  req.logout();
  res.status(200).send('Logged out');
}

module.exports = {
    createUser,
    logoutUser,
    loginUser
}
