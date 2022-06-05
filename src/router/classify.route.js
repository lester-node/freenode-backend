const Router = require("koa-router");

const router = new Router({ prefix: "/v1/classify" });
const { auth } = require("../middleware/auth.middleware");
const {} = require("../middleware/classify.middleware");

const { classifyEnum } = require("../controller/classify.controller");

router.post("/classifyEnum", auth, classifyEnum);



module.exports = router;
