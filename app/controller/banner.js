const Controller = require('egg').Controller;

class BannerController extends Controller {
  async index() {
    this.ctx.body = await this.ctx.service.banner.findAll();
  }

  async update() {
    this.ctx.body = await this.ctx.service.banner.update(this.ctx.request.body);
  }
}

module.exports = BannerController;
