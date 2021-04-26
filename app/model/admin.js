module.exports = ({ mongoose }) => {
  const Schema = mongoose.Schema;

  const AdminSchema = new Schema(
    {
      loginId: String,
      name: String,
      loginPwd: String,
    },
    {
      timestamps: false,
      versionKey: false,
      strict: true,
    }
  );
  AdminSchema.methods.toJSON = function () {
    const obj = mongoose.Document.prototype.toJSON.call(this);
    delete obj.loginPwd;
    return obj;
  };
  return mongoose.model('Admin', AdminSchema);
};
