MALL = {
	headScroll : function(el){
		// 定义属性
		var doc = $(document),
			box = $(el),
			boxTop = box.offset().top;

		// 滚动时，导航浮动在顶层
		doc.scroll(function(){
			if(doc.scrollTop() > boxTop){
				box.css({
					'background' : 'rgba(0,0,0,0.4)'
				});
			}else{
				box.css({
					'background' : 'rgba(243,69,68,1)'
				});
			}
		});
	},
	scrollAddList : function(el){
		// 定义属性
		var doc = $(document),
			box = $(el),
			list = $('.list',box),
			loading = $('.loading',box),
			loadingTop = loading.offset().top,
			winHeight = $(window).height(),
			isGo = true;

		// 滚动事件
		doc.scroll(function(){
			// 判断超出视图界面时加载
			if(doc.scrollTop() > loadingTop - winHeight){
				// 重置距离顶端的数据
				loadingTop = loading.offset().top;
				// 判断是否可以加载
				if(isGo){
					addList();
				}
			}
		});

		// 加载
		function addList(){
			isGo = false;
			loading.css({
				'position' : 'static'
			});
			var data = '<li class="item">'+
							'<a href="#">'+
								'<div class="img">'+
									'<img src="images/del/2.jpg" alt="">'+
								'</div>'+
								'<h4>橙光闪闪，这就是让人垂涎三尺的西红柿</h4>'+
								'<div class="price">'+
									'<p>￥46.00</p>'+
									'<span>￥85.00</span>'+
								'</div>'+
							'</a>'+
						'</li>';

			var timer = setTimeout(function(){

				isGo = true;

				// 加载列表
				list.append(data,data);

				loading.css({
					'position' : 'absolute'
				})
			},1000);
		}
	},
	showSearchPage : function(btn,page){
		var btn = $(btn),
			page = $(page);

		// 显示
		btn.on('click',function(){
			if(page.is(':hidden')){
				page.addClass('open animated slideInUp');

				$('html,body').css({
					'height' : '100%',
					'overflow' : 'hidden'
				});
			}
		});

		// 隐藏
		page.on('click','.back',function(){
			page.removeClass('open animated slideInUp');

			$('html,body').css({
				'height' : 'auto',
				'overflow' : 'visible'
			});
		});
	},
	leftMenu : function(el){
		var box = $(el),
			body = $(document.body);

		// 显示
		if(!box.hasClass('open')){
			box.addClass('open');
			box.css({
				'transform' : 'translateX(0px)'
			});

			body.append('<div class="layer"></div>');
			$('.layer',body).css({
				'position' : 'fixed',
				'width' : '100%',
				'height' : '100%',
				'background' : 'rgba(0,0,0,0.8)',
				'left' : '0',
				'top' : '0',
				'z-index' : '90'
			});

			$('html,body').css({
				'height' : '100%',
				'overflow' : 'hidden'
			});
		}

		// 隐藏
		$('.layer',body).on('click',function(){
			box.removeClass('open');
			box.css({
				'transform' : 'translateX(-400px)'
			});
			
			$(this).remove();

			$('html,body').css({
				'height' : 'auto',
				'overflow' : 'visible'
			});
		});
	},
	numberModify : function(box){
		var box = $(box),
			jia = $('.jia',box),
			jian = $('.jian',box),
			input = $('input',box),
			val;
		// 递增
		jia.on('click',function(){
			val = parseInt(input.val());
			if(val < 99)
				input.val(val+1);
		});
		// 递减
		jian.on('click',function(){
			val = parseInt(input.val());
			if(val > 1)
				input.val(val-1);
		});
		// 禁止小于1
		input.on('input',function(){
			val = parseInt(input.val());
			if(val < 1)
				input.val(1);
		});
	},
	tabbox : function(box){
		// 声明
		var box = $(box);

		box.each(function(){
			var that = $(this),
				list = $('.tapList',that),
				text = $('.textList',that);

			list.on('click','li',function(){
				var _self = $(this);
				var index = _self.index();
				if(!_self.hasClass('cur'))
				{
					$('li',list).removeClass('cur');
					_self.addClass('cur');

					$('li',text).removeClass('cur');
					$('li',text).eq(index).addClass('cur');
				}
			});

		});
	},
	proDetailBox : function(hit,el){ //弹出加入购物车
		var hit = $(hit);
		var box = $(el);
		var body = $(document.body);

		hit.on('click',function(){
			if($('.proDetailBoxLayer',body).length < 1)
				body.append('<div class="proDetailBoxLayer"></div>');
			box.css({
				'transform' : 'translateY(0)',
				'-webkit-transform' : 'translateY(0)'
			});

			$('html,body').css({
				'height' : '100%',
				'overflow' : 'hidden'
			});
		});

		$('.close',box).on('click',function(){
			box.css({
				'transform' : 'translateY(100%)',
				'-webkit-transform' : 'translateY(100%)'
			});
			$('.proDetailBoxLayer',body).remove();

			$('html,body').css({
				'height' : 'auto',
				'overflow' : 'visible'
			});
		});

	},
	tips : function(text,time){
		var body = $(document.body);

		if($('.timeTip',body).length < 1)
			body.append('<div class="timeTip"><p>' + text + '</p></div>');

		$('.timeTip',body).css({
			'position' : 'fixed',
			'text-align' : 'center',
			'margin' : 'auto',
			'top' : '0',
			'bottom' : '0',
			'height' : '80px',
			'width' : '100%'
		});
		$('.timeTip p',body).css({
			'display' : 'inline-block',
			'background' : 'rgba(0,0,0,0.6)',
			'color' : '#fff',
			'line-height' : '80px',
			'padding' : '0 40px',
			'border-radius' : '4px'
		});

		var timer = setTimeout(function(){
			$('.timeTip',body).remove();
		},time);
	}
}
window.MALL = MALL;