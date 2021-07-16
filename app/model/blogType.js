module.exports = ({ mongoose }) => {
  const Schema = mongoose.Schema;

  const BlogTypeSchema = new Schema(
    {
      name: String,
      articleCount: Number,
      order: Number,
    },
    {
      timestamps: false,
      versionKey: false,
      strict: true,
    }
  );
  return mongoose.model('BlogType', BlogTypeSchema, "blogType");
};
