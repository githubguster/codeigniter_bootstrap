var path = require('path');
// var webpack = require('webpack');
var TerserPlugin = require('terser-webpack-plugin');
var MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
var CopyPlugin = require('copy-webpack-plugin');

var NODE_DIR = path.resolve(__dirname, '../../node_modules');

var JAVASCRIPT_LIBRARY = [
    path.join(NODE_DIR, 'jquery/dist/jquery.min.js'),
    path.join(NODE_DIR, 'react/umd/react.production.min.js'),
    path.join(NODE_DIR, 'react-dom/umd/react-dom.production.min.js'),
    path.join(NODE_DIR, 'redux/dist/redux.min.js'),
    path.join(NODE_DIR, 'react-redux/dist/react-redux.min.js'),
    path.join(NODE_DIR, '@popperjs/core/dist/umd/popper.min.js'),
    path.join(NODE_DIR, 'bootstrap/dist/js/bootstrap.min.js'),
    // path.join(NODE_DIR, '@fortawesome/fontawesome-free/js/all.min.js'),
    path.join(NODE_DIR, 'react-bootstrap/dist/react-bootstrap.min.js'),
];

var CSS_LIBRARY = [
    path.join(NODE_DIR, 'bootstrap/dist/css/bootstrap.min.css'),
    path.join(NODE_DIR, '@fortawesome/fontawesome-free/css/all.min.css'),
];

module.exports = {
    mode: 'production',
    entry: JAVASCRIPT_LIBRARY,
    // resolve: {
    //     alias: {
    //         'react': path.join(NODE_DIR, 'react/umd/react.production.min.js'),
    //         'react-dom': path.join(NODE_DIR, 'react-dom/umd/react-dom.production.min.js'),
    //         'jquery': path.join(NODE_DIR, 'jquery/dist/jquery.min.js'),
    //     }
    // },
    output: {
        filename: 'js/components_public.min.js',
        path: path.resolve(__dirname, '../dist'),
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({  
        })],
    },
    module: {
        rules: [{
            test: /\.jsx$|\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env']
                }
            }
        }, {
            test: /\.css$/i,
            exclude: /node_modules/, 
            use: {
                loader: 'css-loader',
                options: {
                    presets: ['style-loader', 'css-loader']
                }
            }
        }]
    },
    externals: {
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // })
        new MergeIntoSingleFilePlugin({
            files: {
                'js/components_public_library.min.js': JAVASCRIPT_LIBRARY,
                'css/components_public_library.min.css': CSS_LIBRARY,
            }
        }),
        new CopyPlugin({
            patterns:[{
                from: path.join(NODE_DIR, '@fortawesome/fontawesome-free/webfonts'),
                to: 'webfonts'
            }],
        }),
    ]
}