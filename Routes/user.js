const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../Controller/user.js");
const wrapAsync = require("../util/wrapAsync.js");
const user = require("../model/user.js");


router.route("/signUp")
.get(userController.randerSignUp)
.post(wrapAsync(userController.signUp));


router.route("/login")
.get(userController.renderLoginForm)
.post(savedRedirectUrl ,passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login);

router.get("/logout", userController.logout);

module.exports = router;