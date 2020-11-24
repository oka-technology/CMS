import path from 'path';
import { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __DEV__: boolean = process.env.NODE_ENV !== 'production';

export default (): Configuration => ({
  mode: __DEV__ ? 'development' : 'production',
  optimization: {
    minimizer: [new TerserPlugin({})],
  },
  entry: path.resolve(__dirname, 'src/tsx/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template.html',
    }),
  ],
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileonly: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.php$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'api/',
        },
      },
      {
        test: /\.htaccess$/i,
        loader: 'file-loader',
        options: {
          name: '[name]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
});
