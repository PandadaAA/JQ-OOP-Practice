/************
 *date=201707
 *author:pan
 *info:首页js 
 */

 /*顶部搜索框*/
function searchFn(){
	$('#inTxt').on({
		focus:function(){$(this).attr('value','');},
		//blur:function(){$(this).attr('value','点我试试');},
	});    //on()封装了js的addEventListener,它可以绑定多个事件
	$('.inButton').on('click',function(){
		alert('你点击了搜索'+ '搜索条件为：'+ $('#inTxt').val());
	});
};


/*首屏轮播图*/
function sliderFn(){
	var numI=0;
	var toLeftBtn = $('#toLeftBtn');
	var toRightBtn = $('#toRightBtn');
	var sliderUl = $('#sliderUl');

	var imgGroup=sliderUl.find('img');
	var maxLength=imgGroup.length-1;
	var imgW=imgGroup.eq(0).width();

//调用生成小圆点的函数
	createDot(imgGroup.length);
//小圆点 点击事件
	var _lisClick=$('#iconList').children()
	_lisClick.on('click',function(){
		var _this=$(this);
		_this.attr('class','active')
			 .siblings()
			 .removeAttr('class');
		numI=$(this).index();
		ulStyle(sliderUl,numI,imgW);

	});

//左按钮点击事件
	toLeftBtn.on('click',function(){
		if (numI<maxLength) {	
			numI++;
		}else{
			numI=0;
		}
		ulStyle(sliderUl,numI,imgW);
		sliderDot(numI);
	});
//右按钮点击事件
	toRightBtn.on('click',function(){
		if (numI>0) {
			numI--;
		}else{
			numI=maxLength;
		}
		ulStyle(sliderUl,numI,imgW);
		sliderDot(numI);
	});
};


//图片滚动位置函数
function ulStyle(sliderUl,numI,imgW){
	sliderUl.stop().animate({
		left: '-' + (numI * imgW)
	},500);
};


//生成小圆点的函数
function createDot(_length){
	var iconList = $('#iconList');

	for( var i=0; i<_length; i++){
		$('<li/>',{}).appendTo(iconList);
	}
	iconList.children().eq(0).attr('class','active');
	var iconW=iconList.children().eq(0).width();
	var iconListW=(iconW+20) * _length;

	iconList.css({
		'width':iconListW,
		'margin-left':'-'+iconListW/2+'px'
	});
	$('#olBg').css({
		'width':iconListW,
		'margin-left':'-'+iconListW/2+'px'
	});

};


/*左右按钮改变小圆点样式*/
function sliderDot(_number){
	var n=$('#iconList').children();
	for (var i = 0; i < 4; i++) {
		n.eq(i).removeAttr('class');
	}
	n.eq(_number).attr('class','active');
};


//调用ajax方法生成轮播图片
function ereateSliderImg(){
	getAjax(APILIST.sliderImg, function(d){
		var _length=d.imgs.length;
		var _sliderUl=$('#sliderUl');

		for(var i=0; i<_length; i++ ){
			$('<li/>',{}).html(function(){
				$('<img/>',{})
					.attr('src',d.imgs[i].url)
					.appendTo( $(this) );
			}).appendTo( _sliderUl )
		}
		sliderFn();//成功获取数据后绑定事件
	})
};

//调用ajax方法生成topNav栏目导航
function topNavColumn(){
	getAjax(APILIST.topNavColumn,function(d){
		var _length=d.topNavs.length;
	 	var _topNavUlId=$('#topNavUlId');

	 	for(var i=0; i<_length; i++ ){

	 		if(d.topNavs[i].borR != undefined){
	 			//有borR的
	 			$('<li/>',{})
	 				.html( d.topNavs[i].column + '<i class="borR"></i>' )
					.appendTo( _topNavUlId );			
	 		}else{
	 			//无borR的
	 			$('<li/>',{})
	 				.html( d.topNavs[i].column )
					.appendTo( _topNavUlId );
	 		}
		}
	});
};


//调用ajax方法生成subNav侧边菜单栏
function createSubNav(){
	getAjax(APILIST.subNavApi,function(d){
		var _d=d.productList;
		var _length=_d.length;
	 	var _subNavUlId=$('#subNavUlId');

	  	for(var i=0; i<_length; i++ ){
			$('<li/>',{}).html(function(){
				var _self=$(this);
				$('<a>',{})
					.html(_d[i].type)
					.appendTo(_self);

				$('<div>',{'class':'popMenu'})
					.html(function(){
						var _products=_d[i].products;					
						for(var j=0; j<_products.length;j++)
							$('<p>',{})
								.html(_products[j].name)							
								.appendTo($(this));
					})
					.appendTo(_self);

			}).appendTo(_subNavUlId);
	  	}
	});
}


//享品质产品列表
function productBlockFn(){
	getAjaxJsonp(APILIST.productBlock,function(d){		
		var _d = d;
		var _length=_d.length;
	 	var _productBlock=$('#productBlock');

	  	for(var i=0; i<_length; i++ ){
	  		$('<a/>',{})
		 		.attr({
		 			'data-oldprice':_d[i].oldprice,
		 			'data-pid':_d[i].pid,
		 			'data-price':_d[i].price,
		 			'href':'productDetail.html?pid=' + _d[i].pid
		 		})
		 		.html(function(){
		 			var _self=$(this);
		 			$('<li/>',{'class':'bg'+(i+1)})
						.html(function(){
							var _self=$(this);
							$('<img/>',{'class':'transitionImg'})
								.attr('src',_d[i].productImg)
								.appendTo(_self);
							$('<dl/>',{'class':'bg'+(i+1)})
								.html(function(){
									var _self=$(this);
									$('<dt/>',{})
										.html(_d[i].name)							
										.appendTo(_self);
									$('<dd/>',{})
										.html(_d[i].describe)							
										.appendTo(_self);
								})
								.appendTo(_self);
						})
						.appendTo(_self);
		 		})
		 		.appendTo(_productBlock);
	  	}
	});
}