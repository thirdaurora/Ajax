# newAjax
Personal project

！仅为个人练习项目

# 调用方式

GET:
//data为对象，可传可不传
//response 为返回的数据
$http.get(url, data, function(response) {
            console.log(response);
        })
        
POST:
//data为对象，必传
//response 为返回的数据
$http.post(url, data, function(response) {
            console.log(response);
        })

JSONP:
//data为对象，必传
//callback为url里callback的自定义名字，例如********&cb=feqfewfefef:那么就填callback: “cb”
//response 为返回的数据
$http.jsonp(url, {
           data: data,
           callback: callback
       }, function(response) {
           console.log(response);
       });
