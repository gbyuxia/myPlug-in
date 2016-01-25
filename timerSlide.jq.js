(function($) {
	$.fn.timerSlide = function(options) {
		var defaults = { //默认属性、参数 
			interval:2000, 
			slide:".slideBd", 
			child:"li",
			speed:300,
			direction:"right",
			auto:true,
			fullWidth:false,
			dots:".switcher em",
			activeClass:"on"
		} 		
		var options = $.extend(defaults, options); //合并属性
		this.each(function(){ //插件实现代码 
			var $wrapper = $(this),
				$scroll =$wrapper.find(options.slide),
				$child = $scroll.find(options.child),
				speed = options.speed,
				direction = options.direction,
				curClass = options.activeClass,
				$dots = $wrapper.find(options.dots),
				interval = options.interval;
			if ($wrapper.length<1 ||$scroll.length<1 ||$child.length<1 ){
				return false;
			}
			var l = $child.size(),h=$wrapper.height(),w=$child.width(), step, thisNo=0,startScroll,scrollFun;
			var curIndex=0;			
			$child.eq(0).clone().appendTo($scroll);
			
			
			var resetScroll = function(){
				if(options.fullWidth){
					$wrapper.width(document.body.clientWidth);
					w=$wrapper.width();
					$scroll.find(options.child).width(w);
				}
				
				if (direction == 'left' || direction == 'right'){
					$scroll.width(w*(l+1));	
					step = w;
				}else if(direction == 'down'){
					direction = 'bottom';
					step = h;
				}else{
					direction = 'top';
					step = h;
				}
				$scroll.css(direction,0);
			}
			resetScroll();
			
			var resizeTimer;
			$(window).resize(function(){
				if (resizeTimer) {
		            clearTimeout(resizeTimer)
		        }
		        resizeTimer = setTimeout(function(){
		            if(options.fullWidth){					
						resetScroll();					
					}
		        }, 200);
			});
			
			
			
			scrollFun = function(n){
				n--;				
				if (n+l <=-1){
					n=-1;
					$scroll.stop().css(direction,parseFloat($scroll.css(direction))+l*step);
				}
				if (n+l==0){curIndex = 0}else{
					if(direction == "left" || direction == "top"){
						curIndex = -n;	
					}else if(direction == "right" || direction == "bottom"){
						curIndex = n+l ;	
					}
				}
				if($dots){$dots.eq(curIndex).addClass(curClass).siblings().removeClass();	}
							
				var obj={};
				obj[direction]=n*step;
				$scroll.stop().animate(obj,speed,'linear');	
				return thisNo = n;
			}
			
			$dots.on('mouseenter',function(){
				var index = $(this).index();
				$(this).addClass(curClass).siblings().removeClass();
				if (index==0){index = l}else{
					if(direction == "left" || direction == "top"){
						curIndex = -index;	
					}else if(direction == "right" || direction == "bottom"){
						curIndex = n+l ;	
					}
				}
				var obj={};
				obj[direction]=-index*step;
				$scroll.stop().animate(obj,speed,'linear');
				return thisNo = -index;
			})

			if(options.auto){startScroll = window.setInterval(function(){scrollFun(thisNo)},interval);}			
			$wrapper.hover(function(){window.clearInterval(startScroll);}
						  ,function(){startScroll = window.setInterval(function(){scrollFun(thisNo)},interval);}
			)		
		}); 
	}; 	
})(jQuery);
