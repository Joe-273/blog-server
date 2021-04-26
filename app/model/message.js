module.exports = ({ mongoose }) => {
  const Schema = mongoose.Schema;

  const MessageSchema = new Schema(
    {},
    {
      timestamps: false,
      versionKey: false,
      strict: true,
    }
  );
  return mongoose.model('Message', MessageSchema);
};
