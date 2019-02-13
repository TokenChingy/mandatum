// vue.config.js
module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.tokenchingy.mandatum',
        productName: 'Mandatum',
        copyright: 'Copyright © 2019 TokenChingy;',
        directories: {
          buildResources: '/build',
        },
        mac: {
          icon: 'build/icon.png',
          darkModeSupport: true,
        },
        win: {
          icon: 'build/icon.png',
        },
      },
    },
  },
};
