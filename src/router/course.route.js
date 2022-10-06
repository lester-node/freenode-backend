const Router = require("koa-router");

const router = new Router({ prefix: "/v1/course" });
const { auth } = require("../middleware/auth.middleware");
const { courseValidator } = require("../middleware/course.middleware");

const {
  idValidator,
  idsValidator,
} = require("../middleware/common.middleware");

const {
  courseList,
  coursePage,
  courseTree,
  courseCreate,
  courseUpdate,
  courseDelete,
  courseSelectOne,
  courseChangeShow,
} = require("../controller/course.controller");

router.post("/courseList", courseList);
router.get("/coursePage", coursePage);
router.post("/courseTree", courseTree);
router.post("/courseCreate", auth, courseValidator, courseCreate);
router.post("/courseDelete", auth, idsValidator, courseDelete);
router.post("/courseChangeShow", auth, idValidator, courseChangeShow);
router.post("/courseSelectOne", idValidator, courseSelectOne);
router.post("/courseUpdate", auth, courseValidator, idValidator, courseUpdate);

module.exports = router;
