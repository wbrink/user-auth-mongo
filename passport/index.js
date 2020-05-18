var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../model"); // retrieve the db

passport.use(new LocalStrategy({
    usernameField: 'username', // represents req.body.username
    passwordField: 'password' // represents req.body.password
  },
  function(username,password, done) {
    db.User.findOne({username: username}, function(err, doc) {
      if (err) {return done(err); }
      if (!doc) {
        return done(null, false, {message: "Incorrect Username"});
      }
      if (!doc.checkPassword(password)) {
        return done(null, false, {message: "Invalid Login"});
      }

      // successful login
      return done(null, doc);
    })
  }
))

// this stores the user id in the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// this attaches user object to req.user 
passport.deserializeUser(function(id, done) {
  db.User.findById(id, function(err, user) {
    done(err, user);
  });
});



module.exports = passport;