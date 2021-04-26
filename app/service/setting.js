const Service = require('../core/BaseService');

class SettingService extends Service {
  async find() {
    return await this.ctx.model.Setting.findOne();
  }

  async update(info = {}) {
    return await this.ctx.model.Setting.findOneAndUpdate(
      {},
      { $set: info },
      { new: true }
    );
  }
}

module.exports = SettingService;
