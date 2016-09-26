/*单例模式的定义:
*保证一个类只有一个实例，并提供一个访问它的全局访问点
*/


/******透明单例模式*******
*用户可以使用new方法来创建对象
*并且保证只创建唯一的对象
************************/
var CreateDiv = (function(){
	var instance;
	var CreateDiv = function(html){
		if (instance) {
			return instance;
		};
		this.html = html;
		this.init();
		return instance = this;
	};

	CreateDiv.prototype.init = function(){
		var div = document.createElement('div');
		div.innerHTML = this.html;
		document.body.appendChild(div);
	};

	return CreateDiv;

})();

var a = new CreateDiv('seven1');
var b = new CreateDiv('seven2');

console.log(a === b); //true
/*这段代码中，CreateDiv的构造函数实际上负责了两件事：
*1.创建对象和执行初始化init方法
*2.保证只有一个对象
*不符合“单一职责原则”
*/


/******代理单例模式********
*通过代理的方法来负责管理单例
*************************/
var CreateDiv = function(html){
	this.html = html;
	this.init();
};

CreateDiv.prototype.init = function(){
	var div = document.createElement('div');
	div.innerHTML = this.html;
	document.body.appendChild(div);
};

/*引入代理类proxySingletonCreateDiv*/
var ProxySingletonCreateDiv = (function(){
	var instance;
	return function(html){
		if (instance) {
			instance = new CreateDiv(html);
		};
		return instance;
	}
})();

var a = new ProxySingletonCreateDiv('seven1');
var b = new ProxySingletonCreateDiv('seven2');

console.log(a === b);


/******通用惰性单例********
***将管理单例的逻辑抽象出来**
*****实例只在需要时创建*****
*************************/
var getSingle = function(fn){
	var result;
	return function(){
		return result || (result = fn.apply(this, arguments));
	}
};

var createLoginLayer = function(){
	var div = document.createElement('div');
	div.innerHTML = '我是登录窗';
	div.style.display = 'none';
	document.body.appendChild(div);
	return div;
};

var createLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function(){
	var loginLayer = createLoginLayer();
	loginLayer.style.display = 'block';
}
















