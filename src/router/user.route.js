const Router = require("koa-router");

const router = new Router({ prefix: "/v1/user" });
const {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
} = require("../middleware/user.middleware");

const { register, login } = require("../controller/user.controller");

router.post("/register", userValidator, verifyUser, crpytPassword, register);

router.post("/login", userValidator, verifyLogin, login);

module.exports = router;
