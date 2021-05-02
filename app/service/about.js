const Service = require('../core/BaseService');

class AboutService extends Service {
  async update(url) {
    const about = await this.ctx.model.About.findOne();
    about.url = url || '';
    await about.save();
    return about;
  }

  async find() {
    return await this.ctx.model.About.findOne();
  }
}

module.exports = AboutService;
