module.exports = ({ mongoose }) => {
  const Schema = mongoose.Schema;

  const AboutSchema = new Schema(
    {
      url: String,
    },
    {
      timestamps: false,
      versionKey: false,
      strict: true,
    }
  );
  AboutSchema.methods.toJSON = function () {
    const obj = mongoose.Document.prototype.toJSON.call(this);
    console.log(obj.url);
    return obj.url;
  };
  return mongoose.model('About', AboutSchema);
};
