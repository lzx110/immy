var setting = {
	data : {
		simpleData : {
			enable : true,
			idKey : "id",
			pIdKey : "parentId",
			rootpId : "0"
		},
		key : {
			name : "menuName"
		}
	},
	edit : {
		enable : false,
		showRemoveBtn : true,
		showRenameBtn : true
	},
	callback : {
		onClick : zTreeOnClick,
		beforeRemove : zTreeBeforeRemove
	}
};
var setting1 = {
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "parentId",
				rootpId : "0"
			},
			key : {
				name : "menuName"
			}
		},
		edit : {
			enable : false,
			showRemoveBtn : true,
			showRenameBtn : true
		},
		callback : {
			onClick : updateOnClick
		}
	};
function updateOnClick(event, treeId, Node){
	$("#pname").val(Node.menuName);
	var length=Node.menuCode.length;
	var treeNodeLevel=Node.level;
	var codeprefix=2*(treeNodeLevel+1);
	
	$("#codesuffixLi").show();
	$("#ppk").val(Node.id);//父ID
	$("#codeprefix").text(Node.menuCode.substring(0,codeprefix));
	$("#codesuffix").text(Node.menuCode.substring(codeprefix+2,length));
	$("#menuCode").val("");
	$("#Tree").hide();
}
// 处理异步加载返回的节点属性信息
function ajaxDataFilter(treeId, parentNode, responseData) {
	if (responseData) {
		for ( var i = 0; i < responseData.length; i++) {
			if (responseData[i].parentId == 0) {
				responseData[i].isParent = "true";
			}
		}
	}
	return responseData;
};

// 判断是否可以删除
function zTreeBeforeRemove(treeId, treeNode) {
	if(null !=treeNode.children){
		if(treeNode.children.length!=0){
			alert("请先清空下属节点!");
			return false;
		}
	}
	return true;
}
//function zTreeOnRemove(event, treeId, treeNode) {
//	$.ajax({
//		url : "removeadminarea.jhtml",
//		type : "post",
//		data : {
//			id : treeNode.id
//		},
//		dataType : "json",
//		success : function() {
//			//
//		}
//	});
//}
//
//function zTreeOnRename(event, treeId, treeNode) {
//	$.ajax({
//		url : "saveadminarea.jhtml",
//		type : "post",
//		data : {
//			id : treeNode.id,
//			name : treeNode.name
//		},
//		dataType : "json",
//		success : function(data) {
//			// ok
//		}
//	});
//}
var fu="0";
var zTreeLevel=false;
// 节点点击事件函数
function zTreeOnClick(event, treeId, treeNode) {
	var length=treeNode.menuCode.length;
	var treeNodeLevel = treeNode.level;
	var codeprefix = 2 * treeNodeLevel;
	$("#menuCode").show();
	$("#addnode").show();
	$("#codeprefix").text("");
	$("#codesuffix").text("");
	$("#menuAction").val("");
	$("#menuActionLi").hide();
	$("#menuAction").val("");//请求
	$("#status").val("");
	$("#permissionKey").val("");
	$("#tableNameLi").hide();
	fu = treeNodeLevel;
	$("#addnode").hide();
	$("#savenode").attr("style","margin-left: 0px");
	$("#tableNameDepict").val(treeNode.tableNameDepict);
	if (0 == treeNodeLevel) {
		$("#menuAction").val("");//请求
		$("#pcode").val("无");
		$("#pname").val("无");
		$("#ppk").val("");
		$("#codesuffixLi").hide();
//		$("#codeprefix").text("00");
		$("#menuCode").hide();
		$("#menuCode").val("");
		$("#codesuffix").text(treeNode.menuCode);
	}else{
		$("#codesuffixLi").show();
//		$("#pcode").val(treeNode.getParentNode().code);
		$("#ppk").val(treeNode.getParentNode().id);//父ID
		$("#pname").val(treeNode.getParentNode().menuName);
		$("#codeprefix").text(treeNode.menuCode.substring(0,codeprefix));
		$("#codesuffix").text(treeNode.menuCode.substring(codeprefix+2,length));
		$("#menuCode").val(treeNode.menuCode.substring(codeprefix,codeprefix+2));
	} 
	if(treeNodeLevel>1){
		$("#menuActionLi").show();
		$("#menuAction").val(treeNode.menuAction);//请求
		$("#permissionKey").val(treeNode.permissionKey);
	}
	if(treeNodeLevel<series){
		$("#addnode").show();
	}else{
		$("#savenode").attr("style","margin-left: 70px");
	}
	if(treeNodeLevel==series){
		$("#tableNameLi").show();
		$("#Tree").hide();
		zTreeLevel=true;
		//loadTree1(treeNode.id);
	}
	$("#status").val(treeNode.status);
	$("#name").val(treeNode.menuName);
	$("#pk").val(treeNode.id);//主键

	$("#showview").show();
	$("#removenode").show();

	// 初始化为更新状态
	isaddnode = "false";
	
};

