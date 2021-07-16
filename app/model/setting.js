module.exports = ({ mongoose }) => {
  const Schema = mongoose.Schema;

  const SettingSchema = new Schema(
    {
      avatar: String,
      siteTitle: String,
      github: String,
      qq: String,
      qqQrCode: String,
      weixin: String,
      weixinQrCode: String,
      mail: String,
      icp: String,
      githubName: String,
      favicon: String,
    },
    {
      timestamps: false,
      versionKey: false,
      strict: true,
    }
  );
  return mongoose.model('Setting', SettingSchema, 'setting');
};
