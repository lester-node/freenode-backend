const {
  serviceList,
  servicePage,
  serviceCreate,
  serviceDelete,
  serviceUpdate,
  serviceSelectOne,
} = require("../service/classify.service");

const Classify = require("../model/classify.modal");

class ClassifyController {
  //枚举
  async classifyList(ctx, next) {
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

  //分页
  async classifyPage(ctx, next) {
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
      console.log("类型分页错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //新增
  async classifyCreate(ctx, next) {
    try {
      const res = await serviceCreate(ctx.request.body);
      ctx.body = {
        result: 0,
        message: "新增分类成功",
        data: {
          ...res,
        },
      };
    } catch (err) {
      console.log("类型新增错误", err);
      if (err.name == "SequelizeUniqueConstraintError") {
        ctx.body = {
          result: 1,
          message: "文章标题名不能重复",
          data: null,
        };
      } else {
        ctx.body = {
          result: 1,
          message: "类型新增操作失败",
          data: null,
        };
      }
    }
  }

  //删除（删的时候判断文章数不为0）
  async classifyDelete(ctx, next) {
    const { ids } = ctx.request.body;
    try {
      await Promise.all(
        ids.map(async (id) => {
          return new Promise(async (resolve) => {
            let res = await Classify.findOne({
              where: { id },
            });
            resolve(res.dataValues);
          });
        })
      ).then(async (res) => {
        let judge = res.every((item) => item.articleTotal == 0);
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
            message: "删除的分类文章数必须为0",
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

  //是否展示
  async classifyChangeShow(ctx, next) {
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
      console.log("类型修改展示错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //根据id查找数据
  async classifySelectOne(ctx, next) {
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
      console.log("类型根据id查找错误", err);
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //修改
  async classifyUpdate(ctx, next) {
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
      console.log("类型修改错误", err);
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
}

module.exports = new ClassifyController();
