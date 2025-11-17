const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../controller/user.js");

router.get("/signup", auth.renderSignup);
router.post("/signin", auth.signup);
router.get("/loginform", auth.renderLogin);
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/bhopal/loginform",
    failureFlash: true
}), auth.login);
router.get("/logout", auth.logout);

module.exports = router;
