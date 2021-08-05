const passport = require("../lib/passport");
const { User } = require("../models");

function format(user) {
  const { id, username } = user;
  return {
    id,
    username,
    accessToken: user.generateToken(),
  };
}

module.exports = {
  index: (req, res) => res.render("register"),
  register: (req, res, next) => {
    User.register(req.body)
      .then((user) => {
        res.redirect(`/?username=${user}`);
      })
      .catch((err) => next(err));
  },
  login: passport.authenticate("local", {
    successRedirect: "/whoami",
    failureRedirect: "/login",
    failureFlash: true,
  }),

  loginJWT: (req, res) => {
    User.authenticate(req.body).then((user) => {
      res.json(format(user));
    });
  },

  whoami: (req, res) => res.render("profile", req.user.dataValues),
};
