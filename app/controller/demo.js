const Controller = require('egg').Controller;

class DemoController extends Controller {
  async add() {
    this.ctx.body = await this.ctx.service.demo.add(this.ctx.request.body);
  }

  async remove() {
    this.ctx.body = await this.ctx.service.demo.remove(this.ctx.params.id);
  }

  async update() {
    this.ctx.body = await this.ctx.service.demo.update(
      this.ctx.params.id,
      this.ctx.request.body
    );
  }

  async index() {
    this.ctx.body = await this.ctx.service.demo.findAll();
  }
}

module.exports = DemoController;
