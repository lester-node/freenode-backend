const Router = require("koa-router");

const router = new Router({ prefix: "/v1/article" });
const { auth } = require("../middleware/auth.middleware");
const { articleValidator } = require("../middleware/article.middleware");

const {
  idValidator,
  idsValidator,
} = require("../middleware/common.middleware");

const {
  articlePage,
  articleFilterPage,
  articleList,
  articleCreate,
  articleUpdate,
  articleDelete,
  articleSelectOne,
  articleChangeShow,
} = require("../controller/article.controller");

router.get("/articlePage", articlePage);
router.get("/articleFilterPage", articleFilterPage);
router.get("/articleList", articleList);
router.post("/articleCreate", auth, articleValidator, articleCreate);
router.post("/articleDelete", auth, idsValidator, articleDelete);
router.post("/articleChangeShow", auth, idValidator, articleChangeShow);
router.post("/articleSelectOne", idValidator, articleSelectOne);
router.post(
  "/articleUpdate",
  auth,
  articleValidator,
  idValidator,
  articleUpdate
);

module.exports = router;
