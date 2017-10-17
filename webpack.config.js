import path from 'path'
import webpack from 'webpack'
import cssNextPlugin from 'postcss-cssnext'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import pkg from './package.json'

const projDir = __dirname;
const srcDir = path.join(projDir, 'src')
const assetsDir = path.join(srcDir, 'assets')
const nodeModulesDir = path.join(projDir, 'node_modules')
const buildDir = path.join(projDir, 'build')

const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  devtool: 'source-map',
  entry: {
    app: path.join(srcDir, 'index.js')
  },
  output: {
    path: buildDir,
    filename: '[name].js'
  },
  resolve: {
    alias: {
      common: path.join(srcDir, 'common'),
      gateway: path.join(srcDir, 'gateway'),
      dashboard: path.join(srcDir, 'dashboard'),
      store: path.join(srcDir, 'store'),
      nodeModules: nodeModulesDir
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: srcDir,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      include: srcDir,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: [
              cssNextPlugin
            ]
          }
        }]
      })
    }, {
      test: /\.css$/,
      include: nodeModulesDir,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(jpg|png|eot|svg|ttf|woff)$/,
      include: assetsDir,
      loader: 'file-loader'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.includes('node_modules')
      }
    }),
    new ExtractTextPlugin('styles.css')
  ]
};

const envConfigs = {
  development: {
  },
  production: {
    plugins: baseConfig.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_frames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      })
    ])
  }
};

export default { ...baseConfig, ...envConfigs[env]}
