const path = require('path');

// use for cookie sign key, should change to your own and keep security
exports.keys = 'mysite-server_1619336153310_6069';

// add your middleware config here
exports.middleware = ['responseFomatter'];
exports.responseFomatter = {
  ignore: ['/static', '/res'],
};

// mongoose
exports.mongoose = {
  url: 'mongodb://127.0.0.1/mysite',
  options: {
    useUnifiedTopology: true,
  },
};

// 初始化的管理员信息
exports.admin = {
  loginId: 'admin',
  loginPwd: '123123',
  name: '超级管理员',
};

// 自定义错误处理
const constErrorMsg = {
  401: '未登录，或登录已过期',
  404: '服务器没有对应的资源',
  500: '服务器内部错误',
  406: '验证错误',
};
exports.onerror = {
  all(err, ctx) {
    ctx.logger.error(err); // 记录日志

    // 设置响应内容
    // 设置正确的code值
    let code = +err.code || ctx.status;
    let msg = err.message || constErrorMsg[code];
    // 设置正确的msg值
    ctx.set('content-type', 'application/json');
    ctx.status = 200;
    if (code === 500) {
      msg = constErrorMsg[code];
    }

    ctx.body = JSON.stringify({
      code,
      msg,
      data: null,
    });
  },
};

// 关闭csrf
exports.security = {
  csrf: false,
};

// validate
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

// static
exports.static = {
  prefix: '/static/',
  maxAge: 2 * 365 * 24 * 60 * 60, // 缓存两年
};

// multipart for uploaders
exports.multipart = {
  fileSize: '1mb', // max size 2mb
  whitelist: [
    // images
    '.jpg',
    '.jpeg', // image/jpeg
    '.png', // image/png, image/x-png
    '.gif', // image/gif
    '.bmp', // image/bmp
    '.wbmp', // image/vnd.wap.wbmp
    '.webp',
    '.tif',
    'svg',
  ],
  mode: 'file',
  tmpdir: path.resolve(__dirname, '../app', './public', 'upload_temp'),
};