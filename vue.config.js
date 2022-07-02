const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
   // 关闭语法检查
  lintOnSave:false,
  productionSourceMap: false // 生产环境不产生未加密的map文件
})



