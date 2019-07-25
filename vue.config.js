// module.exports = {
//     assetsDir: "static",
//     configureWebpack: {
//         /**
//          * Setting the global object is necessary to make the loading of web-workers work. Otherwise, window is referenced
//          * in the produced bundle, which is not accessable from a worker context. This seems to be a webpack 4 bug
//          * https://github.com/webpack/webpack/issues/6642
//          * https://github.com/webpack/webpack/issues/6629
//          */
//         output: {
//             globalObject: 'self',
//         },
//         module: {
//             rules: [{
//                     test: /\.worker\.js$/,
//                     use: [{ loader: 'worker-loader', options: {publicPath: '/static/js/'} }, { loader: 'babel-loader' }],
//                 },
//             ],
//         },
//     },
//     chainWebpack: config => {
//         config.module
//             .rule('vue')
//             .test(/\.vue$/)
//             .use('iview-loader')
//             .loader('iview-loader')
//             .options({
//                 prefix: true
//             });

//         // config.module.rule('js').exclude.add(/\.worker\.js$/);
//     }
// }

module.exports = {
    assetsDir: "static",
    configureWebpack: config => {
        if (process.env.NODE_ENV == 'production') {
            // 为生产环境修改配置...
            config.output.globalObject = 'self';
            config.module.rules.unshift({
                test: /\.worker\.js$/,
                use: [{ loader: 'worker-loader', options: {publicPath: '/static/js/'}}, { loader: 'babel-loader' }],
            });
        } else {
            // 为开发环境修改配置...
            config.output.globalObject = 'self';
            config.module.rules.unshift({
                test: /\.worker\.js$/,
                use: [{ loader: 'worker-loader'}, { loader: 'babel-loader' }],
            });
        }
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

        // config.module.rule('js').exclude.add(/\.worker\.js$/);
    }
}