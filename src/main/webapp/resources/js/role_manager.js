var roleGrid;
var checkedData=[];
var postChecked;
var postUnChecked;
var checked=false;
var totalPage;
function roleManager(){
	var data = [];
	var beginPage =1;
    	  var columns = [];
    	  var checkboxSelector = new Slick.CheckboxSelectColumn({
    		    cssClass: "slick-cell-checkboxsel"
    		  });
    	  
    	  columns.push(checkboxSelector.getColumnDefinition());
    	  columns.push(
    	    {id: "name", name: "角色名称", field: "name", width: 282, editor: Slick.Editors.Text}
    	  );
//    	  var pageCallback = getOptionsFromForm();
    	  var options = {
    			editable: true,
  			    enableAddRow: true,
  			    enableCellNavigation: true,
  			    asyncEditorLoading: false,
  			    autoEdit: false,
  			    showTopPanel: true,
  			    callback:selectRoleForPage,
  			    showPagePanel:true,
  			    topPanelButtonAttr:[
  			      			       {permission:"RoleManager:save",name:"saveClick",onclick:"saveRoleManager()",title:"保存",alt:"save",src:"resources/images/save.png",className:"hover-icon-save"},
  			      			       {permission:"RoleManager:remove",name:"removeClick",onclick:"removeRoleManager()",title:"删除",alt:"cancel",src:"resources/images/delete.png",className:"hover-icon-delete"}
  			      			       ]
    		        
    			  };

    			$.ajax({
    				  url: contextPath +"/getRoleListForPage.jhtml?r="+Math.random(),
    				  async:false,
    				  type:"POST",
    				  data:{"currentPage":beginPage},
    				  success: function(result) {
    					  totalPage = result.pages;
    				$.each(result.list, function(i,v) {
    					var d = (data[i] = {});
    					d["id"] = v.id;
    					d["name"] = v.name;
    				});
    		  var toolbarModel = new Slick.Plugins.ToolbarModel({queryText:"角色名称",action:"getRoleForPage()"});
    		  roleGrid = new Slick.Grid("#roleManagerGrid", data, columns, options);
    		  roleGrid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow:true}));
    		  roleGrid.registerPlugin(checkboxSelector);
    		  roleGrid.setTotalPages(totalPage);
    		  roleGrid.setTotalCount(result.count);
    		  roleGrid.registerPlugin(toolbarModel);
    		  
    		  roleGrid.onAddNewRow.subscribe(function (e, args) {
    			    var item = args.item;
    			    item.bitFlag=0;
    			    roleGrid.invalidateRow(data.length);
    			    data.push(item);
    			    roleGrid.updateRowCount();
    			    roleGrid.render();
    			    //refreshPermissionSitedGrid("");
					//refreshPermissionNoSitedGrid("");
    			  });
    			  roleGrid.onClick.subscribe(function (e) {
    					var cells = roleGrid.getCellFromEvent(e);
//    					if(cells == undefined){
//    						cells = {};
//    						cells.row = 0;
//    						cells.cell = 1;
//    					}
    					var row = roleGrid.getSelectedRows();
    					if(cells.row==row[0]){
    						return;
    					}
    					if(roleGrid.getData()[cells.row] == undefined){
    						return;
    					}
    					var roleId = roleGrid.getData()[cells.row].id;
    					refreshPermissionSitedGrid(roleId);
    				});
    				  }
    		  });
}
//保存角色
function saveRoleManager(){
	roleGrid.getEditorLock().commitCurrentEdit();
	var rowNums = roleGrid.getSelectedRows();
	if (rowNums.length != 0) {
		for ( var i = 0; i < rowNums.length; i++){
			var row = rowNums[i];
			var tempData = roleGrid.getData();
			var params = tempData[row];
			$.post(contextPath + "/saveRole.jhtml", params, function(data) {
				showMessageOfParent(data.content);
				setTimeout("hideMessageOfParent()", 2000);
				if (data.code == '00') {
					selectRoleForPage();
				}
			});
		}
		range = [];
		roleGrid.getSelectionModel().setSelectedRanges(range);
	} else {
		layer.alert("请勾选至少一条需要保存的数据!",4);
		return;
	}
}
//删除角色
function removeRoleManager() {
	var delRowNums = roleGrid.getSelectedRows();
    if(delRowNums.length!=0){
    	layer.confirm('确定要删除所选记录吗？',function(index){
    		layer.close(index);
			 for(var i= 0;i<delRowNums.length;i++){
				 var params = validateRemove(roleGrid,delRowNums,i);
				 if(params==false) continue;
				 $.post(contextPath + "/removeRole.jhtml", params,function(data) {
					 if(data>0){
						 showMessageOfParent('删除成功 ！');	
					 }else{
						 showMessageOfParent('删除失败 ！或因此角色已被用户使用，请确认');
					 }
					 setTimeout("hideMessageOfParent()", 2000);
					 selectRoleForPage();
				 });
			 }
			 range = [];
			 roleGrid.getSelectionModel().setSelectedRanges(range);
		 });
    }else{
    	layer.alert("请勾选至少一条需要删除的数据!",4);
    }
}
//获得勾选的角色Id。如果同时勾选2个或以上角色，则返回-1
function getOnlySelectedRoleId(){
	if(roleGrid == undefined){
		return -1;
	}
	roleGrid.getEditorLock().commitCurrentEdit();
	var rowNums = roleGrid.getSelectedRows();
	if(rowNums.length==1){
		for(var i= 0;i<rowNums.length;i++){
			var row = rowNums[i];
		    var tempData = roleGrid.getData();
            var params=tempData[row];
            return params.id;
		}
    }else{
	   return -1;
    }
}

