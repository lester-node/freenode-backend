const {
  serviceList: articleServiceList,
  servicePage,
  serviceCreate,
  serviceUpdate,
  serviceDelete,
  serviceSelectOne,
  serviceClassifyTotal,
  serviceTagTotal,
} = require("../service/article.service");

const {
  serviceList: courseArticleServiceList,
} = require("../service/courseArticle.service");

const Article = require("../model/article.model");

class ArticleController {
  //新增
  async articleCreate(ctx, next) {
    try {
      const res = await serviceCreate(ctx.request.body);
      if (res.classifyId && res.show == true) {
        serviceClassifyTotal(res.classifyId, "createTrue", "add");
      } else if (res.classifyId && res.show == false) {
        serviceClassifyTotal(res.classifyId, "createFalse", "add");
      }
      if (res.tagId && res.show == true) {
        res.tagId?.split(",").map((id) => {
          serviceTagTotal(id, "createTrue", "add");
        });
      } else if (res.tagId && res.show == false) {
        res.tagId?.split(",").map((id) => {
          serviceTagTotal(id, "createFalse", "add");
        });
      }
      ctx.body = {
        result: 0,
        message: "新增文章成功",
        data: {
          ...res,
        },
      };
    } catch (err) {
      console.log("文章新增错误", err);
      if (err.name == "SequelizeUniqueConstraintError") {
        ctx.body = {
          result: 1,
          message: "文章标题名不能重复",
          data: null,
        };
      } else {
        ctx.body = {
          result: 1,
          message: "操作失败",
          data: null,
        };
      }
    }
  }

  //修改
  async articleUpdate(ctx, next) {
    try {
      const articleOne = await serviceSelectOne(ctx.request.body.id);
      if (articleOne.classifyId != ctx.request.body.classifyId) {
        articleOne.classifyId &&
          serviceClassifyTotal(articleOne.classifyId, "delete", "sub", 1);
        if (ctx.request.body.show) {
          serviceClassifyTotal(
            ctx.request.body.classifyId,
            "createTrue",
            "add"
          );
        } else {
          serviceClassifyTotal(
            ctx.request.body.classifyId,
            "createFalse",
            "add"
          );
        }
      } else {
        if (articleOne.show != ctx.request.body.show) {
          if (ctx.request.body.show) {
            serviceClassifyTotal(articleOne.classifyId, "update", "add");
          } else {
            serviceClassifyTotal(articleOne.classifyId, "update", "sub", 1);
          }
        }
      }
      if (articleOne?.tagId != ctx.request.body.tagId) {
        Promise.all(
          articleOne.tagId
            ? articleOne.tagId?.split(",").map(async (id) => {
                return new Promise(async (resolve) => {
                  await serviceTagTotal(id, "delete", "sub", 1);
                  resolve();
                });
              })
            : []
        ).then(() => {
          if (ctx.request.body.show) {
            ctx.request.body.tagId?.split(",").map((id) => {
              serviceTagTotal(id, "createTrue", "add");
            });
          } else {
            ctx.request.body.tagId?.split(",").map((id) => {
              serviceTagTotal(id, "createFalse", "add");
            });
          }
        });
      } else {
        if (articleOne.show != ctx.request.body.show) {
          if (ctx.request.body.show) {
            ctx.request.body.tagId?.split(",").map((id) => {
              serviceTagTotal(id, "update", "add");
            });
          } else {
            ctx.request.body.tagId?.split(",").map((id) => {
              serviceTagTotal(id, "update", "sub", 1);
            });
          }
        }
      }
      let sendObj = {
        ...ctx.request.body,
        classifyId: ctx.request.body.classifyId ?? null,
        classifyName: ctx.request.body.classifyName ?? null,
        tagId: ctx.request.body.tagId ?? null,
        tagName: ctx.request.body.tagName ?? null,
      };
      const res = await serviceUpdate(sendObj);
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
      console.log("文章修改错误", err);
      if (err.name == "SequelizeUniqueConstraintError") {
        ctx.body = {
          result: 1,
          message: "文章标题名不能重复",
          data: null,
        };
      } else {
        ctx.body = {
          result: 1,
          message: "操作失败",
          data: null,
        };
      }
    }
  }

  //是否展示
  async articleChangeShow(ctx, next) {
    try {
      const { show, id } = ctx.request.body;
      const res = await serviceUpdate({ show: show ? 1 : 0, id });
      const articleOne = await serviceSelectOne(id);
      if (articleOne.classifyId && articleOne.show == true) {
        serviceClassifyTotal(articleOne.classifyId, "update", "add");
      } else if (articleOne.classifyId && articleOne.show == false) {
        serviceClassifyTotal(articleOne.classifyId, "update", "sub", 1);
      }
      if (articleOne.tagId && articleOne.show == true) {
        articleOne.tagId?.split(",").map((id) => {
          serviceTagTotal(id, "update", "add");
        });
      } else if (articleOne.tagId && articleOne.show == false) {
        articleOne.tagId?.split(",").map((id) => {
          serviceTagTotal(id, "update", "sub", 1);
        });
      }
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
      console.log("文章修改展示错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //删除（删的时候要在分类表减去相应的数量）
  async articleDelete(ctx, next) {
    const { ids } = ctx.request.body;
    let arrA = [];
    let arrB = [];
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
              arrA.length > 0
                ? arrA.findIndex(
                    (itemA) => itemA?.classifyId == item?.classifyId
                  )
                : -1;
            if (index > -1) {
              arrA.splice(index, 1, {
                classifyId: item.classifyId,
                num: arrA[index].num + 1,
              });
            } else {
              arrA.push({ classifyId: item.classifyId, num: 1 });
            }
          });
        arrA.map((item) => {
          serviceClassifyTotal(item.classifyId, "delete", "sub", item.num);
        });
        let resA = [];
        res
          .filter((item) => item.tagId)
          .map((item) => {
            item.tagId.split(",").map((id, index) => {
              resA.push({
                ...item,
                tagId: id,
                tagName: item.tagName.split(",")[index],
              });
            });
          });
        resA
          .filter((item) => item.tagId)
          .map((item) => {
            let index =
              arrB.length > 0
                ? arrB.findIndex((itemA) => itemA?.tagId == item?.tagId)
                : -1;
            if (index > -1) {
              arrB.splice(index, 1, {
                tagId: item.tagId,
                num: arrB[index].num + 1,
              });
            } else {
              arrB.push({ tagId: item.tagId, num: 1 });
            }
          });
        arrB.map((item) => {
          serviceTagTotal(item.tagId, "delete", "sub", item.num);
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
      console.log("文章删除错误", err);
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
      console.log("文章根据id查找错误", err);
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
      console.log("文章分页错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //过滤不展示的分页
  async articleFilterPage(ctx, next) {
    const {
      page: pageNum = 1,
      rows: pageSize = 10,
      ...obj
    } = ctx.request.query;
    let sendObj = {
      ...obj,
      show: true,
    };
    try {
      const res = await servicePage(pageNum, pageSize, sendObj);
      ctx.body = {
        result: 0,
        message: "查询成功",
        data: {
          ...res,
        },
      };
    } catch (err) {
      console.log("文章分页错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //获取文章的list
  async articleList(ctx, next) {
    const { title } = ctx.request.query;
    try {
      const articleRes = await articleServiceList({ title });
      if (articleRes) {
        ctx.body = {
          result: 0,
          message: "查询成功",
          data: [...articleRes],
        };
      } else {
        throw "error";
      }
    } catch (err) {
      console.log("获取教程文章和文章列表错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }
}

module.exports = new ArticleController();
