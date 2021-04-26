module.exports = () => async (ctx, next) => {
  try {
    const captcha = ctx.request.body.captcha.toLowerCase();
    const sessionCaptcha = ctx.session.captcha;
    ctx.session.captcha = null;
    if (sessionCaptcha !== captcha) {
      ctx.app.error.throw(406, '验证码错误');
    }
  } catch (e) {
    ctx.logger.error(e);
    ctx.app.error.throw(406, '验证码错误');
  }
  await next();
};
