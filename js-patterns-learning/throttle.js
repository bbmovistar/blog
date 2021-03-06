var throttle = function(fn, interval){
	var _self = fn,		//保存需要被延迟执行的函数引用
		timer,			//定时器
		firstTime = true; //是否第一次被调用

	return function(){
		var args = arguments,
			_me = this;

		if(firstTime){ //第一次被调用不需要延迟执行
			_self.apply(_me, args);
			return firstTime = false;
		}

		if(timer){ //定时器还在，上一次延迟执行还未完成
			return false;
		}

		timer = setTimeout(function(){
			clearTimeout(timer);
			timer = null;
			_self.apply(_me, args);
		}, interval || 500);
	};
};

window.onresize = throttle(function(){
	console.log(1);
},500);