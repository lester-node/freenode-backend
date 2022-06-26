const path = require("path");
const { imgPath } = require("../config/constant");

class CommonController {
  //新增
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    if (file) {
      ctx.body = {
        result: 0,
        message: "上传图片成功",
        data: {
          path: `${imgPath}/${path.basename(file.path)}`,
        },
      };
    } else {
      console.log("图片上传错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }
}

module.exports = new CommonController();
