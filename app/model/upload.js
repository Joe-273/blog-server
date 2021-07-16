// 上传文件数据模型
module.exports = ({ mongoose }) => {
    const Schema = mongoose.Schema;
  
    const UploadSchema = new Schema(
      {
        url: String
      },
      {
        timestamps: false,
        versionKey: false,
        strict: true,
      }
    );
    return mongoose.model('Upload', UploadSchema, "upload");
  };
  