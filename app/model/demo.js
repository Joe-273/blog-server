module.exports = ({ mongoose }) => {
  const Schema = mongoose.Schema;

  const DemoSchema = new Schema(
    {
      name: String,
      url: String,
      github: String,
      description: [String],
      thumb: String,
      order: Number,
    },
    {
      timestamps: false,
      versionKey: false,
      strict: true,
    }
  );
  return mongoose.model('Demo', DemoSchema, 'project');
};
