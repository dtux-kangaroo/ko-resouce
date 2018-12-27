const path = require('path');

module.exports = (context) => {
  const { webpack } = context;
  return {
    webpack: {
      entry: {},
      output: {},
      module: {
        rules: []
      },
      resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src'),
            '@public': path.resolve(__dirname, 'src/public')
          }
      }
    }
  };
};