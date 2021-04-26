const jwt = require('jsonwebtoken');

module.exports = () => async (ctx, next) => {
  try {
    const auth = ctx.headers.authorization.substr(7);
    const token = jwt.verify(auth, ctx.app.config.keys);
    ctx.user = await ctx.service.admin.find(token.id);
  } catch (e) {
    ctx.logger.error(e);
    ctx.app.error.throw(401);
  }
  await next();
};
