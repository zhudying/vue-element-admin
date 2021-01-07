
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const isProduction = ["production", "prod", 'test'].includes(process.env.NODE_ENV);
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  publicPath: "/", // 公共路径
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  outputDir: process.env.outputDir, // 不同的环境打不同包名
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "src/styles/variables.scss")]
      // preProcessor: "less",
      // patterns: [
      //   // 这个是加上自己的路径，
      //   // 注意：试过不能使用别名路径
      //   path.resolve(__dirname, "src/styles/variables.less")
      // ]
    }
  },
  lintOnSave: false, // 关闭eslint
  productionSourceMap: false, // 生产环境下css 分离文件
  // css相关配置
  devServer: {
    // 配置服务器
    port: 8113,
    open: true,
    https: false,
    // disableHostCheck: true,
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    proxy: {
      "/api/*": {
        target: process.env.VUE_APP_URL, // 目标 API 地址
        ws: true, // 是否代理 websockets
        changOrigin: true, // 跨域配置
        pathRewrite: {
          "^/api": "/"
        }
      },
      // "/common/*": {
      //   target: process.env.VUE_APP_MIPA_URL, // 目标 API 地址
      //   ws: true, // 是否代理 websockets
      //   changOrigin: true, // 跨域配置
      //   pathRewrite: {
      //     "^/common": "/"
      //   }
      // }
    }
  },
  // 兼容ie10
  // webpack配置
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload');
    // ie 兼容,与main.js引入，存在一个就可
    // config.entry("main").add("babel-polyfill");
    // 别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@i", resolve("src/assets/image"));
    if (isProduction) {
      config.optimization.delete("splitChunks");
    }
    // 压缩图片
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     bypassOnDebug: true
    //   })
    // .end()
    return config;
  },
  // 配置webpack
  configureWebpack: config => {
    const plugins = [];
    if (isProduction) {
      // 开启gzip压缩
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false // 删除原文件
        })
      );
      // 利用 splitChunks 单独打包第三方模块
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            common: {
              name: "chunk-common",
              chunks: "all",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 1,
              reuseExistingChunk: true,
              enforce: true
            },
            vendors: {
              name: "chunk-vendors",
              test: /[\\/]node_modules[\\/]/,
              chunks: "all",
              priority: 2,
              reuseExistingChunk: true,
              enforce: true
            },
            styles: {
              name: 'chunk-styles',
              test: /\.(sa|sc|le|c)ss$/,
              chunks: 'all',
              enforce: true,
            },
            elementUI: {
              name: "chunk-element-ui",
              test: /[\\/]node_modules[\\/]element-ui[\\/]/,
              chunks: "all",
              priority: 3,
              reuseExistingChunk: true,
              enforce: true
            },
            echarts: {
              name: "chunk-echarts",
              test: /[\\/]node_modules[\\/]echarts[\\/]/,
              chunks: "all",
              priority: 4,
              reuseExistingChunk: true,
              enforce: true
            },
            vue: {
              name: "chunk-vue",
              test: /[\\/]node_modules[\\/]vue[\\/]/,
              chunks: "all",
              priority: 5,
              reuseExistingChunk: true,
              enforce: true
            },
            xlsx: {
              name: "chunk-xlsx",
              test: /[\\/]node_modules[\\/]xlsx[\\/]/,
              chunks: 'all',
              priority: 6,
              reuseExistingChunk: true,
              enforce: true
            },
            runtimeChunk: {
              name: 'manifest'
            }
          }
        }
      };
      // 去除consollog
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            // 删除注释
            output: {
              comments: false
            },
            compress: {
              // warnings: false,
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"] //移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  }
};
