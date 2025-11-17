const User = require("../models/user");
const passport = require("passport");

module.exports.renderSignup = (req, res) => {
    res.render("signin.ejs");
};

module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to wanderlust");
            res.redirect("/");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/bhopal/signup");
    }
};

module.exports.renderLogin = (req, res) => {
    res.render("login.ejs");
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl=res.locals.redirectUrl || "/";
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.flash("success", "Logout successful");
        res.redirect("/");
    });
};
