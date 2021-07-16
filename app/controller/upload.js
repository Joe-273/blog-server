const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

function randomName() {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}-${Math.random()
    .toString(16)
    .substr(2, 5)}`;
}

class UploadController extends Controller {
  async index() {
    const { ctx } = this;
    if (!ctx.request.files || ctx.request.files.length === 0) {
      ctx.app.error.throw(406, '服务端无法找到上传的文件数据');
    }
    if (ctx.request.files.length > 1) {
      ctx.app.error.throw(406, '服务端目前仅支持单个文件上传');
    }
    

    // 处理上传逻辑
    const file = ctx.request.files[0];
    const name = randomName();
    const ext = path.extname(file.filename);
    const basename = name + ext;
    const dest = path.join(__dirname, '../public/upload', basename);
    const url = ctx.app.config.static.prefix + 'upload/' + basename;
    await fs.promises.rename(file.filepath, dest);
    ctx.body = url;
  }

  async addUploadImageURL(){
    this.ctx.body = await this.ctx.service.upload.add(this.ctx.request.body);
  }

  async findAllImageURL(){
    this.ctx.body = await this.ctx.service.upload.findAll();
  }

  async removeImage(){
    this.ctx.body = await this.ctx.service.upload.delImage(this.ctx.params.id);
  }
}

module.exports = UploadController;
