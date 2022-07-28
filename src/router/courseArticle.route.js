const Router = require("koa-router");

const router = new Router({ prefix: "/v1/courseArticle" });
const { auth } = require("../middleware/auth.middleware");
const {
  courseArticleValidator,
} = require("../middleware/courseArticle.middleware");

const {
  idValidator,
  idsValidator,
} = require("../middleware/common.middleware");

const {
  courseArticlePage,
  courseArticleCreate,
  courseArticleUpdate,
  courseArticleDelete,
  courseArticleSelectOne,
  courseArticleChangeShow,
} = require("../controller/courseArticle.controller");

router.get("/courseArticlePage", courseArticlePage);
router.post(
  "/courseArticleCreate",
  auth,
  courseArticleValidator,
  courseArticleCreate
);
router.post("/courseArticleDelete", auth, idsValidator, courseArticleDelete);
router.post("/courseArticleChangeShow", auth, idValidator, courseArticleChangeShow);
router.post("/courseArticleSelectOne", idValidator, courseArticleSelectOne);
router.post(
  "/courseArticleUpdate",
  auth,
  courseArticleValidator,
  idValidator,
  courseArticleUpdate
);

module.exports = router;
