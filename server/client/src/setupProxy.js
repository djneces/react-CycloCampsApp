const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    proxy('/api/auth/google', {
      target: 'http://localhost:5000/',
      headers: {
        Connection: 'keep-alive',
      },
    })
  );
  app.use(
    proxy('/api/**', {
      target: 'http://localhost:5000/',
      headers: {
        Connection: 'keep-alive',
      },
    })
  );
};
