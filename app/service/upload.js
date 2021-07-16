const Service = require('../core/BaseService');
const fs = require('fs');

class UploadService extends Service {
    // 添加图片 URL
    async add(data) {
        return await this.ctx.model.Upload.create(data);
    }

    // 查找所有的图片
    async findAll(){
        return await this.ctx.model.Upload.find();
    }

    // 根据 id 查找一张图片信息
    async findOne(id){
        return await this.ctx.model.Upload.findById(id);
    }

    // 删除图片
    async delImage(id){
        var imageInfo = await this.findOne(id);
        var imageName = imageInfo.url.split('/')[3]
        var path = __dirname + '/../public/upload/' + imageName;
        await fs.unlinkSync(path); // 从服务器上删除文件
        return await this.ctx.model.Upload.remove({_id : id}) // 从数据库移除记录
    }
}

module.exports = UploadService;
