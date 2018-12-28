
const path = require('path');
module.exports = (context) => {
  const { webpack } = context;
  return {
    move:{
        "from":path.resolve(__dirname, 'dist'),
        "to":path.resolve(__dirname, '../../gh-pages') ///Users/charlesyang/space/workspace/team/kangaroo-resource/gh-page/block"
    },
    webpack: {
      entry: {},
      output: {},
      module: {
        rules: []
      },
      resolve:{
        alias: {
          block: path.resolve(__dirname, '../../react-resource/blocks'),
          assets :path.resolve(__dirname,'public/assets'),
          layout:path.resolve(__dirname, 'src/layout'),
          components:path.resolve(__dirname, 'src/components')

        }
      }
    }
  };
};