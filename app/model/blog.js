module.exports = ({ mongoose }) => {
  const Schema = mongoose.Schema;

  const BlogSchema = new Schema(
    {
      title: String,
      categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'BlogType',
      },
      description: String,
      createDate: Number,
      toc: Array,
      htmlContent: String,
      thumb: String,
      scanNumber: Number,
      commentNumber: Number,
    },
    {
      timestamps: false,
      versionKey: false,
      strict: true,
    }
  );
  BlogSchema.methods.toJSON = function () {
    const obj = mongoose.Document.prototype.toJSON.call(this);
    const categoryType = typeof obj.categoryId;
    if (categoryType === 'object') {
      if (obj.categoryId) {
        obj.category = obj.categoryId;
      } else {
        obj.category = null;
      }
      delete obj.categoryId;
    }
    return obj;
  };
  return mongoose.model('Blog', BlogSchema,'blog');
};
