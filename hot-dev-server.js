const express = require('express');
const app = express();

(function(){
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');
    webpackConfig.entry.app = ['webpack-hot-middleware/client', webpackConfig.entry.app];
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        // Use NoErrorsPlugin for webpack 1.x
        new webpack.NoEmitOnErrorsPlugin()
    )

    var compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler,{
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));
    
    app.use(require('webpack-hot-middleware')(compiler,{ heartbeat: 5000 }));
})()

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });

app.listen(3001, function(){
    console.log("Example app listening on port 3000");
})
