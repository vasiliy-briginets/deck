/*
 * Copyright 2020 Netflix, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const path = require('path');
const basePath = path.join(__dirname, '..', '..', '..', '..');
const NODE_MODULE_PATH = path.join(basePath, 'node_modules');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const exclusionPattern = /(node_modules|\.\.\/deck)/;
const WEBPACK_THREADS = Math.max(require('physical-cpu-count') - 1, 1);

const WATCH = process.env.WATCH === 'true';
const WEBPACK_MODE = WATCH ? 'development' : 'production';
const IS_PRODUCTION = WEBPACK_MODE === 'production';

module.exports = {
  context: basePath,
  mode: WEBPACK_MODE,
  stats: 'minimal',
  watch: WATCH,
  entry: {
    lib: path.join(__dirname, 'src', 'index.ts'),
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js',
    library: '@spinnaker/yandex',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  devtool: 'source-map',
  optimization: {
    minimizer: IS_PRODUCTION
      ? [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            terserOptions: {
              ecma: 6,
              mangle: false,
              output: {
                comments: false,
              },
            },
          }),
        ]
      : [], // disable minification in development mode
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.less', '.html'],
    modules: [NODE_MODULE_PATH, path.resolve('.')],
    alias: {
      '@spinnaker/yandex': path.join(__dirname, 'src'),
      coreImports: path.resolve(
        basePath,
        'app',
        'scripts',
        'modules',
        'core',
        'src',
        'presentation',
        'less',
        'imports',
        'commonImports.less',
      ),
      yandex: path.join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'cache-loader' },
          { loader: 'thread-loader', options: { workers: WEBPACK_THREADS } },
          { loader: 'babel-loader' },
          { loader: 'envify-loader' },
          { loader: 'eslint-loader' },
        ],
        exclude: exclusionPattern,
      },
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'cache-loader' },
          { loader: 'thread-loader', options: { workers: WEBPACK_THREADS } },
          { loader: 'ts-loader', options: { happyPackMode: true } },
          { loader: 'tslint-loader' },
        ],
        exclude: exclusionPattern,
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }],
      },
      {
        test: /\.html$/,
        exclude: exclusionPattern,
        use: [
          { loader: 'ngtemplate-loader?relativeTo=' + path.resolve(__dirname) + '&prefix=yandex' },
          { loader: 'html-loader' },
        ],
      },
      {
        test: /\.(woff|woff2|otf|ttf|eot|png|gif|ico|svg)$/,
        use: [{ loader: 'file-loader', options: { name: '[name].[hash:5].[ext]' } }],
      },
      {
        test: require.resolve('jquery'),
        use: [{ loader: 'expose-loader?$' }, { loader: 'expose-loader?jQuery' }],
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })],
  externals: ['@spinnaker/core', nodeExternals({ modulesDir: '../../../../node_modules' })],
};