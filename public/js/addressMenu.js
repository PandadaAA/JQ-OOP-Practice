/***********
 *date=201707
 *author:pan
 *info:产品详情页--地址栏菜单
 */

 function addressMenuFn(){
 	this.addressTitleId=$('#addressTitleId');
 	this.addressAllId=$('#addressAllId');

 	this.provinceId=$('#provinceId');
 	this.cityId=$('#cityId');
 	this.areaId=$('#areaId');

 	this.tabA=$('#tabA');
 	this.tabB=$('#tabB');
 	this.tabC=$('#tabC');

 	this.arr=[];
 	this.count=0;
 	this.init();
 }

 addressMenuFn.prototype={
 	init:function(){
 		var _self=this;
 		_self.getAJax();
 		_self.menuShowHide();

 		_self.EventTabA();
 		_self.EventTabB();
 		_self.EventTabC();
 	},
 	getAJax:function(){
 		var _self=this;

 		getAjaxJsonp(APILIST.province,function(d){
 			_self.createDom(d.province, _self.provinceId);
 			_self.provinceItem();
		});
 		getAjaxJsonp(APILIST.city,function(d){
 			_self.createDom(d.city, _self.cityId);
 			_self.cityItem();
		});
 		getAjaxJsonp(APILIST.area ,function(d){
 			_self.createDom(d.area, _self.areaId);
 			_self.areaItem();
		});
 	},
	//菜单显示隐藏
 	menuShowHide:function(){
 		var _self=this;
 		var _count=_self.count;

 		_self.addressTitleId.on('click',function(){
 			if(_count==0){
 				_self.addressAllId.show();
 				_count=1;
 			}else{
 				_self.addressAllId.hide();
 				_count=0;
 			}
 		});
 	},
 	//创建省市区dom
 	createDom:function(_d, _wrap){
 		var _self=this;

 		for(var i=0; i<_d.length; i++){
 			$('<p>',{})
	 			.html(_d[i].name)
	 			.appendTo(_wrap)
 		}
 	},
 	//省的item里的选项点击
 	provinceItem:function(){
 		var _self=this;
 		_self.provinceId.find('p').on('click',function(){
 			var _html=$(this).html();
 			_self.tabA.removeClass('active').html(_html);
 			_self.provinceId.hide();
 			_self.cityId.show();
 			_self.tabB.addClass('active').show().html('请选择市');
 			_self.tabC.hide();

 			_self.addressTitle(_html);
 		});		
 	},
 	//市的item里的选项点击
 	cityItem:function(){
 		var _self=this;

 		_self.cityId.find('p').on('click',function(){
 			var _html=$(this).html();
 			_self.tabB.removeClass('active').html(_html);
 			_self.cityId.hide();
 			_self.areaId.show();
 			_self.tabC.addClass('active').show().html('请选择区');

 			_self.addressTitle(_html);
 		});			 		
 	},
 	//区的item里的选项点击
 	areaItem:function(){
 		var _self=this;

 		_self.areaId.find('p').on('click',function(){
 			var _html=$(this).html();
 			_self.tabC.html(_html);
 			_self.addressTitle(_html);
 			_self.addressAllId.hide();
 			_self.count=0;

 			_self.arr.splice(2,1);
 		});	 				
 	},
 	//省市区title
 	addressTitle:function(n){
 		var _self=this;
 		var _arr=_self.arr;

 		if(_arr.length<3){
 			_arr.push(n); 			
 		}
 		//console.log(_arr);
 		_self.addressTitleId.html('');
 		for(var i=0; i<_arr.length;  i++){
 			$('<p>',{})
 				.html(_arr[i])
 				.appendTo(_self.addressTitleId);
 		}
 	},
 	//tab切换 省
 	EventTabA:function(){
 		var _self=this;

 		_self.tabA.on('click',function(){
 			$(this).addClass('active');
 			_self.tabB.removeClass('active');
 			_self.tabC.removeClass('active');

 			_self.provinceId.show();
 			_self.cityId.hide();
 			_self.areaId.hide();

 			_self.arr.splice(0,3);
 		});		
 	},
 	//tab切换 市
 	EventTabB:function(){
 		var _self=this; 
 		
 		_self.tabB.on('click',function(){
 			_self.tabA.removeClass('active');
 			$(this).addClass('active');
 			_self.tabC.removeClass('active');

 			_self.provinceId.hide();
 			_self.cityId.show();
 			_self.areaId.hide();

 			_self.arr.splice(1,2);
 		});					
 	},
 	//tab切换 区
 	EventTabC:function(){
 		var _self=this; 

 		_self.tabC.on('click',function(){
 			_self.tabA.removeClass('active');
 			_self.tabB.removeClass('active');
 			$(this).addClass('active');

 			_self.provinceId.hide();
 			_self.cityId.hide();
 			_self.areaId.show();
 		});	
 	}
 }