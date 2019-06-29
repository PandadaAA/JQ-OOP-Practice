/***********
 *date=201707
 *author:pan
 *info:产品详情页
 */


//入口
$(function(){
	productDetailFn();

	new createSmallImg();

	new addressMenuFn();

	new chooseGoods();
});

// 产品详情页pid,输出内容
 function productDetailFn(){
 	var _url = location.href;
	var _n = _url.indexOf('?')+5;
	var _pid = _url.substring(_n);
	//console.log( _pid );

	gatParam(APILIST.param, _pid, function(d){
		$('#h1Id').html(d.title);
		$('#h2Id').html(d.pInfo);
		$('#h3Id').html(d.info);
	})
 };

//产品大小图
function createSmallImg(){
	this.bigDivId=$('#bigDivId');
	this.bigImgId=$('#bigImgId');
	this.imgPopId=$('#imgPopId');
	this.zoomImgId=$('#zoomImgId');

	this.leftBtnId=$('#leftBtnId');
	this.smallImgListId=$('#smallImgListId');
	this.rightBtnId=$('#rightBtnId');
	this.count=0;
	this.init();
}

createSmallImg.prototype={
	init:function(){
		var _self=this;
		_self.getAjax();
	},
	getAjax:function(){
		var _self=this;
		getAjaxJsonp(APILIST.smallImgData,function(d){
			_self.modifyBigImgSrc(d.smallImg);
			_self.createSmallLiList(d.smallImg);
			_self.helfMaskEvent();
			_self.moveEvent();
		})
	},
//打开页面时第一张大图
	modifyBigImgSrc:function(_d){
		var _self=this;
		var _bigImg=_d[0].bigImg


		_self.bigImgId.attr('src', _bigImg);
		_self.localBigImg( _bigImg );
	},
//小图列表
	createSmallLiList:function(_d){
		var _self=this;
		var _length=_d.length;

		for(var i=0; i<_length; i++){
			$('<li/>',{})
				.attr('data-bigImg',_d[i].bigImg)
				.html('<img src="'+_d[i].imgurl+'">')
				.on('click',function(){
					_self.smallImgEvent($(this).attr('data-bigImg'))
				})
				.appendTo(_self.smallImgListId);
		}
	},
//小图点击切换大图src
	smallImgEvent:function(_bigImg){
		var _self=this;

		_self.bigImgId.attr('src',_bigImg);
		_self.localBigImg( _bigImg );
	},
//半遮罩小图
	helfMaskEvent:function(){
		var _self=this;

		_self.bigDivId.on('mousemove',function(e){
			var _eX=e.pageX;
			var _eY=e.pageY;
			var _this = $(this);
			var moveDiv=_this.offset();
			var _w=100;
			//限制水平方向
			if( (_eX - _w) < moveDiv.left ){
				_eX = moveDiv.left + _w;
			} else if( (_eX+_w) > ( moveDiv.left + _this.width() ) ){
				_eX = moveDiv.left + _this.width() - _w;
			}
			//限制垂直方向
			if( (_eY - _w ) < moveDiv.top ){
				_eY = moveDiv.top + _w;
			} else if( (_eY + _w) > (moveDiv.top + _this.height()) ){
				_eY = (moveDiv.top + _this.height() - _w);
			}			

			_self.imgPopId.css({
				'display':'block',
				'left':_eX - moveDiv.left - _w,
				'top':_eY - moveDiv.top - _w
			})

			//缩略图的坐标
			var _xynum={};
			_xynum['left']=_eX-moveDiv.left-_w;
			_xynum['top']=_eY-moveDiv.top-_w;

			_self.localBigImgMove(_xynum);
		});

		_self.bigDivId.on('mouseleave',function(){
			_self.imgPopId.css('display','none')
		});
	},
//左右按钮入口
	moveEvent:function(){
		var _self=this;
		_self.leftMoveEvent();
		_self.rightMoveEvent();
	},
//左按钮
	leftMoveEvent:function(){
		var _self=this;
		_self.leftBtnId.on('click',function(){
			if(_self.count<0){
				_self.count++;
				_self.ulAnimate(_self.count);
			}
		});
	},
//右按钮
	rightMoveEvent:function(){
		var _self=this;
		_self.rightBtnId.on('click',function(){
			if(_self.count>-5){
				_self.count--;
				_self.ulAnimate(_self.count);
			}
		});				
	},
//按钮动画
	ulAnimate:function(_count){
		var _self=this;
		_self.smallImgListId.stop().animate({
			'left':_count*60
		},500);	
	},
//缩略图
	localBigImg:function(_bigImgUrl){
		var _self=this;	

		_self.bigDivId.on({
			mousemove:function(){
				_self.zoomImgId.css('display','block')
			},
			mouseout:function(){
				_self.zoomImgId.css('display','none')
			}
		});

		$('<img>',{})
			.attr('src',_bigImgUrl)
			.appendTo(_self.zoomImgId);
	},
//缩略图移动坐标
	localBigImgMove:function(_xynum){
		var _self=this;	

		_self.zoomImgId.children('img').css({
			'left':-(_xynum.left*2),
			'top':-(_xynum.top*2)
		});		
	}		
};


//选择购物数量
function chooseGoods(){
	this.buyNumId=$('#buyNumId');
	this.buyAddId=$('#buyAddId');
	this.buyReduceId=$('#buyReduceId');

	this.count=1;
	this.init();
}

chooseGoods.prototype={
	init:function(){
		var _self=this;
		_self.chooseNum();
		_self.addBtnEvent();
		_self.reduceBtnEvent();
	},
	chooseNum:function(){
		var _self=this;
		_self.buyNumId.on('focus',function(){
			_self.buyNumId.val('');
		});
		_self.buyNumId.on('blur',function(){
			_self.count=$(this).val();

			if( 1<_self.count<999 ){
			_self.count=$(this).val();
			_self.buyNumId.val(_self.count);
			}else{
				alert('请输入正确数量');
				_self.count=1;
			}
		});
	},
	addBtnEvent:function(){
		var _self=this;
		_self.buyAddId.on('click',function(){
			if(_self.count<10){
				_self.count++;
				_self.buyNumId.val(_self.count);
			}else{
				alert('库存不足');
			}
		});
	},
	reduceBtnEvent:function(){
		var _self=this;
		_self.buyReduceId.on('click',function(){
			if(_self.count>1){
				_self.count--;
				_self.buyNumId.val(_self.count);
			}else{
				alert('请选择正确数目');
			}
		});
	}
};