var isaddnode = "false";
function menuCodeId(treeNodeLevel){
	var menuCodeId=[];
	$.ajax({
		  url: contextPath +"/getMenuByParentId.jhtml?parentId="+$("#pk").val(),
		  async:false,
		  type:"POST",
		  success: function(result) {
			  $.each(result, function(k, v) {
				  var a = v.menuCode;
				  var b = treeNodeLevel*2+2;
				  a=a.substring(b,b+2);
				  menuCodeId.push(a);
			  });
		  }
	});
	var c = Math.max.apply(null,menuCodeId);
	if(menuCodeId.length<1){
		c=0;
	}
	c=c+1;
	if(c<10){
		c="0"+c;
	}
	return c;
}
// 新增子节点
function addnode() {
	
	$("#savenode").attr("style","margin-left: 70px");
	zTreeLevel=false;
	var treeObj = $.fn.zTree.getZTreeObj("areaTree");
	var nodes = treeObj.getSelectedNodes();
	$("#codesuffixLi").show();
	// 当前节点变为父节点，清空子节点信息
	$("#pcode").val($("#menuCode").val());
	$("#pname").val($("#name").val());
	$("#ppk").val($("#pk").val());
	var treeNodeLevel=0;
	for ( var i = 0, l = nodes.length; i < l; i++) {
		var menuCode=nodes[i].menuCode;
		var length=menuCode.length;
		treeNodeLevel=nodes[i].level;
		var codeprefix=2*treeNodeLevel+2;
		if(0==nodes[i].level){
			$("#codeprefix").text(menuCode.substring(0,2));
			$("#menuCode").hide();
			$("#codesuffix").text(menuCode.substring(4,length));
		}else{
			$("#codeprefix").text(menuCode.substring(0,codeprefix));
			$("#menuCode").show();
			$("#codesuffix").text(menuCode.substring(codeprefix+2,length));
		}
	}
	
	
	$("#menuActionLi").show();
	$("#menuCode").val(menuCodeId(treeNodeLevel));
	$("#name").val("");
	$("#pk").val("");
	$("#menuAction").val("");

	// 设置新增状态
	isaddnode = "true";
	// 隐藏新增按钮和删除按钮
	$("#addnode").hide();
	$("#removenode").hide();
}

