const router = require("express").Router();
const auth = require("./controllers/authController");
const login = require("./controllers/loginController");
const restrict = require("./middleware/restrict");

router.get("/", restrict, (req, res) => res.render("index"));
router.get("/register", auth.index);
router.get("/login", login.index);

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/whoami", restrict, auth.whoami);

module.exports = router;
