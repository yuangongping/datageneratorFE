module.exports = {
    assetsDir: "static",
    configureWebpack: {
        /**
         * Setting the global object is necessary to make the loading of web-workers work. Otherwise, window is referenced
         * in the produced bundle, which is not accessable from a worker context. This seems to be a webpack 4 bug
         * https://github.com/webpack/webpack/issues/6642
         * https://github.com/webpack/webpack/issues/6629
         */
        output: {
            globalObject: 'self',
        },
        module: {
            rules: [{
                    test: /\.worker\.js$/,
                    use: [{ loader: 'worker-loader' }, { loader: 'babel-loader' }],
                },
                {
                    test: /\.worker\.ts$/,
                    use: [{ loader: 'worker-loader' }, { loader: 'babel-loader' }, { loader: 'ts-loader' }],
                },
            ],
        },
    },
    chainWebpack: config => {
        config.module
            .rule('vue')
            .test(/\.vue$/)
            .use('iview-loader')
            .loader('iview-loader')
            .options({
                prefix: true
            });

        config.module.rule('js').exclude.add(/\.worker\.js$/);
    }
}