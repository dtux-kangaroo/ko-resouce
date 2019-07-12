const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProd= process.env.NODE_ENV =='production';
module.exports = (context) => {
  // const { webpack } = context;
  return {
   
    move:{
      "from":path.resolve(__dirname, 'dist'),
      "to":path.resolve(__dirname, '../../../dist/trade')
    },
    server: {
      "host": '127.0.0.1',
      "port": "8090"
    },
    proxy: [{
      "path": '/api/v1',
      // "target": 'http://172.16.0.74:8080', 
      "target": 'http://172.16.8.163:7001/proxy/9',

      "changeOrigin": true
    }],
    dll:["react","react-dom","react-router",
        "moment","mirror-creator","lodash",
        "echarts","echarts-wordcloud",'roo-tool',
        "immutable","classnames",'object-assign'
    ],
    webpack: {
       entry: {
       index:path.resolve(__dirname,'src/index.tsx')
       },
       output: {
        publicPath:isProd?"/ko-resouce/trade/":"/"
       },
      module: {
        rules: []
      },
      plugins:[
        new CopyWebpackPlugin([ 
            {from: path.resolve(__dirname,'public/config'),to:'config'},
            {from: path.resolve(__dirname,'public/mock'),to:'mock'},
            {from: path.resolve(__dirname,'public/assets'),to:'assets'},
          ]),
      ],
      externals :{
        'FRONT_CONF': 'FRONT_CONF',
      }
    }
  };
};