module.exports = () => async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    ctx.app.error.throw(404);
  }
  ctx.status = 200;
  ctx.body = {
    code: 0,
    msg: '',
    data: ctx.body,
  };
};
