const {createProxyMiddleware} = require('http-proxy-middleware');

let options={
    target: 'http://fly.xyz', // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
        '^/api': '/api', 
      },
  };

module.exports = function(app) {
app.use(createProxyMiddleware("/api",options))
};