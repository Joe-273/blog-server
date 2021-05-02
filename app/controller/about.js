const Controller = require('egg').Controller;

class AboutController extends Controller {
  async find() {
    this.ctx.body = await this.ctx.service.about.find();
  }

  async update() {
    this.ctx.body = await this.ctx.service.about.update(
      this.ctx.request.body.url
    );
  }
}

module.exports = AboutController;