// 保存节点信息
function savenode() {
	if(fu>0){
		if("00"==$("#menuCode").val()){
			alert("菜单代码与上级重复!");
			return ;
		}else if($("#menuCode").val().length==0){
			alert("菜单代码不能为空!");
			return ;
		}else if($("#menuCode").val().length<2){
			alert("菜单代码必须为两位!");
			return ;
		}
	}
	
		var code = $("#codeprefix").text()+$("#menuCode").val()+$("#codesuffix").text();
		var name = $("#name").val();
		var pk = $("#pk").val();
		var ppk = $("#ppk").val();
		var permissionKey = $("#permissionKey").val();
		var menuAction = $("#menuAction").val();
		var status = $("#status").val();
		var tableNameDepict = $("#tableNameDepict").val();
		$.ajax({
			url : "saveNewMenu.jhtml",
			type : "post",
			data : {
				id : pk,
				parentId : ppk,
				menuName : name,
				menuCode : code,
				permissionKey : permissionKey,
				menuAction : menuAction,
				status : status,
				tableNameDepict : tableNameDepict
			},
			dataType : "json",
			success : function(msg) {
				if(msg.isSuccess){
					var data = msg.obj;
//					loadTree();
					$("#showview").hide();
					$("#Tree").hide();
					
					var selectNode = getTreeNodeById(pk);
					//更换父节点
					if(ppk != selectNode.parentId){
						var parentNode = getTreeNodeById(ppk);
						treeObj.removeNode(selectNode);
						treeObj.addNodes(parentNode, data);
					}else{
						selectNode.id = data.id;
						selectNode.menuName = data.menuName;
						selectNode.menuCode = data.menuCode;
						selectNode.tableNameDepict = data.tableNameDepict;
						selectNode.menuAction = data.menuAction;
						selectNode.permissionKey = data.permissionKey;
						selectNode.status = data.status;
						treeObj.updateNode(selectNode);
					}
				}
				showMessageOfParent(msg.content);	
				setTimeout("hideMessageOfParent()",3000);
			}
		});
}
function getTreeNodeById(id){
	var nodeArray = treeObj.getNodesByParam("id", id, null);
	var node = nodeArray[0];
	return node;
}

// 删除节点
function removenode() {
	if(!confirm("确定删除?")){
		return false;
	}
	var treeObj = $.fn.zTree.getZTreeObj("areaTree");
	var nodes = treeObj.getSelectedNodes();
	for ( var i = 0, l = nodes.length; i < l; i++) {
		if(null != nodes[i].children){
			if(nodes[i].children.length!=0){
				alert("请先清空下属节点!");
				return false;
			}
		}
	}
	var pk = $("#pk").val();
	$.ajax({
		url : "removeNewMenu.jhtml",
		type : "post",
		data : {
			id : pk
		},
		dataType : "json",
		success : function(data) {
			if(data>0){
				$("#showview").hide();
				showMessageOfParent('删除成功!');	
				setTimeout("hideMessageOfParent()",1000);
			}else{
				showMessageOfParent('删除失败!');	
				setTimeout("hideMessageOfParent()",1000);
			}
			
			for ( var i = 0, l = nodes.length; i < l; i++) {
				treeObj.removeNode(nodes[i]);
			}
		}
	});
}

