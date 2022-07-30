const {
  serviceList,
  servicePage,
  serviceCreate,
  serviceUpdate,
  serviceDelete,
  serviceSelectOne,
  serviceCourseTotal,
} = require("../service/courseArticle.service");

const CourseArticle = require("../model/courseArticle.model");

class CourseArticleController {
  //枚举
  async courseArticleList(ctx, next) {
    try {
      const res = await serviceList();
      if (res) {
        ctx.body = {
          result: 0,
          message: "查询成功",
          data: res,
        };
      } else {
        throw "error";
      }
    } catch (err) {
      console.log("类型枚举错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }
  //新增
  async courseArticleCreate(ctx, next) {
    try {
      const res = await serviceCreate(ctx.request.body);
      if (res.courseId && res.show == true) {
        serviceCourseTotal(res.courseId, "createTrue", "add");
      } else if (res.courseId && res.show == false) {
        serviceCourseTotal(res.courseId, "createFalse", "add");
      }
      ctx.body = {
        result: 0,
        message: "新增教程文章成功",
        data: {
          ...res,
        },
      };
    } catch (err) {
      console.log("教程文章新增错误", err);
      if (err.name == "SequelizeUniqueConstraintError") {
        ctx.body = {
          result: 1,
          message: "教程文章标题名、权重不能重复",
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
  async courseArticleUpdate(ctx, next) {
    try {
      const articleOne = await serviceSelectOne(ctx.request.body.id);
      if (articleOne.courseId != ctx.request.body.courseId) {
        articleOne.courseId &&
          serviceCourseTotal(articleOne.courseId, "delete", "sub", 1);
        if (ctx.request.body.show) {
          serviceCourseTotal(ctx.request.body.courseId, "createTrue", "add");
        } else {
          serviceCourseTotal(ctx.request.body.courseId, "createFalse", "add");
        }
      } else {
        if (articleOne.show != ctx.request.body.show) {
          if (ctx.request.body.show) {
            serviceCourseTotal(articleOne.courseId, "update", "add");
          } else {
            serviceCourseTotal(articleOne.courseId, "update", "sub", 1);
          }
        }
      }
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
      console.log("教程文章修改错误", err);
      if (err.name == "SequelizeUniqueConstraintError") {
        ctx.body = {
          result: 1,
          message: "教程文章标题名不能重复",
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
  async courseArticleChangeShow(ctx, next) {
    try {
      const { show, id } = ctx.request.body;
      const res = await serviceUpdate({ show: show ? 1 : 0, id });
      const articleOne = await serviceSelectOne(id);
      if (articleOne.courseId && articleOne.show == true) {
        serviceCourseTotal(articleOne.courseId, "update", "add");
      } else if (articleOne.courseId && articleOne.show == false) {
        serviceCourseTotal(articleOne.courseId, "update", "sub", 1);
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
      console.log("教程文章修改展示错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //删除（删的时候要在分类表减去相应的数量）
  async courseArticleDelete(ctx, next) {
    const { ids } = ctx.request.body;
    let arr = [];
    let sendRes;
    try {
      await Promise.all(
        ids.map(async (id) => {
          return new Promise(async (resolve) => {
            let res = await CourseArticle.findOne({
              where: { id },
            });
            resolve(res.dataValues);
          });
        })
      ).then((res) => {
        res
          .filter((item) => item.courseId)
          .map((item) => {
            let index =
              arr.length > 0
                ? arr.findIndex((itemA) => itemA?.courseId == item?.courseId)
                : -1;
            if (index > -1) {
              arr.splice(index, 1, {
                courseId: item.courseId,
                num: arr[index].num + 1,
              });
            } else {
              arr.push({ courseId: item.courseId, num: 1 });
            }
          });
        arr.map((item) => {
          serviceCourseTotal(item.courseId, "delete", "sub", item.num);
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
      console.log("教程文章删除错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //根据id查找数据
  async courseArticleSelectOne(ctx, next) {
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
      console.log("教程文章根据id查找错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //分页
  async courseArticlePage(ctx, next) {
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
      console.log("教程文章分页错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }
}

module.exports = new CourseArticleController();
