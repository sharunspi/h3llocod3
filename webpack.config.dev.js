const webpack = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = 'development'
module.exports = {
    mode: 'development',
    target: 'web',
    devTool:'cheap-module-source-map',
    entry:'./src/index',
    output:{
        path: path.resolve(__dirname,"build"),
        publicPath:'/',
        filename:'bundle.js'
    },
    devServer:{
        states:'minimal',
        overlay:true,
        historyApiFallback:true,
        disableHostCheck:true,
        headers:{"Access-Control-Allow-Origin":"*"},
        https:false
    },
    plugin:[
        new htmlWebpackPlugin({
            template:"src/index.html",
            favicon:"src/favicon.ico"
        })
    ],
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node-modules/,
                use:["babel-loader"]
            },
            {
                test:/\.(.css)$/,
                use:["style-loader","css-loader"]
            }
        ]
    }

}