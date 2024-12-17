const express = require("express");
const router = express.Router();
const wrapasync = require("../utills/wrapAsync.js");
const passport = require("passport");
const userController = require("../controllers/user.js");
const { saveRedirectUrl } = require("../middleware.js"); // Ensure the middleware name is correct

// Sign Up Routes
router
  .route('/signup')
  .get(userController.renderSignUp)
  .post(wrapasync(userController.signup));

// Login Routes
router
  .route('/login')
  .get(userController.renderLogin)
  .post(
    saveRedirectUrl, // Middleware to save redirect URL before login
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.Login
  );

// Logout Route
router.get('/logout', userController.Logout);

module.exports = router;
