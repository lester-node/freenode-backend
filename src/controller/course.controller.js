const {
  servicePage,
  serviceCreate,
  serviceUpdate,
  serviceDelete,
  serviceSelectOne,
} = require("../service/course.service");

class CourseController {
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
          message: "教程标题名不能重复",
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
          message: "教程标题名不能重复",
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
    let sendRes;
    try {
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
    } catch (err) {
      console.log("教程删除错误", err);
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
