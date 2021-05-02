const { static } = require('../../config/config.default');
const Service = require('../core/BaseService');

class BlogService extends Service {
  async blogTypeIdExists(info) {
    if (info.categoryId) {
      const type = await this.ctx.model.BlogType.findById(info.categoryId);
      if (!type) {
        this.throw(406, 'categoryId not exists');
      }
    }
  }

  async find(id) {
    return await this.ctx.model.Blog.findById(id).populate('categoryId');
  }

  async increaseScanNumber(id) {
    await this.ctx.model.Blog.updateOne(
      { _id: id },
      { $inc: { scanNumber: 1 } }
    );
  }

  async add(info) {
    this.validate(
      {
        title: 'string',
        categoryId: 'string',
        description: {
          type: 'string',
          allowEmpty: true,
        },
        createDate: 'int?',
        toc: 'array',
        htmlContent: 'string',
        thumb: {
          type: 'string',
          required: true,
          allowEmpty: true,
        },
      },
      info
    );
    info.thumb = info.thumb || '';
    info.scanNumber = 0;
    info.commentNumber = 0;
    info.createDate = info.createDate || Date.now();
    await this.blogTypeIdExists(info);
    const obj = await this.ctx.model.Blog.create(info);
    await this.ctx.model.BlogType.updateOne(
      { _id: obj.categoryId },
      { $inc: { articleCount: 1 } }
    );
    return await this.find(obj._id);
  }

  async update(id, info) {
    const blog = await this.ctx.model.Blog.findById(id);
    if (!blog) {
      return null;
    }
    this.validate(
      {
        title: 'string',
        categoryId: 'string',
        description: {
          type: 'string',
          allowEmpty: true,
        },
        createDate: 'int',
        toc: 'array',
        htmlContent: 'string',
        thumb: {
          type: 'string',
          required: true,
          allowEmpty: true,
        },
      },
      info
    );
    await this.blogTypeIdExists(info.categoryId);
    // 处理类型
    if (blog.categoryId) {
      // 之前的类别文章数量-1
      await this.ctx.model.BlogType.updateOne(
        { _id: blog.categoryId },
        { $inc: { articleCount: -1 } }
      );
    }
    // 当前类别的文章数量+1
    await this.ctx.model.BlogType.updateOne(
      { _id: info.categoryId },
      { $inc: { articleCount: 1 } }
    );
    await this.ctx.model.Blog.updateOne({ _id: id }, { $set: info });
    return await this.find(id);
  }

  async remove(id) {
    const blog = await this.ctx.model.Blog.findById(id);
    if (blog) {
      if (blog.categoryId) {
        // 修改blogtype的文章数量
        await this.ctx.model.BlogType.updateOne(
          { _id: blog.categoryId },
          { $inc: { articleCount: -1 } }
        );
      }
      // 删除分类下的所有评论
      await this.ctx.model.Message.remove({ blogId: blog._id });
      await blog.remove();
    }
    return true;
  }

  async pager(options) {
    options = this.getPagerOptions(options);
    if (options.categoryid == -1 || !options.categoryid) {
      options.categoryid = -1;
    }
    options.keyword = options.keyword ? options.keyword.trim() : '';
    const filter = {};
    if (options.categoryid !== -1) {
      filter.categoryId = options.categoryid;
    }
    if (options.keyword) {
      filter['$or'] = [
        { title: { $regex: options.keyword, $options: 'i' } },
        { description: { $regex: options.keyword, $options: 'i' } },
      ];
    }
    const total = await this.ctx.model.Blog.countDocuments(filter);
    const rows = await this.ctx.model.Blog.find(filter)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .sort('-createDate')
      .populate('categoryId')
      .select('-htmlContent');
    return {
      total,
      rows,
    };
  }
}

module.exports = BlogService;
