/************
 *date=201707
 *author:pan
 *info:首屏侧边菜单 OO版本 
 */

$(function(){
//首屏侧边菜单 oo版本
	var subNavConfig = {
		subNavUlId: $ ('#subNavUlId')
	}
	new SubNavModule(subNavConfig);
});


//构造器 (请大写首字母)
 function SubNavModule(_config){
 	 for(var i in _config){
 		this[i]=_config[i];//for in 遍历
 	}
 	this.init();
 }

//prototype --原型
SubNavModule.prototype={
	init:function(){
		var _self=this;
		_self.getData();
	},
//创建菜单li
	createLi:function(_d, _length){
		var _self=this;
		for(var i=0; i<_length; i++ ){
			$('<li/>',{}).html(function(){
				var _selfLi=$(this);

				$('<a>',{})
					.html(_d[i].type)
					.appendTo(_selfLi);

				$('<div>',{'class':'popMenu'})
					.html(function(){
						var _products=_d[i].products;					
						for(var j=0; j<_products.length;j++)
							$('<p>',{})
								.html(_products[j].name)
								.on('click',function(){
									_self.clickEvent($(this));
								})							
								.appendTo($(this));
					})
					.appendTo(_selfLi);
			}).appendTo(_self.subNavUlId);
	  	}
	},
//菜单li内的点击事件
	clickEvent:function(_this){
		var _self=this;
		alert(_this.html());
	},
//获取侧边菜单数据
	getData:function(){
		var _self=this;
		getAjax(APILIST.subNavApi,function(d){
			var _d = [];
			if(d.responseText) {
				_d = JSON.parse(d.responseText).productList;
			}else{
				_d=d.productList	
			}
			var _length=_d.length;
			_self.createLi(_d, _length);
		});
	}	
}