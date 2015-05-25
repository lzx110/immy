$.extend($.fn.validatebox.defaults.rules, {
    CHS: {
        validator: function (value, param) {
            return /^[\u0391-\uFFE5]+$/.test(value);
        },
        message: '请输入汉字'
    },
    TestIP: {
        validator: function (value, param) {
        //   return /^(\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|1\d\d|2[0-4]\d|25[0-5])\b$/.test(value);
        	return  /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/.test(value);
        },
        message: 'IP不正确'
    },
    ZIP: {
        validator: function (value, param) {
            return /^[1-9]\d{5}$/.test(value);
        },
        message: '邮政编码不存在'
    },
    QQ: {
        validator: function (value, param) {
            return /^[1-9]\d{4,10}$/.test(value);
        },
        message: 'QQ号码QQQ不正确'
    },
    mobile: {
        validator: function (value, param) {
            return /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/.test(value);
        },
        message: '手机号码不正确'
    },
    loginName: {
        validator: function (value, param) {
            return /^[\u0391-\uFFE5\w]+$/.test(value);
        },
        message: '登录名称只允许汉字、英文字母、数字及下划线。'
    },
    safepass: {
        validator: function (value, param) {
            return safePassword(value);
        },
        message: '密码由字母和数字组成，至少6位'
    },
    equalTo: {
        validator: function (value, param) {
            return value == $(param[0]).val();
        },
        message: '两次输入的字符不一致'
    },
    comboxEqual: {
        validator: function (value, param) {
            return value != "--请选择--";
        },
        message: '该输入项为必选项'
    },
    
    number: {
        validator: function (value, param) {
            return /^\d+$/.test(value);
        },
        message: '请输入数字'
    },
    idcard: {
        validator: function (value, param) {
            return idCard(value);
        },
        message:'请输入正确的身份证号码'
    },
    singleChar: {
        validator: function (value, param) {
            return /^[\S]+$/.test(value);
        },
        message:'只能输入非空字符'
    },
    noCh: {
    	validator: function (v,p){
    		return /^\w+$/.test(v);
    	},
    	message:'只允许英文字母、数字、下划线'
    },
    
    voType:{
    	
    	validator: function (v,p){
    		return /^[0-9A-Za-z\.]*$/.test(v);
    	},
    	message:'文件扩展名只能输入数字、. 和字母'
    	
    },
    
    spType:{
    	
    	validator: function (v,p){
    		return /^\d*.?\d+X$/.test(v);
    	},
    	message:'加速类型格式不正确，请重新填写!'
    	
    },
    //验证select下拉框的value值不能为空
    selectValueRequired: {  
    	validator: function(value,param){  
    	return $(param[0]).find("option:contains('"+value+"')").val() != '';  
    	},  
    	message: '该项为必输项'  
    	}  ,
    
    remote: { 
        validator: function(value, url){
            $.post(url+"",{outSystemSign:$.trim(value)},
	            function(data){
            	   var result = eval('(' + data + ')');
	               if(result.msg =="unexist"){
	                  flag = true;
	                  $.data(document.body,"flag",flag);
	               }else if(result.msg=="exist"){
	                  flag = false;
	                  $.data(document.body,"flag",flag);
	               }
	            });
            return  $.data(document.body,"flag");
        },
        message: '已被占用'
    },
    isDateTime:{
    	validator: function(v, p){
    		var reg = /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    		return v.match(reg);
        },
        message: '时间格式错误，请输入00:00:00的格式！'
    }
});

