// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/prefix/api/user/list': {
        target: 'http://banyuekeji.f3322.net:8888/',
        pathRewrite: {
          '^/prefix': ''
        }
      }
    },
  }
}
