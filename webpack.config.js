require('es6-promise').polyfill();
var path = require('path');
module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { 
              test: /\.js$/,
              loader: 'babel',
              exclude: /(node_modules|bower_components)/,
              query: {
                  plugins: ['transform-runtime'],
                  presets: ['es2015', 'stage-0']
              }
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass"
            }
        ]
    }
};
