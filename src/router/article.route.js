const Router = require("koa-router");

const router = new Router({ prefix: "/v1/article" });
const { auth } = require("../middleware/auth.middleware");
const {
  articleValidator,
  repeatValidator,
} = require("../middleware/article.middleware");

const {
  idValidator,
  idsValidator,
} = require("../middleware/common.middleware");

const {
  articlePage,
  articleCreate,
  articleUpdate,
  articleDelete,
  articleSelectOne,
  articleChangeShow,
} = require("../controller/article.controller");

router.get("/articlePage", auth, articlePage);
router.post(
  "/articleCreate",
  auth,
  articleValidator,
  repeatValidator,
  articleCreate
);
router.post("/articleDelete", auth, idsValidator, articleDelete);
router.post("/articleChangeShow", auth, idValidator, articleChangeShow);
router.post("/articleSelectOne", auth, idValidator, articleSelectOne);
router.post(
  "/articleUpdate",
  auth,
  articleValidator,
  idValidator,
  repeatValidator,
  articleUpdate
);

module.exports = router;
