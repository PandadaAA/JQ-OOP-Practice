/************
 *date=201707
 *author:pan
 *info:首屏轮播图 OO版本
 */

$(function(){
//首屏轮播图 oo版本
	var sliderConfig = {
		toLeftBtn : $('#toLeftBtn'),
 		toRightBtn : $('#toRightBtn'),
 		sliderUl : $ ('#sliderUl'),
 		iconList : $ ('#iconList'),
 		olBg: $ ('#olBg')
	}
	new SliderWodule(sliderConfig);
});


//构造器 (请大写首字母)
 function SliderWodule(_config){
 	for(var i in _config){
 		this[i]=_config[i];//for in 遍历
 	}
 	this.numI =0;
 	this.init();//init是一个公共方法
}

//prptoytpe --原型
SliderWodule.prototype = {
	init:function(){
		var _self= this;
		_self.ereateSliderImg();//ereateSliderImg在这里调用，被init带出去
	},
//取得图片的宽度、高度
	getImgAttr:function(){
		var _self= this;
		var _imgs=_self.sliderUl.find('img');
		var attrObj={};
		attrObj['num']=(_imgs.length-1);
		attrObj['imgW']=_imgs.eq(0).width();
		return attrObj;
	},
//小圆点点击事件
	lisClick:function(){
		var _self= this;
		var _lisClick=_self.iconList.children();
		_lisClick.on('click',function(){
			var _this=$(this);
			_this.attr('class','active')
				 .siblings()
				 .removeAttr('class');
			_self.numI=$(this).index();
			ulStyle(_self.sliderUl, _self.numI, _self.getImgAttr().imgW);
		});
	},
//左侧按钮
	toLeftBtnEvent:function(){
		var _self= this;
		_self.toLeftBtn.on('click',function(){
			if (_self.numI<_self.getImgAttr().num) {	
				_self.numI++;
			}else{
				_self.numI=0;
			}
			_self.sliderDot(_self.numI);
			_self.ulStyle(_self.sliderUl, _self.numI, _self.getImgAttr().imgW);
		});
	},
//右侧按钮
	toRightBtnEvent:function(){
		var _self= this;
		_self.toRightBtn.on('click',function(){
			if (_self.numI>0) {
				_self.numI--;
			}else{
				_self.numI=_self.getImgAttr().num;
			}
			_self.sliderDot(_self.numI);
			_self.ulStyle(_self.sliderUl, _self.numI, _self.getImgAttr().imgW);
		});
	},
//图片滚动位置
	ulStyle:function(sliderUl, numI, imgW){
		var _self= this;
		sliderUl.stop().animate({
			left: '-' + (numI * imgW)
		},500);
	},
//左右按钮改变小圆点样式
	sliderDot:function(_number){
		var _self= this;
		var _lisClick=_self.iconList.children();
		_lisClick.eq(_number)
			.attr('class','active')
			.siblings()
			.removeAttr('class');
	},
//创建小圆点
	createDot:function(_length){
		var _self= this;
		for( var i=0; i<_length; i++){
			$('<li/>',{}).appendTo(_self.iconList);
		}
		_self.iconList.children().eq(0).attr('class','active');
		var iconW=_self.iconList.children().eq(0).width();
		var iconListW=(iconW+20) * _length;

		_self.iconList.css({
			'width':iconListW,
			'margin-left':'-'+iconListW/2+'px'
		});
		_self.olBg.css({
			'width':iconListW,
			'margin-left':'-'+iconListW/2+'px'
		});
	},
//获取轮播图片
	ereateSliderImg:function(){
		var _self= this;
		getAjax(APILIST.sliderImg,function(d){
			var _length=d.imgs.length;
			var _sliderUl=$('#sliderUl');

			for(var i=0; i<_length; i++){
				$('<li/>',{}).html(function(){
					$('<img/>',{})
						.attr('src',d.imgs[i].url)
						.appendTo($(this))
				}).appendTo(_sliderUl)
			}
			//在生成了轮播图片后，调用其他事件
			_self.getImgAttr();
			_self.createDot(_length);
			_self.lisClick();
			_self.toLeftBtnEvent();
			_self.toRightBtnEvent();
		});
	}
}
