const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
  password: String,
  username: String,
  name: String,
  email: String
});

User.plugin(passportLocalMongoose);

const UserModel = mongoose.model('Users', User);

passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

const createUser = async(req, res)=>{
    const {username, name, email, password} = req.body;
    UserModel.register({
      username: username,
      name: name,
      email: email,
    }, password, (err) => {
      if (err) 
        return err;
  
      passport.authenticate('local', {
        failureMessage: true
      })(req, res, () => {
        res.send(req.user ? req.user : 'Not logged', 200);
      });
    })
}

const loginUser = async(req, res)=>{
    passport.authenticate('local', {
      failureMessage: true
    })(req, res, () => {
      res.send(req.user ? req.user : 'Not logged', 200);
    });
}

const logoutUser = async(req, res, next)=>{
  req.logout();
  res.send(req.user ? req.user : 'Not logged', 200);
}

module.exports = {
    createUser,
    logoutUser,
    loginUser
}
