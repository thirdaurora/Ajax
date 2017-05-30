(function Ajax() {
var http = {
	//GET请求
	get: function(url, obj, func) {
		//初始化Ajax
		var http = this.init();
		//提交数据处理
		if(typeof obj === "function" || func === undefined) {
			func = obj;
			obj = null;
		}
		if(typeof obj === "object") {
			var text = "?";
			for(var item in obj) {
				text +=  item + "=" + obj[item] + "&";
			}
			text = text.substring(0,text.length-1);
		}
		//准备提交配置
		http.open("GET",text?url + text:url,true);
		//发送
		http.send();
		//回调数据
		this.then(func,http);
	},
	//POST请求
	post: function(url, obj, func) {
		//初始化Ajax
		var http = this.init();
		//提交数据处理
		if(typeof obj === "object") {
			var text = "";
			for(var item in obj) {
				text +=  item + "=" + obj[item] + "&";
			}
			text = text.substring(0,text.length-1);
		}
		if(!text){console.log("Object cannot be empty");return};
		//准备提交配置
		http.open("POST",url,true);
		//配置包头
		http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		//发送
		http.send(text);
		//回调数据
		this.then(func,http);
	},
	//请求状态、数据回调
	then: function(func,http) {
		http.onreadystatechange = function(){
			//状态码
  			if (http.readyState==4){
				  //状态码
					if(http.status==200) {
						//数据回调
						func(http.responseText, http.statusText);
					}else {
						func(http.responseText, http.statusText);
					}
    		}
  		}
	},
	//Ajax初始化
	init: function() {
		var http;
		//适合主流浏览器
		if (window.XMLHttpRequest){
			http=new XMLHttpRequest();
		}
		//IE5、IE6
		else if (window.ActiveXObject){
			http=new ActiveXObject("Microsoft.XMLHTTP");
		}
		return http;
	},
	//跨域请求jsonp
	jsonp: function(url, obj, func) {
		//创建一个script元素
		var _script = document.createElement('script'),
				head = document.getElementsByTagName('head')[0];
		//数据处理
		if(typeof obj === "object" && obj.data && obj.callback) {
			var text = "?";
			for(var item in obj.data) {
				text +=  item + "=" + obj.data[item] + "&";
			}
			text +=  obj.callback + "=_callback";
		}else {
			return;
		}
		//把数据加入script元素
		_script.src = url + text;
		//函数外部接口
		window._callback = function(obj) {
			//回调数据
			func(obj);
			//用完后把_callback函数释放,延迟释放是为了可能有几个Jsonp同时执行。
			setTimeout(function(){
			window._callback = null;
			},500);
		}
		//把_script元素插入head
		head.appendChild(_script);
		//用完后释放掉
		head.removeChild(_script);
		
	}
}
//外部接口
window.$http = http;
})();
