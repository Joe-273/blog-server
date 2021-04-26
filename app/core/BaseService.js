const Service = require('egg').Service;

class BaseService extends Service {
  validate(rules, obj) {
    try {
      this.ctx.validate(rules, obj);
    } catch (e) {
      console.log(e);
      this.throw(406, JSON.stringify(e.errors));
    }
  }

  throw(code, message) {
    this.ctx.app.error.throw(code, message);
  }

  getPagerOptions(options) {
    options.page = +options.page || 1;
    options.limit = +options.limit || 10;
    options.keyword = options.keyword || '';
    return options;
  }
}

module.exports = BaseService;
