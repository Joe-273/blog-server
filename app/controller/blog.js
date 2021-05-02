const Controller = require('egg').Controller;

class BlogController extends Controller {
  async add() {
    this.ctx.body = await this.ctx.service.blog.add(this.ctx.request.body);
  }

  async update() {
    this.ctx.body = await this.ctx.service.blog.update(
      this.ctx.params.id,
      this.ctx.request.body
    );
  }

  async remove() {
    this.ctx.body = await this.ctx.service.blog.remove(this.ctx.params.id);
  }

  async find() {
    await this.ctx.service.blog.increaseScanNumber(this.ctx.params.id);
    this.ctx.body = await this.ctx.service.blog.find(this.ctx.params.id);
  }

  async index() {
    this.ctx.body = await this.ctx.service.blog.pager(this.ctx.query);
  }
}

module.exports = BlogController;
