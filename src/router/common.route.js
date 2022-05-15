const Router = require("koa-router");

const router = new Router({ prefix: "/v1/common" });
const { auth } = require("../middleware/auth.middleware");

const { upload } = require("../controller/common.controller");

router.post("/upload", auth, upload);

module.exports = router;
