const router = require("express").Router();
const auth = require("./controllers/authController");
const login = require("./controllers/loginController");
const restrict = require("./middleware/restrict");

router.get("/", restrict, (req, res) => res.render("index"));
router.get("/register", auth.index);
router.get("/login", login.index);

router.get("/whoami", restrict, auth.whoami);

// JWT
router.post("/auth/register", auth.register);
router.post("/auth/login", auth.login);

module.exports = router;
