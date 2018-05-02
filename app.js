/**************
 *date:20170519
 *author:pan
 *info:express
 */
var express = require('express');
var app = express();

// 设置静态目录
app.use( express.static('public') );
//get请求
app.get('/',function(req, res){
	res.send('第一个express')
});
//监听端口
app.listen(7777,function(){
	console.log('run at 127.0.0.1:7777');
});