var treeObj;
var tree;
function loadTree() {
//	showMessageOfParent("正在载入...");
	$.ajax({
		url : "getAllNewMenu.jhtml",
		type : "post",
		dataType : "json",
		success : function(date) {
			treeObj = $.fn.zTree.init($("#areaTree"), setting, date);
//			hideMessageOfParent();
		}
	});
};
function loadTree1(id) {
	$.ajax({
		url : "getMenuBymenuId.jhtml",
		type : "post",
		dataType : "json",
		 data:{"id":id},
		success : function(date) {
			tree = $.fn.zTree.init($("#Tree"), setting1, date);
		}
	});
	$("#Tree").show();
};
//从数据库获取菜单的所有的权限
function addOptionPermission(){
	$.ajax({
		  url: contextPath +"/getMenuPermissionList.jhtml?r="+Math.random(),
		  async:false,
		  type:"POST",
		  success: function(result) {
			  permissionArray=result;
		  }
	});
	$("#permissionKey").empty();
	var optionItem;
	optionItem=$("<option value=''>请选择</option>");
	$("#permissionKey").append(optionItem);
	$.each(permissionArray,function(k,v){
		optionItem=$("<option value="+v.id+">"+v.permissionName+"</option>");
		$("#permissionKey").append(optionItem);
	});
};
//获取某个域的字典
function getMenuLookupCdeList(){
	var optionStatus="<option id=''  value=''>请选择</option>";
	$.ajax({
		  url: contextPath +'/getLookupCdeList.jhtml?r='+Math.random(),
		  async:false,
		  type:"POST",
		  data:{"typeCode":"10141001"},
		  success: function(result) {
			  $.each(result, function(k, v) {
				  optionStatus=optionStatus+"<option id='"+v.id+"'  value='"+v.cdeCode+"'>"+v.cdeName+"</option>";
			  });
		  }
		});
	$("#status").append(optionStatus);
};
var series=0;
//获取菜支持的级数
function getMenuNo(){
	$.ajax({
		  url: contextPath +'/getConfigByCode.jhtml?r='+Math.random(),
		  async:false,
		  type:"POST",
		  data:{"code":"10000004"},
		  success: function(result) {
			  series=result.configValue;
		  }
		});
};
function updateFather(){
	if(zTreeLevel){
		loadTree1($("#pk").val());
	}
}
$(document).ready(function() {
	loadTree();
	getMenuNo();
	getMenuLookupCdeList();
	addOptionPermission();
	$("#showview").hide();
	// 绑定点击事件
	$("#addnode").click(addnode);
	$("#savenode").click(savenode);
	$("#removenode").click(removenode);
	$("#pname").click(updateFather);
	var id = $(".leftside-white",window.parent.document).attr("id");
	if(id==undefined){
		return;
	}
	var permission = false;
	$.ajax({
		url: contextPath+"/isPermitted.jhtml?permissionName=TableName:view&r="+Math.random(),
		async:false,
		success: function(data) {
			permission = data;
			// || "TableName:view" == null
			if (permission) {
			var tableName="";
			$.ajax({
				url : contextPath + "/getTableNameByMenuId.jhtml?r=" + Math.random(),
				async : false,
				type : "POST",
				data : {"id" : id},
				success : function(result) {
					if(null==result.tableNameDepict){
						tableName="没有对应的表";
					}else{
						tableName = result.tableNameDepict;
					}
				}
			});
				var $div = $("<div id='cursorMenu' style='position:absolute;width:150px;background:#FFF;border:1px solid #8BAABF;box-shadow:0 0 10px rgba(0, 0, 0, 0.5);padding:4px 0;z-index:100;'></div>");
				var $cursorMenu = $("<div style='cursor: pointer;padding:3px 30px;'>查看表名</div>");
				$div.append($cursorMenu);
				$("body").click(function(){$div.remove();});
				$("body").bind("contextmenu",function(){
					if($("#cursorMenu")!=undefined){
						$("#cursorMenu").remove();
					}
				});
				$(".zTreeDemoBackground").bind("contextmenu",function(e){
					x = e.clientX;
					y = e.clientY;
					$div.css("left",x);
					$div.css("top",y);
					if($("#cursorMenu")!=undefined){
						$("#cursorMenu").remove();
					}
					$("body").append($div);
					$div.children().hover(function(){$(this).css("color","#FFF").css("background","#1664B4");},function(){$(this).css("color","#000").css("background","#FFF");});
					$cursorMenu.bind("click",function(e){
						$(this).parent().remove();
						$(this).css("color","#000").css("background","#FFF");
						 var offsetWidth = document.body.offsetWidth;
						 var offsetHeight = document.body.offsetHeight;
						 var divLeft = (offsetWidth/2-200)+"px";
						 var divTop = (offsetHeight/2-200)+"px";
						$divTableName = $('<div style="left:'+divLeft+';top:'+divTop+';width:350px;height: auto;" class="message-box" id="warnDiv_contentDiv"></div>');
						$divTop = $('<div class="message-top"></div>');
						$WarnDiv = $('<div style="float:left;font-weight: bold;margin-left: 10px;">提示</div>').appendTo($divTop);
						$closeBtn = $('<button type="button" class="message-close-button">x</button>)').appendTo($divTop);
						$divContent = $('<div style="padding: 30px 0;text-align: center;color: #555555;background:none repeat scroll 0 0 #FAFAFA;">'+tableName+'</div>');
						$divTableName.append($divTop).append($divContent);
						$mask = $('<div id="warnDiv" class="nui-mask"></div>');
						$("body").append($mask).append($divTableName);
						$closeBtn.bind("click",function(){
							$(this).parent().parent().remove();
							$mask.remove();
						});
					});
					return false;
				});
			}
			
		}
	});
});