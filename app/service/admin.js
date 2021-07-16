const md5 = require('md5');
const Service = require('../core/BaseService');

class AdminService extends Service {
  async login({loginId, loginPwd}) {
    return await this.ctx.model.Admin.findOne({
      loginId,
      loginPwd: md5(loginPwd),
    });
  }

  async find(id) {
    return await this.ctx.model.Admin.findById(id);
  }

  async update({ loginId, loginPwd, oldLoginPwd, name } = {}, curUser) {
    if (loginId) {
      curUser.loginId = loginId;
    }
    if (name) {
      curUser.name = name;
    }
    if (loginPwd) {
      if (!oldLoginPwd) {
        this.throw(406, '旧密码不可为空');
      }
      if (md5(oldLoginPwd) !== curUser.loginPwd) {
        this.throw(406, '旧密码不正确');
      }
      curUser.loginPwd = md5(loginPwd);
    }
    await curUser.save();
    return curUser;
  }
}

module.exports = AdminService;
