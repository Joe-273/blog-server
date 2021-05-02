/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  const auth = app.middleware.auth();
  // admin
  router.post(
    '/api/admin/login',
    app.middleware.captcha(),
    app.middleware.passport(),
    controller.admin.login
  );
  router.get('/api/admin/whoami', auth, controller.admin.profile);
  router.put('/api/admin', auth, controller.admin.update);

  // setting
  router.get('/api/setting', controller.setting.index);
  router.put('/api/setting', auth, controller.setting.update);

  // blogtype
  router.post('/api/blogtype', auth, controller.blogType.add);
  router.put('/api/blogtype/:id', auth, controller.blogType.update);
  router.delete('/api/blogtype/:id', auth, controller.blogType.remove);
  router.get('/api/blogtype', controller.blogType.index);

  // blog
  router.post('/api/blog', auth, controller.blog.add);
  router.put('/api/blog/:id', auth, controller.blog.update);
  router.delete('/api/blog/:id', auth, controller.blog.remove);
  router.get('/api/blog', controller.blog.index);
  router.get('/api/blog/:id', controller.blog.find);

  // captcha
  router.get('/res/captcha', controller.captcha.index);

  // upload
  router.post('/api/upload', auth, controller.upload.index);

  // comment
  router.post('/api/comment', app.middleware.limit(), controller.message.add);
  router.delete('/api/comment/:id', auth, controller.message.remove);
  router.get('/api/comment', controller.message.findComments);

  // message
  router.post('/api/message', app.middleware.limit(), controller.message.add);
  router.delete('/api/message/:id', auth, controller.message.remove);
  router.get('/api/message', controller.message.findMessages);

  // about
  router.post('/api/about', auth, controller.about.update);
  router.get('/api/about', controller.about.find);
};
