console.log('/***例一***/');
var a = 1;

var func1 = function(){
	var b = 2;
	var func2 = function(){
		var c = 3;
		console.log(b);
		console.log(a);
	}
	func2();
	// console.log(c); 
};
func1();

console.log('/***例二***/');
var func = function(){
	var a = 1;
	return function(){
		a++;
		console.log(a);
	}
};

var f= func();

f();
f();
f();

console.log('/***例三***/');
var Type = {};

for(var i = 0,type;type = ['String', 'Array', 'Number'][i++];){
	(function(type){
		Type['is' + type]=function(obj){
			return Object.prototype.toString.call(obj) === '[object ' + type +']';
		}
	})(type)
};

console.log(Type.isArray([]));
console.log(Type.isNumber('123'));
console.log(Type.isNumber(123));

console.log('/***例四：ed1***/');
var mult = function(){
	var a = 1;
	for(var i = 0, l=arguments.length; i<l;i++){
		a = a*arguments[i];
	}
	return a;
};
console.log(mult(1,2,3));

console.log('/***例四：ed2引入缓存机制***/');
var cache = {};
var mult = (function(){
	var args = Array.prototype.join.call('arguments', ',');
	if(cache[args]){
		return cache[args];
	}
	var a =1;
	for(var i = 0, l=arguments.length; i<l;i++){
		a = a*arguments[i];
	}
	return cache[args]=a;
})(1,2,3);
console.log(mult);

console.log('/***例四：ed3将缓存通过闭包封闭起来***/')
var mult = (function(){
	var cache = {};
	var caculate=function(){
		var a = 1;
		for(var i = 0, l=arguments.length; i<l;i++){
			a = a*arguments[i];
		}
		return a;
	};
	return function(){
		var args = Array.prototype.join.call(arguments, ',');
		if(args in cache){
			return cache[args];
		}
		return cache[args] = caculate.apply(null, arguments);
	}
})();
console.log(mult(1,2,3));













