var userGrid;
var purviewSitedGrid;
var purviewNoSitedGrid;
var dataViewPurviewSited;
var dataViewPurviewNoSited;
var roleArray = [];
var lookupArray = [];
var totalPage;
function userManage() {
	showMessageOfParent("正在载入...");
	var beginPage = 1;
	var data = [];
	var columns = [];
	var checkboxSelector = new Slick.CheckboxSelectColumn({
		cssClass : "slick-cell-checkboxsel"
	});

	columns.push(checkboxSelector.getColumnDefinition());
	columns.push({
		id : "loginName",
		name : "用户名",
		field : "loginName",
		width : 160,
		editor : Slick.Editors.Text
	}, {
		id : "status",
		name : "状态",
		lookupArray : getLookupCdeList(),
		field : "status",
		width : 60,
		formatter : Slick.Formatters.Lookup,
		editor : Slick.Editors.LookupSelect
	}, {
		id : "roleId",
		name : "角色名称",
		lookupArray : getRoleList(),
		field : "roleId",
		width : 160,
		formatter : Slick.Formatters.Lookup,
		editor : Slick.Editors.LookupSelect
	}, {
		id : "email",
		name : "邮箱",
		field : "email",
		width : 160,
		editor : Slick.Editors.Text
	},{
		id : "createTime",
		name : "创建时间",
		field : "createTime",
		width : 140
	});
	var options = {
		editable : true,
		enableAddRow : true,
		enableCellNavigation : true,
		asyncEditorLoading : false,
		autoEdit : false,
		showTopPanel : true,
		callback : selectUserForPage,
		showPagePanel : true,
		topPanelButtonAttr : [ {
			permission : "UserManager:save",
			name : "saveClick",
			onclick : "saveUser()",
			title : "保存",
			alt : "save",
			src : "resources/images/save.png",
			className : "hover-icon-save"
		}, {
			permission : "UserManager:remove",
			name : "removeClick",
			onclick : "removeUser()",
			title : "删除",
			alt : "cancel",
			src : "resources/images/delete.png",
			className : "hover-icon-delete"
		} ]

	};

	$.ajax({
		url : contextPath + "/getUserListForPage.jhtml?r=" + Math.random(),
		async : false,
		type : "POST",
		data : {
			"currentPage" : beginPage
		},
		success : function(result) {
			totalPage = result.pages;
			$.each(result.list, function(i, v) {
				var d = (data[i] = {});
				d["id"] = v.id;
				d["loginName"] = v.loginName;
				d["password"] = v.password;
				d["roleId"] = v.roleId;
				d["status"] = v.status;
				d["email"] = v.email;
				d["createTime"] = v.createTime;
				// d["userPermission"] = v.userPermission;
			});
			var queryoptions = [ {
				type : "select",
				id : "roleId",
				title : "角色名称",
				items : getRoleList()
			}];			
			var toolbarModel = new Slick.Plugins.ToolbarModelWithPara({
				queryText : "用户名称",
				actionDetalis : "getUserForPage()",
				queryItems : queryoptions
			});
			userGrid = new Slick.Grid("#userManagerGrid", data, columns,
					options);
			userGrid.setSelectionModel(new Slick.RowSelectionModel({
				selectActiveRow : false
			}));
			userGrid.registerPlugin(checkboxSelector);
			userGrid.setTotalPages(totalPage);
			userGrid.setTotalCount(result.count);
			userGrid.registerPlugin(toolbarModel);

			userGrid.onAddNewRow.subscribe(function(e, args) {
				var item = args.item;
				item.bitFlag = 0;
				userGrid.invalidateRow(data.length);
				data.push(item);
				userGrid.updateRowCount();
				userGrid.render();
			});
			hideMessageOfParent();
		}
	});
}
// 删除
function removeUser() {
	var delRowNums = userGrid.getSelectedRows();
	if (delRowNums.length != 0) {
    	layer.confirm('确定要删除所选记录吗？',function(index){
    		layer.close(index);
			for ( var i = 0; i < delRowNums.length; i++) {
				var params = validateRemove(userGrid,delRowNums,i);
				params.createTime = undefined;
				if(params==false) continue;
				$.post(contextPath + "/removeUser.jhtml", params,
						function(data) {
							if (data > 0) {
								showMessageOfParent('删除成功 ！');
								setTimeout("hideMessageOfParent()", 2000);
								selectUserForPage();
							}else if(data == -2){
								showMessageOfParent('删除失败，有关联数据未删除！');
								setTimeout("hideMessageOfParent()", 2000);
							} else {
								showMessageOfParent('删除失败 ！');
								setTimeout("hideMessageOfParent()", 2000);
							}
						});
			}
		});
	} else {
		layer.alert("请勾选至少一条需要删除的数据!",4);
	}
}

