const Router = require("koa-router");

const router = new Router({ prefix: "/v1/article" });
const { auth } = require("../middleware/auth.middleware");

const { getArticleById } = require("../controller/article.controller");

router.post("/getArticleById", auth, getArticleById);

module.exports = router;
