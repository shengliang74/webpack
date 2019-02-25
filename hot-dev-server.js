const express = require('express');
const app = express();
const path = require('path');
const proxy = require('http-proxy-middleware');

var compiler = null;
(function(){
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.dev.js');
    var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

    webpackConfig.entry.book1 = [hotMiddlewareScript, webpackConfig.entry.book1];
    webpackConfig.entry.book2 = [hotMiddlewareScript, webpackConfig.entry.book2];
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        // Use NoErrorsPlugin for webpack 1.x
        new webpack.NoEmitOnErrorsPlugin()
    )

    compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler,{
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));
    
    app.use(require('webpack-hot-middleware')(compiler,{ heartbeat: 5000 }));
})()

// app.get("/", function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

// app.get("/index2", function(req, res) {
//     res.sendFile(__dirname + '/index2.html');
// });

// app.get("/book1", function(req, res) {
//     res.sendFile(__dirname + '/book1.html');
// });

// 路由
app.get('/:viewname?', function(req, res, next) {
    
    // var viewname = req.params.viewname 
    //     ? req.params.viewname + '.html' 
    //     : 'index.html';
    // var filepath = path.join(compiler.outputPath, viewname);
    
    // 使用webpack提供的outputFileSystem
    // compiler.outputFileSystem.readFile(filepath, function(err, result) {
    //     if (err) {
    //         // something error
    //         return next(err);
    //     }
    //     res.set('content-type', 'text/html');
    //     res.send(result);
    //     res.end();
    // });

    var viewname = req.params.viewname 
        ? req.params.viewname + '.html' 
        : 'index.html';
    console.log(viewname,"viewname");
    // viewname = "book2.html";
    var filepath = path.join(compiler.outputPath, viewname);
    console.log(filepath, "filepath");
    compiler.outputFileSystem.readFile(filepath, function(err, result) {
        if (err) {
            // something error
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});

//代理
app.use('/jquery', proxy({ target: 'https://cdn.bootcss.com', changeOrigin: true }));

app.listen(3001, function(){
    console.log("Example app listening on port 3000");
})
