const Controller = require('egg').Controller;

class AdminController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.body = await ctx.service.admin.login(ctx.request.body);
  }

  async profile() {
    const { ctx } = this;
    ctx.body = ctx.user;
  }

  async update() {
    const { ctx } = this;
    ctx.body = await ctx.service.admin.update(ctx.request.body, ctx.user);
  }
}

module.exports = AdminController;
