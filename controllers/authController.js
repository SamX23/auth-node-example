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
        res.redirect(`/`);
      })
      .catch((err) => next(err));
  },

  login: (req, res) => {
    User.authenticate(req.body).then((user) => {
      res.json(format(user));
    });
  },

  whoami: (req, res) => {
    const currentUser = req.user;
    res.json(currentUser);
  },
};
