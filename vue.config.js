const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  // 线上环境隐藏源码，保障代码安全性；测试环境不隐藏，确保查询问题
  productionSourceMap: !(process.env.NODE_ENV === 'production' && process.env.VUE_APP_FLAG === 'pro'),
  chainWebpack: config => {
    // 首屏按需加载，防止一开始把所有的js全一口气给下载下来
    config.plugins.delete('prefetch')
  },
  configureWebpack: config => {
    // Gzip压缩
    if (process.env.NODE_ENV === 'production') {
      // 为测试环境、生产环境修改配置
      config.mode = 'production'
      return {
        plugins: [
          new CompressionPlugin({
            // 匹配文件名
            test: /\.js$|\.html$|\.css/,
            // 对文件大小大于0的的进行压缩
            threshold: 0,
            // 是否删除原文件
            deleteOriginalAssets: false
          })
        ]
      }
    }
  }
}
