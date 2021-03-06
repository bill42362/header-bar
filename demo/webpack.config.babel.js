// webpack.config.babel.js
'use strict';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';
const WDS_PORT = 7000;

export default {
    entry: [
        'babel-polyfill', './src/client/js',
    ],
    output: {
        filename: 'js/bundle.js',
        path: `${__dirname}/dist/client/`,
        publicPath: isProd ? `/` : `http://localhost:${WDS_PORT}/`,
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: isProd
                    ? ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            { loader: 'css-loader', },
                            { loader: 'less-loader', },
                        ]
                    })
                    : [
                        { loader: 'style-loader', },
                        { loader: 'css-loader', },
                        { loader: 'less-loader', },
                    ],
            },
            {
                test: /\.css/,
                use: isProd
                    ? ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            { loader: 'css-loader', },
                        ]
                    })
                    : [
                        { loader: 'style-loader', },
                        { loader: 'css-loader', },
                    ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    { loader: 'file-loader', options: {
                        limit: 1024,
                        name: 'img/[name].[ext]',
                    }, },
                    { loader: 'img-loader', options: {
                        enabled: isProd,
                        gifsicle: { interlaced: false },
                        mozjpeg: {
                            progressive: true,
                            arithmetic: false
                        },
                        optipng: false, // disabled 
                        pngquant: {
                            floyd: 0.5,
                            speed: 2
                        },
                        svgo: {
                            plugins: [
                                { removeTitle: true },
                                { convertPathData: false }
                            ]
                        }
                    }, },
                ]
            }
        ]
    },
    plugins: isProd
        ? [ new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }) ]
        : [],
    devtool: isProd ? false : 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
          react: `${__dirname}/node_modules/react`,
        },
    },
    devServer: {
        port: WDS_PORT,
    }
}
