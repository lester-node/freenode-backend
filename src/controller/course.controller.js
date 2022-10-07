const {
  serviceList,
  servicePage,
  serviceCreate,
  serviceUpdate,
  serviceDelete,
  serviceSelectOne,
} = require("../service/course.service");

const CourseArticle = require("../model/courseArticle.model");

const Course = require("../model/course.model");

class CourseController {
  //枚举
  async courseList(ctx, next) {
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
  //树
  async courseTree(ctx, next) {
    try {
      const res = await serviceList();
      const arr = [];
      await Promise.all(
        res.map(async (item) => {
          return new Promise(async (resolve) => {
            let res = await CourseArticle.findAll({
              where: { courseId: item.id, show: true },
            });
            resolve(res);
          });
        })
      ).then((val) => {
        res.map((item, index) => {
          arr.push({
            title: item.name,
            key: item.id,
            children: val[index].map((itemA) => ({
              title: itemA.title,
              key: itemA.id,
              isLeaf: true,
            })),
          });
        });
        if (val) {
          ctx.body = {
            result: 0,
            message: "查询成功",
            data: arr,
          };
        } else {
          throw "error";
        }
      });
    } catch (err) {
      console.log("文章树错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }
  //新增
  async courseCreate(ctx, next) {
    try {
      const res = await serviceCreate(ctx.request.body);
      ctx.body = {
        result: 0,
        message: "新增教程成功",
        data: {
          ...res,
        },
      };
    } catch (err) {
      console.log("教程新增错误", err);
      if (err.name == "SequelizeUniqueConstraintError") {
        ctx.body = {
          result: 1,
          message: "教程标题名或权重不能重复",
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
  async courseUpdate(ctx, next) {
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
      console.log("教程修改错误", err);
      if (err.name == "SequelizeUniqueConstraintError") {
        ctx.body = {
          result: 1,
          message: "教程标题名或权重不能重复",
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
  async courseChangeShow(ctx, next) {
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
      console.log("教程修改展示错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //删除（删的时候要在分类表减去相应的数量）
  async courseDelete(ctx, next) {
    const { ids } = ctx.request.body;
    try {
      await Promise.all(
        ids.map(async (id) => {
          return new Promise(async (resolve) => {
            let res = await Course.findOne({
              where: { id },
            });
            resolve(res.dataValues);
          });
        })
      ).then(async (res) => {
        let judge = res.every((item) => item.articleTotalNum == 0);
        if (judge) {
          const res = await serviceDelete(ids);
          if (res) {
            ctx.body = {
              result: 0,
              message: "删除成功",
              data: null,
            };
          } else {
            throw "error";
          }
        } else {
          ctx.body = {
            result: 1,
            message: "删除的分类总文章数必须为0",
            data: null,
          };
        }
      });
    } catch (err) {
      console.log("类型删除错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //根据id查找数据
  async courseSelectOne(ctx, next) {
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
      console.log("教程根据id查找错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //分页
  async coursePage(ctx, next) {
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
      console.log("教程分页错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }
}

module.exports = new CourseController();
