
const path = require('path');
const isProd= process.env.NODE_ENV =='production';
module.exports = (context) => {
  const { webpack } = context;
  return {
    move:{
        "from":path.resolve(__dirname, 'dist'),
        "to":path.resolve(__dirname, '../../dist/react')
    },
    webpack: {
      entry: {},
      output: {
        publicPath:isProd?"/ko-resouce/react/":"/"
      },
      module: {
        rules: [
          {
            test: /\.md$/,
            loader : 'raw-loader'
          }
        ]
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