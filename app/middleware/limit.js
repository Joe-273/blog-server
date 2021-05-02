module.exports = () => async (ctx, next) => {
  const {
    duration = 60,
    times = 3,
    message = '您的操作过于频繁，请稍后再试',
    limit = 300,
  } = ctx.app.config.messageLimit;
  const now = Date.now();
  if (!Number.isInteger(ctx.session.times)) {
    ctx.session.times = 0; // 如果这是第一次请求，初始化次数为0
  }
  if (!Number.isInteger(ctx.session.from)) {
    ctx.session.from = now;
  }
  if (!Number.isInteger(ctx.session.timeout)) {
    ctx.session.timeout = duration * 1000; // 设置默认的过期时间
  }
  let curTimes = ++ctx.session.times; // 获取从之前记录的时间开始到现在的请求次数（包括此次）
  const from = ctx.session.from; // 获取上一次记录的时间
  const dis = now - from; // 间隔时间
  const timeout = ctx.session.timeout; // 默认时间

  // 必须保证在timeout时间之内，最多只能达到times次请求
  if (dis > timeout) {
    // 约定的时间已经过去，可以请求了
    curTimes = ctx.session.times = 1;
    ctx.session.from = now;
    ctx.session.timeout = duration * 1000;
  } else {
    // 约定的时间还未过去，看看请求次数是否达标
    if (curTimes > times) {
      // 次数已超过极限值
      ctx.app.error.throw(406, message);
    }
  }

  if (curTimes === times) {
    // 请求次数到达极限值
    ctx.session.from = now; // 重新计时
    ctx.session.timeout = limit * 1000; // 时间被延长
  }

  await next();
};
