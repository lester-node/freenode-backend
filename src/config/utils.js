module.exports = {
  removeEmptyObj: (obj) => {
    if (Object.prototype.toString.call(obj) === "[object Object]") {
      let returnObj = {};
      for (let value in obj) {
        if (!!obj[value]) {
          returnObj = {
            ...returnObj,
            [value]: obj[value],
          };
        }
      }
      return returnObj;
    }
    return {};
  },
};
