const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (context) => {
  const { webpack } = context;
  return {
    webpack: {
      entry: {},
      output: {},
      module: {
        rules: []
      },
      plugins:[
        new CopyWebpackPlugin([ 
            {from: path.resolve(__dirname,'public/config'),to:'config'},
            {from: path.resolve(__dirname,'public/mock'),to:'mock'},
            {from: path.resolve(__dirname,'public/assets'),to:'assets'}
          ]),
      ],
      resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@public': path.resolve(__dirname, 'public')
          }
      },
      externals :{
        'FRONT_CONF': 'FRONT_CONF'
      }
    }
  };
};