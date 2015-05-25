$(function(){
	$("#reset").bind("click", function() {
		$("#userName").val("");
		$("#userName").focus();
	});
	$("#userSearch").bind("click", function() {
		userSearch();
	});
	$("#agentSearch").bind("click", function() {
		agentSearch();
	});
	$("#agentReset").bind("click", function() {
		$("#agentShortName").val("");
		$("#agentShortName").focus();
	});
	$("#merchantReset").bind("click", function() {
		$("#merchantNo").val("");
		$("#merchantPhone").focus();
	});
	$("#merchantSearch").bind("click", function() {
		merchantSearch();
	});
	$("#merchantPasswordReset").bind("click", function() {
		merchantPasswordReset();
	});
	$("#salesmanSearch").bind("click", function() {
		salesmanSearch();
	});
	$("#salesmanReset").bind("click", function() {
		$("#phone").val("");
		$("#phone").focus();
	});

});

function merchantPasswordReset() {
	var merchantPassword = $("#merchantPassword").val();
	if (merchantPassword == '' || merchantPassword == null) {
		showMessageOfParent("请输入密码");
		setTimeout("hideMessageOfParent()", "4000");
		return false;
	}
	if(/[^\a-\z\A-\Z0-9\!\@\#\$\%\^\&\*\(\)\_\-\+\=\>\?\<]/g.test(merchantPassword)){
		showMessageOfParent("密码格式错误，只允许输入字母、数字及以下特殊符号!@#$%^&*()_-=+<>?");
		setTimeout("hideMessageOfParent()", 5000);
		return;
	}
	if(merchantPassword.length<6 || merchantPassword.length>16){
		showMessageOfParent("密码长度限制6-16位");
		setTimeout("hideMessageOfParent()", 5000);
		return;
	}

	layer.confirm('确定重置？',function(index){
		layer.close(index);
		$.post(contextPath + "/resetMerchantPassword.jhtml", {"id" : $("#merchantId").val(), "passwd" : merchantPassword} ,function(data) {
			 if(data.isSuccess) {
				 showMessageOfParent(data.content);
				 setTimeout("hideMessageOfParent()", 5000);	
			 } else {
				 showMessageOfParent(data.content);
				 setTimeout("hideMessageOfParent()", 5000);	
			 }
		});
});
	return false;
}

function merchantSearch() {
	$("#merchantInfo").hide();
	var merchantNo=$("#merchantNo").val();
	if (merchantNo == '') {
		showMessageOfParent("请输入商户编号!");
		setTimeout("hideMessageOfParent()", "3000");
	}else{
		$.ajax({
			  url: contextPath +"/getMerchantInfo.jhtml?r="+Math.random(),
			  async:false,
			  type:"POST",
			  data:{
				  	"merchantNo": merchantNo},
			  success: function(result) {
				  if (result.merchantCnName == null || result.merchantCnName == undefined) {
					  showMessageOfParent("商户不存在");
				  		setTimeout("hideMessageOfParent()", "3000");
				  		return false;
				  	}
				  		$("#merchantNameSpan").text(result.merchantCnName);
				  		$("#merchantCorpNameSpan").text(result.linkPerson);
				  		if(result.useStatus == '10A'){
				  			$("#merchantStatusSpan").text('启用');
				  		}else{
				  			$("#merchantStatusSpan").text('禁用');
				  		}
				  		$("#merchantId").val(result.id);
				  		$("#merchantInfo").show();
			  }
		});
	}
};
function userSearch() {
	if ($("#userName").val() == '') {
		showMessageOfParent("请输入用户名");
		setTimeout("hideMessageOfParent()", "3000");
		return false;
	}
//	$("#userInfo").text("");
	$.ajax({
		  url: contextPath +"/getUserInfo.jhtml?r="+Math.random(),
		  async:false,
		  type:"POST",
		  data:{"userName":$("#userName").val()},
		  success: function(result) {
//			$.each(result, function(i,v) {
			  	if (result.userName == null || result.userName == undefined) {
			  		showMessageOfParent("用户不存在");
			  		setTimeout("hideMessageOfParent()", "3000");
			  		return false;
			  	}
			  	$("#userInfo").show();
			  	$("#userNameSpan").text(result.userName);
			  	$("#userStatusSpan").text(result.userState);
			  	$("#userRoleSpan").text(result.userRole);
			  	$("#userId").val(result.userId);
			  	
			/*	$("#userInfo").append("<div style='width:300px;height:30px;line-height: 30px;'><span style=''>用户名称:</span><span style='margin-left:30px;'>"+result.userName+"</span>");
				$("#userInfo").append("<div style='width:300px;height:30px;line-height: 30px;'><span>用户状态:</span><span style='margin-left:30px;'>"+result.userState+"</span>");
				$("#userInfo").append("<div style='width:300px;height:30px;line-height: 30px;'><span>用户角色:</span><span style='margin-left:30px;'>"+result.userRole+"</span>");
				$("#userInfo").append("<div style='width:300px;height:30px;line-height: 30px;' class='bootstrap'><span>用户密码:</span><input type='hidden' id='userId' value='"+result.userId+"' />" +
						"<input name='userPassword' style='margin-left:20px;' type='text' id='userPassword'/>" +
						"<span><a onclick='passwordReset();' style='margin-left:75px;' class='bootstrap-button' href='javascript:void(0);'>密码重置</a></span>");*/
//			});
		  }
	});
}

function agentSearch() {
	if ($("#agentShortName").val() == '') {
		showMessageOfParent("请输入代理商简称");
		setTimeout("hideMessageOfParent()", "3000");
		return false;
	}
//	$("#agentInfo").text("");
	$.ajax({
		  url: contextPath +"/getAgentInfo.jhtml?r="+Math.random(),
		  async:false,
		  type:"POST",
		  data:{"agentShortName":$("#agentShortName").val()},
		  success: function(result) {
			  $("#agentInfo").hide();
			  if (result.agentShortName == null || result.agentShortName == undefined) {
				  showMessageOfParent("代理商不存在或不可使用");
				  setTimeout("hideMessageOfParent()", "3000");
				  return false;
			  }
			  $("#agentInfo").show();
			  $("#agentShortNameSpan").text(result.agentShortName);
			  $("#agentLinkPersonSpan").text(result.linkPerson);
			  $("#agentLinkPhoneSpan").text(result.linkPhone);
			  $("#id").val(result.id);
			  $("#email").val(result.email);
			  $("#linkPhone").val(result.linkPhone);
//			$.each(result, function(i,v) {
			/*	$("#agentInfo").append("<span style=''>代理商简称:</span><span style='margin-left:30px;'>"+result.agentShortName+"</span><br/>");
				$("#agentInfo").append("<span>联系人:</span><span style='margin-left:30px;'>"+result.linkPerson+"</span><br/>");
				$("#agentInfo").append("<span>联系电话:</span><span style='margin-left:30px;'>"+result.linkPhone+"</span><br/>");
				$("#agentInfo").append("<input type='hidden' id='id' value='"+result.id+"' /> <input type='hidden' id='email' value='"+result.email+"' />" +
						"<span><a onclick='agentReset();' style='margin-left:75px;' class='bootstrap-button' href='javascript:void(0);'>密码重置</a></span>");*/
//			});
		  }
	});
}

function agentReset() {
	if (confirm("确定重置？")) {
		$.post(contextPath + "/agentResetPassword.jhtml", {"id" : $("#id").val(), "agentShortName" : $("#agentShortName").val(), "linkPhone" : $("#linkPhone").val(), "email" : $("#email").val()} ,function(data) {
			 if(data.value > 0) {
				 showMessageOfParent('重置成功 ！');	
			 } else {
				 showMessageOfParent('重置失败 ！');
			 }
			 setTimeout("hideMessageOfParent()", "5000");
		});
	}
	
	layer.confirm('确定重置？',function(index){
		layer.close(index);
		$.post(contextPath + "/agentResetPassword.jhtml", {"id" : $("#id").val(), "agentShortName" : $("#agentShortName").val(), "linkPhone" : $("#linkPhone").val(), "email" : $("#email").val()} ,function(data) {
			 if(data.value > 0) {
				 showMessageOfParent('重置成功 ！');	
			 } else {
				 showMessageOfParent('重置失败 ！');
			 }
			 setTimeout("hideMessageOfParent()", "5000");
	});
});
	
	
	
	
	
	
	return false;
}

function passwordReset() {
	var userPassword = $("#userPassword").val();
	if (userPassword == '' || userPassword == null) {
		showMessageOfParent("请输入密码");
		setTimeout("hideMessageOfParent()", "4000");
		return false;
	}
	if(/[^\a-\z\A-\Z0-9\!\@\#\$\%\^\&\*\(\)\_\-\+\=\>\?\<]/g.test(userPassword)){
		showMessageOfParent("密码格式错误，只允许输入字母、数字及以下特殊符号!@#$%^&*()_-=+<>?");
		setTimeout("hideMessageOfParent()", 5000);
		return;
	}
	if(userPassword.length<6 || userPassword.length>16){
		showMessageOfParent("密码长度限制6-16位");
		setTimeout("hideMessageOfParent()", 5000);
		return;
	}

	layer.confirm('确定重置？',function(index){
		layer.close(index);
		$.post(contextPath + "/resetPassword.jhtml", {"userId" : $("#userId").val(), "userPassword" : userPassword} ,function(data) {
			 if(data.value > 0) {
				 showMessageOfParent('重置成功 ！');	
			 } else {
				 showMessageOfParent('重置失败 ！');
			 }
			 setTimeout("hideMessageOfParent()", "5000");
		});
});
	
	
	
	
	return false;
}

// 业务员密码重置
function salesmanSearch() {
	if ($("#phone").val() == '') {
		showMessageOfParent("请输入业务员手机号");
		setTimeout("hideMessageOfParent()", "3000");
		return false;
	}
//	$("#salesmanInfo").text("");
	$.ajax({
		  url: contextPath +"/get_salesman_info.jhtml?r="+Math.random(),
		  async:false,
		  type:"POST",
		  data:{"phone":$("#phone").val()},
		  success: function(result) {
			  $("#salesmanInfo").hide();
			  if (result.name == null || result.name == undefined) {
				  showMessageOfParent("业务员不存在或不可使用");
				  setTimeout("hideMessageOfParent()", "3000");
				  return false;
			  }
			  $("#salesmanInfo").show();
			  $("#salemanNameSpan").text(result.name);
			  $("#salemanPhoneSpan").text(result.phone);
			  $("#salemanEmailSpan").text(result.email);
			  $("#salemanId").val(result.id);
			  $("#salemanEmail").val(result.email);
			  $("#salemanName").val(result.name);
			  $("#salemanPhone").val(result.phone);
//			$.each(result, function(i,v) {
				/*$("#salesmanInfo").append("<span style=''>名称:</span><span style='margin-left:30px;'>"+result.name+"</span><br/>");
				$("#salesmanInfo").append("<span>手机号:</span><span style='margin-left:30px;'>"+result.phone+"</span><br/>");
				$("#salesmanInfo").append("<span>邮箱:</span><span style='margin-left:30px;'>"+result.email+"</span><br/>");
				$("#salesmanInfo").append("<input type='hidden' id='id' value='"+result.id+"' /> " +
						"<input type='hidden' id='name' value='"+result.name+"' /> <input type='hidden' id='email' value='"+result.email+"' />" +
						"<span><a onclick='salesmanReset();' style='margin-left:75px;' class='bootstrap-button' href='javascript:void(0);'>密码重置</a></span>");*/
//			});
		  }
	});
}

function salesmanReset() {
	if (confirm("确定重置？")) {
		$.post(contextPath + "/salesman_reset_password.jhtml", {"id" : $("#salemanId").val(), "phone" : $("#salemanPhone").val(), "name": $("#salemanName").val(),"email" : $("#salemanEmail").val()} ,function(msg) {
			 /*if(msg.isSuccess) {
				 showMessageOfParent('重置成功 ！');	
			 } else {
				 showMessageOfParent('重置失败 ！');
			 }*/
			showMessageOfParent(msg.content);
			setTimeout("hideMessageOfParent()", "5000");
		});
	}
	return false;
}