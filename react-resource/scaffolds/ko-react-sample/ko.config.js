const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (context) => {
  const { webpack } = context;
  return {
    "server": {
      "host": "127.0.0.1",
      "port": 3002
    },
    "proxy": [{
      "context": ["/auth", "/api"],
      "target": "http://localhost:3000"
    }],
    move: {
      "from": "/Users/charlesyang/space/workspace/team/kangaroo-resource/react-resource/scaffolds/ko-react-sample/dist",
      "to": "/Users/charlesyang/space/workspace/team/kangaroo-resource/gh-pages/ko-react-sample"
    },
    webpack: {
      entry: {},
      output: {},
      module: {
        rules: []
      },
      plugins: [
        new webpack.DefinePlugin({
          ASSETS_VERSION: '0.0.1',
        }),
        new CopyWebpackPlugin([{
          from: path.resolve('dll'),
          to: path.resolve('test')
        }])
      ],
      resolve: {}
    }
  };
};