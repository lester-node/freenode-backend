const Router = require("koa-router");

const router = new Router({ prefix: "/v1/classify" });
const { auth } = require("../middleware/auth.middleware");
const {
  classifyValidator,
  repeatValidator,
} = require("../middleware/classify.middleware");

const {
  idValidator,
  idsValidator,
} = require("../middleware/common.middleware");

const {
  classifyEnum,
  classifyPage,
  classifyCreate,
  classifyDelete,
  classifyChangeShow,
  classifySelectOne,
  classifyUpdate,
} = require("../controller/classify.controller");

router.post("/classifyEnum", auth, classifyEnum);
router.get("/classifyPage", auth, classifyPage);
router.post(
  "/classifyCreate",
  auth,
  classifyValidator,
  repeatValidator,
  classifyCreate
);
router.post("/classifyDelete", auth, idsValidator, classifyDelete);
router.post("/classifyChangeShow", auth, idValidator, classifyChangeShow);
router.post("/classifySelectOne", auth, idValidator, classifySelectOne);
router.post(
  "/classifyUpdate",
  auth,
  classifyValidator,
  idValidator,
  repeatValidator,
  classifyUpdate
);

module.exports = router;
