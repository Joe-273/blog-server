const jwt = require('jsonwebtoken');

module.exports = () => async (ctx, next) => {
  const body = ctx.request.body;
  const user = await ctx.service.admin.login(body);
  ctx.user = user;
  if (user) {
    const remember = +body.remember || 1;
    const maxAge = remember * 24 * 3600;

    const token = jwt.sign({ id: user._id }, ctx.app.config.keys, {
      expiresIn: maxAge,
    });
    // 添加到响应头
    ctx.set('authentication', token);
  }
  await next();
};
