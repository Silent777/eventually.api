const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const IstanbulPlugin = require ('webpack-istanbul-plugin');
const path = require('path');
const isCoverage = process.env.NODE_ENV === 'coverage';

const config = {
    entry: './all-test.js',
    output: {
        path: path.join(__dirname,''),
        filename: 'testBundle.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    node: {
        fs: 'empty'
    },

    module: {

        loaders: [
            {
                test: /\.jsx?/,
                include: path.join(__dirname, 'eventually/static/'),
                loader: 'babel-loader'
            }
        ],
        rules: [].concat(
        {
          test: /\.js/,
          include: path.join(__dirname, 'eventually/static/'),
          loader: 'istanbul-instrumenter-loader'
         },
      {
          test: /.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
      },
      )
    },

    plugins: [
        new WebpackShellPlugin({
            onBuildExit: 'mocha testBundle.js'
        }),
    ]
};

module.exports = config;
