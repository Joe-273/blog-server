const Controller = require('egg').Controller;

class MessageController extends Controller {
  async add() {
    this.ctx.body = await this.ctx.service.message.add(this.ctx.request.body);
  }

  async remove() {
    this.ctx.body = await this.ctx.service.message.remove(this.ctx.params.id);
  }

  async findComments() {
    let blogId = this.ctx.query.blogid;
    if (blogId == -1 || !blogId) {
      // 不按blogid查询
      blogId = { $ne: null, $exists: true };
    }
    this.ctx.query.blogid = blogId;

    this.ctx.body = await this.ctx.service.message.pager(this.ctx.query);
  }

  async findMessages() {
    this.ctx.query.blogid = null;
    this.ctx.body = await this.ctx.service.message.pager(this.ctx.query);
  }
}

module.exports = MessageController;
