module.exports = {
  presets: [["@vue/app", { useBuiltIns: "entry" }]]
};
/***
 * module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // 可选链插件, 其他babel插件也是一样的安装方式
    "@babel/plugin-proposal-optional-chaining",
    // 按需引入
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
 *
 * **/
