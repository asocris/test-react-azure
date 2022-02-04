const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const path = require('path');

module.exports = {
    target: "web",
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader'
        },
            {test: /\.txt$/, use: 'raw-loader'},
            {
                // For pure CSS (without CSS modules)
                test: /\.css$/i,
                exclude: /\.module\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                // For CSS modules
                test: /\.module\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                },
            }],
    },
    plugins: [new HtmlWebpackPlugin({template: './public/index.html'})],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000,
    },
    externals: {
        config: JSON.stringify({
            name: 'Dev Env'
        })
    },
};