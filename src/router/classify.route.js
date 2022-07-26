const Router = require("koa-router");

const router = new Router({ prefix: "/v1/classify" });
const { auth } = require("../middleware/auth.middleware");
const {
  classifyValidator,
} = require("../middleware/classify.middleware");

const {
  idValidator,
  idsValidator,
} = require("../middleware/common.middleware");

const {
  classifyList,
  classifyPage,
  classifyCreate,
  classifyDelete,
  classifyChangeShow,
  classifySelectOne,
  classifyUpdate,
} = require("../controller/classify.controller");

router.post("/classifyList", classifyList);
router.get("/classifyPage", classifyPage);
router.post(
  "/classifyCreate",
  auth,
  classifyValidator,
  classifyCreate
);
router.post("/classifyDelete", auth, idsValidator, classifyDelete);
router.post("/classifyChangeShow", auth, idValidator, classifyChangeShow);
router.post("/classifySelectOne", idValidator, classifySelectOne);
router.post(
  "/classifyUpdate",
  auth,
  classifyValidator,
  idValidator,
  classifyUpdate
);

module.exports = router;
