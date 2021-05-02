const Service = require('../core/BaseService');

class MessageService extends Service {
  async add(info) {
    info = {
      nickname: info.nickname,
      content: info.content,
      blogId: info.blogId || null,
    };
    this.validate(
      {
        nickname: 'string',
        content: 'string',
        blogId: 'string?',
      },
      info
    );
    info.createDate = Date.now();
    const avatars = this.ctx.app.config.avatars;
    info.avatar = avatars[this.ctx.app.utils.getRandom(0, avatars.length)];
    const obj = await this.ctx.model.Message.create(info);
    await this.ctx.model.Blog.updateOne(
      { _id: obj.blogId },
      { $inc: { commentNumber: 1 } }
    );
    return await this.findById(obj._id);
  }

  async findById(id) {
    return await this.ctx.model.Message.findById(id).populate(
      'blogId',
      'id title'
    );
  }

  async remove(id) {
    const msg = await this.findById(id);
    if (!msg) {
      return true;
    }
    if (msg.blogId) {
      // 修改评论数量
      await this.ctx.model.Blog.updateOne(
        { _id: msg.blogId._id },
        { $inc: { commentNumber: -1 } }
      );
    }
    await this.ctx.model.Message.remove({ _id: id });

    return true;
  }

  async pager(options) {
    options = this.getPagerOptions(options);
    options.keyword = options.keyword ? options.keyword.trim() : '';
    const filter = {
      blogId: options.blogid,
    };
    if (options.keyword) {
      filter['$or'] = [
        { nickname: { $regex: options.keyword, $options: 'i' } },
        { content: { $regex: options.keyword, $options: 'i' } },
      ];
    }
    const total = await this.ctx.model.Message.countDocuments(filter);
    const rows = await this.ctx.model.Message.find(filter)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .sort('-createDate')
      .populate('blogId', 'id title');
    return {
      total,
      rows,
    };
  }
}

module.exports = MessageService;
