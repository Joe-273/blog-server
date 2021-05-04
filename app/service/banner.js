const Service = require('../core/BaseService');

class BannerService extends Service {
  async findAll() {
    return await this.ctx.model.Banner.find({});
  }

  async update(banners) {
    await this.ctx.model.Banner.remove();
    return await this.ctx.model.Banner.create(banners);
  }
}

module.exports = BannerService;
