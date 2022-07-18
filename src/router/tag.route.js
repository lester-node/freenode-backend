const Router = require("koa-router");

const router = new Router({ prefix: "/v1/tag" });
const { auth } = require("../middleware/auth.middleware");
const {
  tagValidator,
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
router.get("/tagPage", tagPage);
router.post(
  "/tagCreate",
  auth,
  tagValidator,
  tagCreate
);
router.post("/tagDelete", auth, idsValidator, tagDelete);
router.post("/tagChangeShow", auth, idValidator, tagChangeShow);
router.post("/tagSelectOne", idValidator, tagSelectOne);
router.post(
  "/tagUpdate",
  auth,
  tagValidator,
  idValidator,
  tagUpdate
);

module.exports = router;
