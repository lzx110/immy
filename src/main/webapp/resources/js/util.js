function getRandomString(length){
	length = length || 32;
	var s=[];
//var a=parseInt(Math.random()*25)+(Math.random()>0.5?65:97);
	for (var i=0;i<length;i++){
	s[i]=Math.random()>0.5?parseInt(Math.random()*9):String.fromCharCode(parseInt(Math.random()*25)+(Math.random()>0.5?65:97));
	}
	return s.join("");
}
$(function() {
Date.prototype.pattern=function(fmt) {
    var o = {
    "M+" : this.getMonth()+1, //月份
    "d+" : this.getDate(), //日
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
    "H+" : this.getHours(), //小时
    "m+" : this.getMinutes(), //分
    "s+" : this.getSeconds(), //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S" : this.getMilliseconds() //毫秒
    };
    var week = {
    "0" : "/u65e5",
    "1" : "/u4e00",
    "2" : "/u4e8c",
    "3" : "/u4e09",
    "4" : "/u56db",
    "5" : "/u4e94",
    "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;};
});
//grid组件删除校验
function validateRemove(grid,delRowNums,index){
	var gridData = grid.getData();
	var row = delRowNums[index];
	var params = gridData[row];
	if(params== undefined || !params.hasOwnProperty('id') || ''==params.id){
		showMessageOfParent('删除成功 ！');
		setTimeout("hideMessageOfParent()", 2000);
		gridData.splice(row,1);
		grid.setData(gridData,true);
		grid.render();
		return false;
	}
	return params;
}
//获取某个域的字典
function getLookupCdeList(code,lookupArray) {
	var lookupArray = [];
	if(code=='10178001'){
		lookupArray.push({"id":"Y","name":"是"});
		lookupArray.push({"id":"N","name":"否"});
		return lookupArray;
	}
	if(code=='10177001'){
		lookupArray.push({"id":"Y","name":"是"});
		lookupArray.push({"id":"N","name":"否"});
		return lookupArray;
	}
	if(code=='777999'){
		lookupArray.push({"id":"m","name":"月"});
		lookupArray.push({"id":"d","name":"日"});
		return lookupArray;
	}
	if(code=='777888'){
		lookupArray.push({"id":"Y","name":"是"});
		lookupArray.push({"id":"N","name":"否"});
		return lookupArray;
	}
	if(code=='777777'){
		/*lookupArray.push({"id":"101","name":"代理商"});
		lookupArray.push({"id":"103","name":"业务员"});
		lookupArray.push({"id":"102","name":"个人商户"});
		lookupArray.push({"id":"10202","name":"企业商户"});
		lookupArray.push({"id":"10203","name":"个体户商户"});*/
		$.ajax({
		url : contextPath + '/getLookupCdeList.jhtml?r=' + Math.random(),
		async : false,
		type : "POST",
		data : {
			"typeCode" : '10841006'
		},
		success : function(result) {
			$.each(result, function(k, v) {
				v.id=v.integerKey+"";
				lookupArray.push(v);
			});
		}
	});
		return lookupArray;
	}
}


function checkInputLength(id,inputLength){
	var input=$("#"+id);
	input.keyup(function(){
		var insertLength=input.val().length;
		var text=insertLength+"/"+inputLength;
		if($("#inputSan"+id).text().length>0){
			$("#inputSan"+id).text(text);
		}else{
			$span=$("<span id='inputSan"+id+"' style='line-height:0%;'>"+text+"</span>");
			input.after($span);
		}
	if(insertLength>inputLength){
		$("#inputSan"+id).css("color","red");
	}else{
		$("#inputSan"+id).css("color","#000");
	}
	});
//		input.bind('paste', function(e) {
//			var insertLength=input.val().length;
//			var text=insertLength+"/"+inputLength;
//			if($("#inputSan"+id).text().length>0){
//				$("#inputSan"+id).text(text);
//			}else{
//				$span=$("<span id='inputSan"+id+"'>"+text+"<span>");
//				input.after($span);
//			}
//	    });
}
function isMask(flag){
	var $div = $("<div class='nui-mask'></div>");
	if(flag){
		$(document.body).append($div); 
	}else{
		$(".nui-mask").remove();
	}
}
function isEmpty(value){
	if(null == value || ''===value || undefined==value){
		return true;
	}
	return false;
}

//金钱格式负值红色显示
function cfmoney(amount,n){
	var nagetive = false;
	if(eval(amount)<eval(0)){
		//amount = Math.abs(amount);
		nagetive = true;
	}
	amount = fmoney(Math.abs(amount),n);
	if(nagetive){
		amount = "<font color='red'>"+amount+"</font>";
	}
	return amount;
}
function cfmoneyNotRed(amount,n){
	amount = fmoney(Math.abs(amount),n);
	return amount;
}
//金钱格式化
function fmoney(s, n)   
{   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1];   
   t = "";
   for(var i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   return t.split("").reverse().join("") + "." + r;   
}

//数字小数位控制
function fmoneyDecimal(s, n)
{
   n = n > 0 && n <= 6 ? n : 6;
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
   return parseFloat(s);
}
//还原金额
function rmoney(s)   
{   
   return parseFloat(s.replace(/[^\d\.-]/g, ""));   
} 

//获取图片种类
function getImageOwnerType(id){
	var code=0;
	$.ajax({
		  url: 'getImageOwnerType.jhtml',
		  async:false,
		  type:"POST",
		  data:{"id":id},
		  success: function(result) {
			  code = result;
		  }
		});
	return code;
}
function getAllHoliday(days,type){
	var holiday=null;
	$.ajax({
		  url: 'getAllHoliday.jhtml',
		  async:false,
		  type:"POST",
		  data:{days:days,type:type},
		  success: function(result) {
			  holiday=result;
		  }
		});
	return holiday;
}
function nullToEmpty(jsonObj){
	var json = jsonObj;
	 for(var item in jsonObj){  
	        var value=jsonObj[item];//key所对应的value  
	        if(null == value || ''===value || undefined==value){
	        	json[item]="";
	    	}
	    }  
	return json;
}
