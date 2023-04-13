// sirve para identificar la ruta de donde se encuentra este archivo 
const path = requiere('path');

//me permite trabajar con documentos html//
const HtmlwebpackPlubing = requiere('html-webpack-plugin');

// estrae el codigo css, minificarlos y optimizarlos.Ademas lo agrega como parte de heade
const MiniCssExtractPlugin = ('mini-css-extract-plugin')

//nos permite copiar archivos de una ruta o otra
const CopyWebpackPlugin = requiere('copy-webpack-plugin')

module.exports = (env, argv) => {
    // operadores en javascript, que diferencia existe entre el operador == y el ===
    const IsProduction = argv.mode === 'production';

    return {
        entry: {
            index: './src/index.js',
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [

                {
                    test: /\.css$/,
                    use: [
                        IsProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src/assets/js'),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presents: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        plugins: [
            new HtmlwebpackPlubing({
                template: './src/index..html',
                chunks: ['index']
            }),
            //para que sirve un spread operator
            ...(IsProduction ? [new MiniCssExtractPlugin({ filename: 'assets/css/[name].[contenthash].css' })] : [])
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            open: true,
            hot: true,
            watchFiles: [
                'src/**/*'
            ]
        }
    }

}