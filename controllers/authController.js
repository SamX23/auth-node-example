const passport = require("../lib/passport");
const { User } = require("../models");

module.exports = {
  index: (req, res) => res.render("register"),
  register: (req, res, next) => {
    User.register(req.body)
      .then((user) => {
        res.send(`success, ${user}`);
      })
      .catch((err) => next(err));
  },
  login: passport.authenticate("local", {
    successRedirect: "/whoami",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  whoami: (req, res) => res.render("profile", req.user.dataValues),
};
