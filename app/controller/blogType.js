const Controller = require('egg').Controller;

class BlogTypeController extends Controller {
  async add() {
    this.ctx.body = await this.ctx.service.blogType.add(this.ctx.request.body);
  }

  async findOne() {
    this.ctx.body = await this.ctx.service.blogType.findOne(this.ctx.params.id);
  }

  async update() {
    this.ctx.body = await this.ctx.service.blogType.update(
      this.ctx.params.id,
      this.ctx.request.body
    );
  }

  async remove() {
    this.ctx.body = await this.ctx.service.blogType.remove(this.ctx.params.id);
  }

  async index() {
    this.ctx.body = await this.ctx.service.blogType.findAll();
  }
}

module.exports = BlogTypeController;
