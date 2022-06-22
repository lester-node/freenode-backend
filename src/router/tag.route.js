const Router = require("koa-router");

const router = new Router({ prefix: "/v1/tag" });
const { auth } = require("../middleware/auth.middleware");
const {
  tagValidator,
  repeatValidator,
} = require("../middleware/tag.middleware");

const {
  idValidator,
  idsValidator,
} = require("../middleware/common.middleware");

const {
  tagEnum,
  tagPage,
  tagCreate,
  tagDelete,
  tagChangeShow,
  tagSelectOne,
  tagUpdate,
} = require("../controller/tag.controller");

router.post("/tagEnum", auth, tagEnum);
router.get("/tagPage", auth, tagPage);
router.post(
  "/tagCreate",
  auth,
  tagValidator,
  repeatValidator,
  tagCreate
);
router.post("/tagDelete", auth, idsValidator, tagDelete);
router.post("/tagChangeShow", auth, idValidator, tagChangeShow);
router.post("/tagSelectOne", auth, idValidator, tagSelectOne);
router.post(
  "/tagUpdate",
  auth,
  tagValidator,
  idValidator,
  repeatValidator,
  tagUpdate
);

module.exports = router;
