const Router = require("koa-router");

const router = new Router({ prefix: "/v1/article" });
const { auth } = require("../middleware/auth.middleware");
const {
  articleValidator,
  idValidator,
} = require("../middleware/article.middleware");

const {
  articlePage,
  articleCreate,
  articleUpdate,
  articleDelete,
} = require("../controller/article.controller");

router.get("/articlePage", auth, articlePage);
router.post("/articleCreate", auth, articleValidator, articleCreate);
router.post("/articleDelete", auth, idValidator, articleDelete);
router.post(
  "/articleUpdate",
  auth,
  articleValidator,
  idValidator,
  articleUpdate
);

module.exports = router;
