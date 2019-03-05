const path = require('path'),
    webpack = require('webpack'),
    babiliPlugin = require('babili-webpack-plugin'),
    extractTextPlugin = require('extract-text-webpack-plugin'),
    optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    htmlPlugin = require('html-webpack-plugin');

let plugins = [];

//Gera arquivo index.html com os imports de css e js
plugins.push(new htmlPlugin({
    hash: true,
    minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true
    },
    filename: 'index.html',
    template: path.resolve(__dirname, 'main.html')
}));

//Cria arquivo styles.css a partir de todos os css selecionados no module.rules
plugins.push(new extractTextPlugin('styles.css'));

//Add variaveis globais, dentro do closure do bundle
plugins.push(new webpack.ProvidePlugin({
    '$': 'jquery/dist/jquery.js',
    'jQuery': 'jquery/dist/jquery.js'
}));

//Separa em chunks
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js'
}));

let SERVICE_URL = JSON.stringify("http://localhost:3000") ;

if (process.env.NODE_ENV == 'production') {

    SERVICE_URL = JSON.stringify("http://endero-producao:3000") ;
    //otimização de modulos
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
    // minificação de js
    plugins.push(new babiliPlugin());
    //minificação de css
    plugins.push(new optimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true
    }));
}

plugins.push(new webpack.DefinePlugin({
    SERVICE_URL
}));

module.exports = {
    entry: {
        app: './app-src/app.js',
        vendor: ['jquery', 'bootstrap', 'reflect-metadata']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        //publicPath: 'dist' usado quando o index.html não era gerado automaticamente
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                //loader: 'style-loader!css-loader'
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            // {
            //     test: /.(svg|jpg|png|ttf|woff|woff2|eot)$/,
            //     loader: 'file-loader'
            // }
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins
}