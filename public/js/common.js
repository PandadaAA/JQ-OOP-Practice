/************
 *date=201707
 *author:pan
 *info:js通用方法
 */

//获取id方法
function getId(n){
	return document.getElementById(n);
}

//ajax公共方法
function getAjax(_url,callback){
	$.ajax({
		url:_url,
		type:'get',
		dataType:'json',
		success:function(d){
			callback(d);
		},
		error:function(d){
			callback(JSON.parse(d.responseText));
		}
	})
};

//跨域的ajax公共方法
function getAjaxJsonp(_url,callback){
	$.ajax({
		url:_url,
		type:'get',
		dataType:'jsonp',
		jsonp:'callback',
		success:function(d){
			callback(d);
		},
		error:function(d){
			callback(JSON.parse(d.responseText));
		}
	})
};


//全站网页头部
function getHeader(){
		$.ajax({
		url:'../component/header.html',
		type:'get',
		dataType:'html',
		success:function(d){
			var _headerId=$('#headerId');
			_headerId.prepend(d);
		}
	})
}
getHeader();	


//获取不同产品pid
function gatParam(_url ,_pid ,callback){
	$.ajax({
		url:_url,
		type:'get',
		data:'cc=' + _pid,
		dataType:'jsonp',
		jsonp:'jsoncallback',
		success:function(d){
			callback(d);
		},
		error:function(d){
			callback(JSON.parse(d.responseText));
		}
	});
}

//单个商品计算总价数量
function getCartJsonp(_url ,_d ,callback){
	$.ajax({
		url:_url,
		type:'get',
		data:'cart=' + _d,
		dataType:'jsonp',
		jsonp:'jsoncallback',
		success:function(d){
			callback(d);
		},
		error:function(d){
			callback(JSON.parse(d.responseText));
		}
	});
}//它需要的参数格式是数组  '[{"num"=3,"price"=3698}]'

//被选中商品计算总价数量
function checkGoodsJsonp(_url ,_d ,callback){
	$.ajax({
		url:_url,
		type:'get',
		data:'goods=' + _d,
		dataType:'jsonp',
		jsonp:'jsoncallback',
		success:function(d){
			callback(d);
		},
		error:function(d){
			callback(JSON.parse(d.responseText));
		}
	});
}//它需要的参数格式是字符串 