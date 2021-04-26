const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');
class CaptchaController extends Controller {
  index() {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: 'iIl10oO',
      noise: 6,
      color: true,
    });
    this.ctx.session.captcha = captcha.text.toLowerCase(); //把验证码中的文本存放到session中
    this.ctx.type = 'image/svg+xml';
    this.ctx.body = captcha.data;
  }
}

module.exports = CaptchaController;
