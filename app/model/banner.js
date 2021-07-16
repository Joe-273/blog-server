module.exports = ({ mongoose }) => {
  const Schema = mongoose.Schema;

  const BannerSchema = new Schema(
    {
      midImg: String,
      bigImg: String,
      title: String,
      description: String,
    },
    {
      timestamps: false,
      versionKey: false,
      strict: true,
    }
  );
  return mongoose.model('Banner', BannerSchema, "banner");
};