//保存角色所拥有的权限
function saveRolePermission(nodes,checked){
	var roleId = getOnlySelectedRoleId();
	if(roleId==-1){
		layer.alert("请勾选唯一用户数据!",4);
		return;
    }
            
    $.ajax({
	  url: contextPath +'/saveRolePermissionBatch.jhtml',
	  data: {"roleId":roleId,"permissionId":postChecked},
	  type:'post',
	  async:false,
	  success: function(data) {
		if(data!=-1){
			nodes.permissionKey=data;
			var result=[];
			$.each(data, function(k, rp) {
				result[rp.permissionId]=rp.id;
			});
			setNodes(nodes,result);
			showMessageOfParent('保存成功 ！');
		}else{
			showMessageOfParent('部分记录保存失败 ！');
		}
	  }
	});
    setTimeout("hideMessageOfParent()", 2000);
};
//删除角色所拥有的权限
function removeRolePermission(nodes,unChecked){
	var roleId = getOnlySelectedRoleId();
	if(roleId==-1){
		layer.alert("请勾选唯一用户数据!",4);
		return;
    } 
    $.ajax({
		url: contextPath +'/removeRolePermissionBatch.jhtml',
		data: {"rolePermissionId":postUnChecked},
		type:'post',
		async:false,
		success: function(data) {
			if(data>0){
				showMessageOfParent('删除成功 ！');
			}else{
				showMessageOfParent('部分记录删除失败 ！');
			}
		}
	});
    setTimeout("hideMessageOfParent()", 2000);
}

//刷新已配置的权限列表
function refreshPermissionSitedGrid(roleId){
	checkedData = [];
	$.ajax({
		  url: contextPath +'/getRolePermissionList.jhtml',
		  data: {roleId : roleId},
		  type:'post',
		  async:false,
		  success: function(result) {
			 $.each(result, function(k, rp) {
				 checkedData[rp.permissionId]=rp.rolePermissionId;
			  });
			 loadTree();
		  }
		});
}

function getRoleForPage(){
	$("#roleManagerGrid_pageUIId_currentPageId").text("1");
	selectRoleForPage();
}
//分页
function selectRoleForPage(){
	var currentPage = roleGrid.getCurrentPage();
	var data = [];
	$.ajax({
		  url: contextPath +'/getRoleListForPage.jhtml?r='+Math.random(),
		  async:false,
		  type:"POST",
		  data: {"currentPage":currentPage,"name":$("#text_roleManagerGrid").val()},
		  success: function(result) {
			  totalPage = result.pages;
			  $.each(result.list, function(k, v) {
				  var d = (data[k] = {});
				  d["id"] = v.id;
				  d["name"] = v.name;
			  });
			  roleGrid.setTotalCount(result.count);
		  }
		});
	roleGrid.setTotalPages(totalPage);
	roleGrid.onAddNewRow.subscribe(function (e, args) {
		var item = args.item;
		item.bitFlag=0;
		roleGrid.invalidateRow(data.length);
		data.push(item);
		roleGrid.updateRowCount();
		roleGrid.render();
	});
	roleGrid.setData(data,true);	
	roleGrid.render();
}

