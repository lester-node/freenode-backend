const Router = require("koa-router");

const router = new Router({ prefix: "/v1/tag" });
const { auth } = require("../middleware/auth.middleware");
const {} = require("../middleware/tag.middleware");

const { tagEnum } = require("../controller/tag.controller");

router.post("/tagEnum", auth, tagEnum);


module.exports = router;
