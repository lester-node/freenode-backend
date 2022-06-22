const {
  servicePage,
  serviceCreate,
  serviceUpdate,
  serviceDelete,
  serviceSelectOne,
  serviceArticleNum,
} = require("../service/article.service");

const Article = require("../model/article.modal");

class ArticleController {
  //新增
  async articleCreate(ctx, next) {
    try {
      const res = await serviceCreate(ctx.request.body);
      await serviceArticleNum(res.classifyId, "add");
      ctx.body = {
        result: 0,
        message: "新增文章成功",
        data: {
          ...res,
        },
      };
    } catch (err) {
      console.log("err", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //修改
  async articleUpdate(ctx, next) {
    try {
      const res = await serviceUpdate(ctx.request.body);
      if (res) {
        ctx.body = {
          result: 0,
          message: "修改成功",
          data: null,
        };
      } else {
        throw "error";
      }
    } catch (err) {
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //是否展示
  async articleChangeShow(ctx, next) {
    try {
      const { show, id } = ctx.request.body;
      const res = await serviceUpdate({ show: show ? 1 : 0, id });
      if (res) {
        ctx.body = {
          result: 0,
          message: "修改展示成功",
          data: null,
        };
      } else {
        throw "error";
      }
    } catch (err) {
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //删除
  async articleDelete(ctx, next) {
    const { ids } = ctx.request.body;
    let arr = [];
    let sendRes;
    try {
      await Promise.all(
        ids.map(async (id) => {
          return new Promise(async (resolve) => {
            let res = await Article.findOne({
              where: { id },
            });
            resolve(res.dataValues);
          });
        })
      ).then((res) => {
        res
          .filter((item) => item.classifyId)
          .map((item) => {
            let index =
              arr.length > 0
                ? arr.findIndex(
                    (itemA) => itemA?.classifyId == item?.classifyId
                  )
                : -1;
            if (index > -1) {
              arr.splice(index, 1, {
                classifyId: item.classifyId,
                num: arr[index].num + 1,
              });
            } else {
              arr.push({ classifyId: item.classifyId, num: 1 });
            }
          });
        arr.map((item) => {
          serviceArticleNum(item.classifyId, "sub", item.num);
        });
        sendRes = serviceDelete(ids);
        if (sendRes) {
          ctx.body = {
            result: 0,
            message: "删除成功",
            data: null,
          };
        } else {
          throw "error";
        }
      });
    } catch (err) {
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //根据id查找数据
  async articleSelectOne(ctx, next) {
    const { id } = ctx.request.body;
    try {
      const res = await serviceSelectOne(id);
      if (res) {
        ctx.body = {
          result: 0,
          message: "查询成功",
          data: {
            ...res,
          },
        };
      } else {
        throw "error";
      }
    } catch (err) {
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //分页
  async articlePage(ctx, next) {
    const {
      page: pageNum = 1,
      rows: pageSize = 10,
      ...obj
    } = ctx.request.query;
    try {
      const res = await servicePage(pageNum, pageSize, obj);
      ctx.body = {
        result: 0,
        message: "查询成功",
        data: {
          ...res,
        },
      };
    } catch (err) {
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }
}

module.exports = new ArticleController();