function processNodeChecked(node){
	postChecked = postChecked + node.id+";";
	postUnChecked = postUnChecked + node.permissionKey+";";
}
function getCheckedNode(nodes){
	if(nodes.isParent){
		if(nodes.level!=0){
			processNodeChecked(nodes);
		}
		var childrenNodes = nodes.children;
		for (var i=0, l=childrenNodes.length; i < l; i++) {
			var node = childrenNodes[i];
			getCheckedNode(node);
		}
	}else{
		processNodeChecked(nodes);
	}
	return;
}

function getParentCheckedNode(node){
	var pNode = node.getParentNode();
	if(null!=pNode&&pNode.level!=0){
		var cNodes = pNode.getCheckedNodes();
		if(cNodes.length==0 || cNodes.length>1){
			processNodeChecked(pNode);
		}
		getParentCheckedNode(pNode);
	}
	return;
}
//for set each node
function setNodes(nodes,result){
	for (var i=0, l=nodes.length; i < l; i++) {
		var node = nodes[i];
		if(node.level!=0){
			node.permissionKey=result[node.id];
		}
	}
	return;
}
//选中或取消所选权限
function setNodeChecked(checkNode){
	postChecked="";
	postUnChecked="";
	var nodes = treeObj.getChangeCheckedNodes();
	for (var i=0, l=nodes.length; i < l; i++) {
		var node = nodes[i];
		node.checkedOld = checkNode.checked;
		if(checkNode.checked){
			//if(!loadStatus){
				if(checkNode.level==2&&node.level>2){
					treeObj.checkNode(node, false, false,false);
					node.checkedOld = false;
					continue;
				}
			//}
		}else{
			//if(!loadStatus){
				if(checkNode.level==3&&node.level<3){
					treeObj.checkNode(node, true, false,false);
					node.checkedOld = true;
					continue;
				}
			//}
		}
		if(node.level==0||node.level==1){
			continue;
		}
		if(checkNode.checked){
			postChecked = postChecked + node.id+";";
		}else{
			postUnChecked = postUnChecked + node.permissionKey+";";
		}
	}
	if(!loadStatus){
		if(checkNode.checked){
			saveRolePermission(nodes,postChecked);
		}else{
			removeRolePermission(nodes,postUnChecked);
		}
	}
}


//check 事件
function zTreeOnCheck(event, treeId, treeNode) {
	setNodeChecked(treeNode);
};
function zTreeOnClick(event, treeId, treeNode){
	/*alert(treeNode.checkedOld);
	alert(treeNode.level);*/
}
function zTreeBeforeCheck(event, treeId, treeNode){}
var setting = {
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "parentId",
				rootpId : "0"
			},
			key : {
				name : "permissionName"
			}
		},
		edit : {
			enable : false,
			showRemoveBtn : true,
			showRenameBtn : true
		},
		check :{
			enable : true,
			chkboxType : {"Y":"ps","N" : "ps" }
		},
		callback : {
			onCheck: zTreeOnCheck,
			onClick: zTreeOnClick,
			beforeCheck: zTreeBeforeCheck
		}
	};
var treeObj;
var loadStatus=false;
function loadTree() {
	loadStatus=true;
	$.ajax({
		url : "getAllPermission.jhtml",
		type : "post",
		dataType : "json",
		success : function(date) {
			treeObj = $.fn.zTree.init($("#permissionTree"), setting, date);
			var nodes = treeObj.getNodes();
			setDefaultNodeChecked(nodes);
			loadStatus=false;
		}
	});
}

//设置默认值
function setDefaultNodeChecked(nodes){
	for (var i=0, l=nodes.length; i < l; i++) {
		var node = nodes[i];
		var value = checkedData[node.id];
		if(value != undefined){
			node.permissionKey=value;
		}
		if(value != undefined){
			treeObj.checkNode(node, true, true,true);
		}
		if(node.isParent){
			setDefaultNodeChecked(node.children);
		}
	}
	return;
}
$(function () {
	roleManager();
	/*$("#rp_save").bind("click",function(){
		postChecked="";
		postUnChecked="";
		getNodeChecked(nodes);
		if(checked){
			saveRolePermission(nodes,postChecked);
		}else{
			removeRolePermission(nodes,postUnChecked);
		}
	});*/
});
