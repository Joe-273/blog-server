const Service = require('../core/BaseService');

class BlogTypeService extends Service {
  async add({ name, order = 1 } = {}) {
    if (!name) {
      this.throw(406, 'name is empty');
    }
    return await this.ctx.model.BlogType.create({
      name,
      order,
      articleCount: 0,
    });
  }

  async findOne(_id) {
    return await this.ctx.model.BlogType.findById(_id);
  }

  async update(_id, info) {
    delete info.articleCount;
    return await this.ctx.model.BlogType.findOneAndUpdate(
      { _id },
      { $set: info },
      { new: true }
    );
  }

  async remove(_id) {
    const bt = await this.ctx.model.BlogType.findById(_id);
    let fluentCount = 0;
    if (bt) {
      fluentCount = bt.articleCount;
      //TODO:修改其下的文章分类为null
      await this.ctx.model.Blog.updateMany(
        {
          categoryId: bt._id,
        },
        { $set: { categoryId: null } }
      );
      await bt.remove();
    }
    return fluentCount;
  }

  async findAll() {
    return await this.ctx.model.BlogType.find().sort('order');
  }
}

module.exports = BlogTypeService;
