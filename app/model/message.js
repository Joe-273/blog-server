module.exports = ({ mongoose }) => {
  const Schema = mongoose.Schema;

  const MessageSchema = new Schema(
    {
      nickname: String,
      content: String,
      createDate: Number,
      avatar: String,
      blogId: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
      },
    },
    {
      timestamps: false,
      versionKey: false,
      strict: true,
    }
  );
  MessageSchema.methods.toJSON = function () {
    const obj = mongoose.Document.prototype.toJSON.call(this);
    const blogIdType = typeof obj.blogId;
    if (blogIdType === 'object') {
      if (obj.blogId) {
        obj.blog = obj.blogId;
      }
      delete obj.blogId;
    }
    return obj;
  };
  return mongoose.model('Message', MessageSchema);
};
