<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="resources/js/jquery-1.7.2.js"></script>
<title>银行卡综合收单系统</title>
<!-- Stylesheets -->
<!-- link href='http://fonts.googleapis.com/css?family=Droid+Sans:400,700' rel='stylesheet'>
	 -->
<link rel="stylesheet" href="resources/css/style.css">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style type="text/css">
body {
	font-size: 1em;
	line-height: 100%;
	font-family: "Droid Sans", Helvetica, Arial, sans-serif;
}
</style>

<script>
	function sessionTimeOut() {
		if (top.location != self.location) {
			top.location.href = "welcome.jhtml?msg=" + encodeURI("登陆超时,请重新登陆");
		}
	}
	function changeCode() {  
	    $('#kaptchaImage').hide().attr('src', 'getKaptchaImage.jhtml?' + Math.floor(Math.random()*100) ).fadeIn();  
	}
	/*
	$(function(){
		var result = systemFilter("10000003");
		if("true"==result){
		$("#kaptchaStatus").hide();
	    $('#kaptchaImage').click(function () {//生成验证码  
	     $(this).hide().attr('src', 'getKaptchaImage.jhtml?' + Math.floor(Math.random()*100)).fadeIn();  
	    });
	    $("#kaptcha").blur(function(){
	    	var kaptcha = $('#kaptcha').val();
	    	if(''==kaptcha){
	    		//$("#kaptchaStatus").show();
	    		return;
	    	}
	    	$.ajax({
	    		url : 'validateKaptchaImage.jhtml',
	    		async : false,
	  		 	type : "POST",
	  		 	dataType : 'json',
	    		data : {"kaptcha":kaptcha},
	    		success : function(result){
	    			$("#kaptchaStatus").show();
	    			if(result.code=='00'){
	    				$("#kaptchaStatus").attr("src","resources/images/right.jpg");
	    			}else{
	    				$("#kaptchaStatus").attr("src","resources/images/error.jpg");
	    				$("#kaptchaImage").attr('src', 'getKaptchaImage.jhtml?' + Math.floor(Math.random()*100)).fadeIn();
	    			}
	    		}
	    	});
	    });
		}
	}); 
	*/
</script>
</head>

<body onload="sessionTimeOut();">

	<!-- HEADER -->
	<div id="header">

		<div class="page-full-width">

			<div id="login-intro">

<!-- 				<h1 style="font-size: 30px; font-family:'微软雅黑'">银行卡综合收单系统</h1> -->
				<img border="0" id="imgLogo" height="50px;" width="300px" class="gLogo" alt="POS收单综合管理系统" src="resources/images/ycLogo.png" />

			</div>
			<!-- login-intro -->

			<!-- Change this image to your own company's logo -->
			<!-- The logo will automatically be resized to 39px height. -->

		</div>
		<!-- end full-width -->

	</div>
	<!-- end header -->



	<!-- MAIN CONTENT -->
	<div id="content" >

		<form action="login.app" method="post" id="login-form">

			<fieldset>

				<p>
					<label for="login-username" style="font-family:'微软雅黑';margin-left:250px;color: white">用户名</label> <input type="text"
						name="loginName" id="username" style="margin-left:250px; width: 300px;" class="round full-width-input" value='${MSG.content }'/>
				</p>

				<p>
					<label for="login-password" style="font-family:'微软雅黑';margin-left:250px; color: white">密码</label> <input type="password"
						name="password" class="round full-width-input" style="margin-left:250px;width: 300px;"/>
				</p>
				<p style="margin-bottom: 0px;">
<%-- 				<c:if test="${MSG.status!=false}">
					<label><span>验证码</span><span><a href="#" onclick="changeCode()" style="font-size: 12px;margin-left: 46px;">换一张</a></span></label>
						<div style="border:1px solid #8BAABF;width:79px;height:39px;float:left;">
							<input name="kaptcha" type="text" id="kaptcha" style="width:56%;float:left;height: 15px;border:none;" maxlength="4" />
							<span style="background: #FFFFFF;display:inline-block;width:17px;height: 38px;">
							<img src="resources/images/warning.jpg" id="kaptchaStatus" style="height: 20px;width:18px;float:left;margin-left: 1px;" />
							</span>
						</div>	
						<img src="getKaptchaImage.jhtml" id="kaptchaImage" style="height: 41px;width:115px;float:left;margin-left: 2px;" /> 
					</c:if> --%>
						<input type="submit" class="login-button round button-blue" style="width:100px;height:40px; padding-left:30px; float:left;margin-left:250px;font-size:12px; text-align: center;" value="登  录" />
				</p>
				<br/>
				<c:if test="${MSG.value!=null}">
					<span style="color: red; margin-top: 5px;float:left;">${MSG.value}</span>
				</c:if>
			</fieldset>

			<br /> <br />

		</form>

	</div>
	<!-- end content -->



	<!-- FOOTER -->
	<div id="footer">

		<p class="footCopyright">
			 &#169; 2015 <a href="javascript:void(0)" target="_blank">北京亿诚汇付信息技术有限公司</a>
			版权所有
		</p>

	</div>
	<!-- end footer -->
	<script type="text/javascript">
		document.getElementById("username").focus();
	</script>
</body>
</html>