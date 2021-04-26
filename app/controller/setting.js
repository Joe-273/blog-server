const Controller = require('egg').Controller;

class SettingController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.setting.find();
  }

  async update() {
    const { ctx } = this;
    ctx.body = await ctx.service.setting.update(ctx.request.body);
  }
}

module.exports = SettingController;
