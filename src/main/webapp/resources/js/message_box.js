/*显示提示信息*/
function showMessage(msg) {
			window.scrollTo(0, 0); //回到顶部
			var messageDiv = $('#message_div');
			if (messageDiv.length < 1) {
				$(document.body).append(
						"<div id=\"message_div\" class=\"ajaxMessage\"></div>");
				messageDiv = $('#message_div');
			}
			if (document.documentElement) {
				messageDiv.css("top", document.documentElement.scrollTop);
			}
			messageDiv.html(msg).show();
			$(".target-setting-edit input").val("");
		}
/*隐藏提示信息*/
function hideMessage() {
			var messageDiv = $('#message_div');
			messageDiv.hide();
}
function showMessageOfParent(msg) {
	window.top.scrollTo(0, 0); //回到顶部
	if ($("#message_div", window.top.document).length < 1) {
		$(window.top.document.body).append("<div id=\"message_div\" class=\"ajaxMessage\"></div>");
	}
	$("#message_div", window.top.document).html(msg).show();
}
function hideMessageOfParent() {
	$("#message_div", window.top.document).hide();
	//$("#message_div", window.parent.document).hide();
}

function getDate(dates){
	var dd = new Date();
    dd.setDate(dd.getDate()+dates);
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;
    var d = dd.getDate();
    if (m < 10) {
		m = '0' + m;
	}
	if (d < 10) {
		d = '0' + d;
	}
	return y+"-"+m+"-"+d;
}

$(function(){
	$.ajaxSetup({
	    contentType:"application/x-www-form-urlencoded;charset=utf-8",   
	    complete :function(XMLHttpRequest,textStatus){
	    	if(XMLHttpRequest.hasOwnProperty("getResponseHeader")){
	    		var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，  
	    		if(sessionstatus=="timeout"){
	    			//如果超时就处理 ，指定要跳转的页面  
	    			window.location.href='/hatchet/welcome.jhtml';
	    		}
	    	}
	    	}
	    });
});