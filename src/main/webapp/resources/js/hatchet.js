/**
 * 系统展示控制
 * @param obj
 */
function systemFilter(obj){
	var flag="false";
		$.ajax({
 		url : 'getSystemConfig.jhtml',
 		async : false,
		 	type : "POST",
		 	dataType : 'json',
 		data : {"code": obj},
 		success : function(result){
 			flag = result;
 		}
 	});
    return flag;
}
/**
 * 查询字典
 * @param cdeCode
 * @returns {Array}
 */
function getLookupCdeList(typeCode){
	lookupArray=[];
	$.ajax({
		  url: contextPath +'/getLookUpCdeIntegerKeyList.jhtml?r='+Math.random(),
		  async:false,
		  type:"POST",
		  data:{"typeCode":typeCode},
		  success: function(result) {
			  $.each(result, function(k, v) {
				  v.id=v.integerKey;
				  v.name=v.cdeName;
				  lookupArray.push(v);
			  });
		  }
		});
	return lookupArray;
};

