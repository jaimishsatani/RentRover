const User = require("../models/user");

// Render Sign Up Page
module.exports.renderSignUp = (req, res) => {
  res.render("users/signup.ejs");
};

// Handle Sign Up
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to RentRover!");
      res.redirect('/listings');
    });
  } catch (err) {
    req.flash("error", err.message); 
    res.redirect('/signup');
  }
};

// Render Login Page
module.exports.renderLogin = (req, res) => {
  res.render("users/login.ejs");
};

// Handle Login
module.exports.Login = (req, res) => {
  req.flash("success", "Welcome back to RentRover!");
  const redirectUrl = res.locals.redirectUrl || '/listings';
  res.redirect(redirectUrl);
};

// Handle Logout
module.exports.Logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect('/listings');
  });
};