// 保存按钮
function saveUser() {
	userGrid.getEditorLock().commitCurrentEdit();
	var rowNums = userGrid.getSelectedRows();
	if (rowNums.length != 0) {
		for ( var i = 0; i < rowNums.length; i++) {
			var row = rowNums[i];
			var tempData = userGrid.getData();
			var params = tempData[row];
			$.post(contextPath + "/saveUser.jhtml", params, function(data) {
				showMessageOfParent(data.content);
				setTimeout("hideMessageOfParent()", 2000);
				if (data.code == '00') {
					selectUserForPage();
				}
			});
		}
	} else {
		layer.alert("请勾选至少一条需要保存的数据!",4);
		return;
	}
};
// 更新用户状态按钮
function upadteUserStatus() {
	userGrid.getEditorLock().commitCurrentEdit();
	var rowNums = userGrid.getSelectedRows();
	if (rowNums.length != 0) {
		for ( var i = 0; i < rowNums.length; i++) {
			var row = rowNums[i];
			var tempData = userGrid.getData();
			var params = tempData[row];
			$.post(contextPath + "/upadteUserStatus.jhtml", params, function(
					data) {
				if (data > 0) {
					showMessageOfParent('更新成功 ！');
				} else {
					showMessageOfParent('更新失败 ！');
				}
				setTimeout(" hideMessageOfParent()", 2000);
				selectUserForPage();
			});
		}
	} else {
		layer.alert("请勾选至少一条需要更新的数据!",4);
		return;
	}
};
function getUserForPage(){
	$("#userManagerGrid_pageUIId_currentPageId").text("1");
	selectUserForPage();
}
// 分页
function selectUserForPage() {
	var currentPage = userGrid.getCurrentPage();
	var data = [];
	var name = $("#text_userManagerGrid").val();
	var roleId =$("#roleId").val();
/*	if (name.length > 0) {
		beginPage = 1;
	}*/
	$.ajax({
		url : contextPath + '/getUserListForPage.jhtml',
		data : {
			"currentPage" : currentPage,
			"loginName" : name,
			"roleId":roleId
		},
		async : false,
		type : "POST",
		success : function(result) {
			totalPage = result.pages;
			count = result.count;
			$.each(result.list, function(k, v) {
				var d = (data[k] = {});
				d["id"] = v.id;
				d["loginName"] = v.loginName;
				d["password"] = v.password;
				d["status"] = v.status;
				d["roleId"] = v.roleId;
				d["email"] = v.email;
				d["createTime"] = v.createTime;
			});
			userGrid.setTotalCount(result.count);
		}
	});
	userGrid.setTotalPages(totalPage);
	userGrid.setTotalCount(count);
	userGrid.onAddNewRow.subscribe(function(e, args) {
		var item = args.item;
		item.bitFlag = 0;
		userGrid.invalidateRow(data.length);
		data.push(item);
		userGrid.updateRowCount();
		userGrid.render();
	});
	userGrid.setData(data, true);
	userGrid.render();
/*	if (name.length > 0) {
		$("#userManagerGrid_pageUIId_currentPageId").text("1");
	}*/
}

function getRoleList() {
	roleArray = [];
	$.ajax({
		url : contextPath + '/getRoleList.jhtml',
		async : false,
		type : "POST",
		success : function(result) {
			$.each(result, function(k, v) {
				roleArray.push(v);
			});
		}
	});
	return roleArray;
}
// 获取某个域的字典
function getLookupCdeList() {
	lookupArray = [];
	$.ajax({
		url : contextPath + '/getLookupCdeList.jhtml?r=' + Math.random(),
		async : false,
		type : "POST",
		data : {
			"typeCode" : "10111001"
		},
		success : function(result) {
			$.each(result, function(k, v) {
				var data = new Object;
				data.id = v.cdeCode;
				data.name = v.cdeName;
				lookupArray.push(data);
			});
		}
	});
	return lookupArray;
}
$(function() {
	userManage();
});