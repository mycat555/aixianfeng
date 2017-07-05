var http = require('http');
var url = require('url');
var user = {
	'xm':'123',
	'zs':'123'
}

var server = http.createServer(function (req,res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader('Access-Control-Allow-Headers','Content-Type');
	if (url.parse(req.url).query == 'login' && req.method.toLowerCase() == 'post') {
			function login (usn,pwd) {
				console.log(usn+','+pwd);
				var tag = false;
				if (usn) {
					for (i in user) {
						if (usn == i && pwd == user[i]) {
							res.write('true');
							tag = true;
							break;
						}
					}
					if (!tag) {
						res.write('false');
					}
				} else{
					res.write('未接收到用户名!');
				}
			}
			getPostData(login);
	}else if(url.parse(req.url).query == 'signin' && req.method.toLowerCase() == 'post'){
			function signin (usn,pwd) {
				var tag = false;
				if (usn&&pwd) {
					for (i in user) {
						if (usn == i) {
							res.write('用户名已被占用!');
							tag = true;
							break;
						}
					}
					if (!tag) {
						user[usn] = pwd;
						res.write('true');
						console.log(user);
					}
				} else{
					res.write('用户名和密码不能为空!');
				}
			}
			getPostData(signin);
	}
	else{//每个页面默认都会再发一个/favicon.ico,所以会调用两次
		var postData = '';
		req.addListener('data',function  (data) {
			postData+=data;
		});
		req.addListener('end',function  () {
		});
		res.end('OK');
	}
function getPostData (fn) {//抽出重复代码为函数.功能是获取post方式传来的数据
	var postData = '';
	req.addListener('data',function  (data) {
		postData+=data;
	});
	req.addListener('end',function  () {
		postData = JSON.parse(postData);
		var usn,pwd;
		for (key in postData) {
			if (key == "usn") {
				usn = postData[key];
			}
			if (key == 'pwd') {
				pwd = postData[key];
			}
		}
		fn(usn,pwd);
		res.end();
	})
}
});

server.listen(9001,'127.0.0.1');


