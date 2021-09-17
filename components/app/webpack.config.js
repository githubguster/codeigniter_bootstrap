var path = require('path');
var TerserPlugin = require('terser-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [{
    mode: 'production',
    entry: ['./js/app.tsx'],
    output: {
        filename: 'js/bootstrap_reactjs.min.js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']  
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({  
        })],
    },
    module: {
        rules: [{
            test: /\.jsx?$|\.tsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript']
                }
            }
        }, {
            test: /\.css$|\.scss$|\.sass$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        }]
    },
    externals: {
        'react': 'React',
        'react-dom' : 'ReactDOM',
        'jquery': '$',
        'prop-types': 'PropTypes',
        'react-bootstrap': 'ReactBootstrap',
    }
}, {
    mode: 'production',
    entry: ['./css/app.scss'],
    output: {
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
      extensions: ['.css', '.scss', '.sass']  
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({  
        })],
    },
    module: {
        rules: [{
            test: /\.css$|\.scss$|\.sass$/,
            exclude: /node_modules/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/bootstrap_reactjs.min.css',
        }),
    ],
}];