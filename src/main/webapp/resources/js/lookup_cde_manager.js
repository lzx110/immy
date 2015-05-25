var lookUpCdeGrid;
var purviewSitedGrid;
var purviewNoSitedGrid;
var dataViewPurviewSited;
var dataViewPurviewNoSited;
var lookupArray=[];
var totalPage;
var beginPage =1;
function LookUpManage() {
	showMessageOfParent("正在载入...");
	
	  var data = [];
	  var columns = [];
	  var checkboxSelector = new Slick.CheckboxSelectColumn({
		    	cssClass: "slick-cell-checkboxsel"
		  });
	  
	  columns.push(checkboxSelector.getColumnDefinition());
	  columns.push(
	    {id: "cdeName", name: "名称", field: "cdeName", width: 160, editor: Slick.Editors.Text},
	    {id: "cdeCode", name: "编号", field: "cdeCode", width: 80, editor: Slick.Editors.Text,maxLength:9},
	    {id: "integerKey", name: "数字编号", field: "integerKey", width: 80, editor: Slick.Editors.Double},
	    {id: "typeId", name: "字典类型", field: "typeId", lookupArray : getLookUpTypeList(),  width: 160,formatter: Slick.Formatters.Lookup, editor: Slick.Editors.LookupSelect},
	    {id: "remarks", name: "描述", field: "remarks", width: 240, editor: Slick.Editors.Text}
	  );
	  
	  var options = {
			    editable: true,
			    enableAddRow: true,
			    enableCellNavigation: true,
			    asyncEditorLoading: false,
			    autoEdit: false,
			    callback:callbackPage,
			    showTopPanel: true,
  			    showPagePanel:true,
			    topPanelButtonAttr:[
			      			       {permission:"LookupCdeManager:save",name:"saveClick",onclick:"saveLookupCde()",title:"保存",alt:"save",src:"resources/images/save.png",className:"hover-icon-save"},
			      			       {permission:"LookupCdeManager:remove",name:"removeClick",onclick:"removeLookupCde()",title:"删除",alt:"cancel",src:"resources/images/delete.png",className:"hover-icon-delete"}
			      			       ]
			  };
	  
		  $.ajax({
			  url: contextPath +"/getLookUpCdeListForPage.jhtml?r="+Math.random(),
			  async:false,
			  type:"POST",
			  data:{"currentPage":beginPage},
			  success: function(result) {
				     totalPage = result.pages;
				     var toolbarModel = new Slick.Plugins.ToolbarModel({queryText:"名称",action:"callbackPage()"});
				     lookUpCdeGrid = new Slick.Grid("#lookUpCdeManagerGrid", data, columns, options);
				     lookUpCdeGrid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow:false}));
				     lookUpCdeGrid.registerPlugin(checkboxSelector);
				     lookUpCdeGrid.setTotalPages(totalPage);
				     lookUpCdeGrid.setTotalCount(result.count);
				     lookUpCdeGrid.registerPlugin(toolbarModel); 
		  
				     lookUpCdeGrid.onAddNewRow.subscribe(function (e, args) {
				    	 var item = args.item;
				    	 item.bitFlag=0;
				    	 lookUpCdeGrid.invalidateRow(data.length);
				    	 data.push(item);
				    	 lookUpCdeGrid.updateRowCount();
				    	 lookUpCdeGrid.render();
				     });
				     hideMessageOfParent();
			  	}
		  });
};
function callbackPage(){
	selectLookUpCdeForPage($("#cdeId").val());
};
function getLookUpCdeForPage(lookUpTypeId){
	$("#lookUpCdeManagerGrid_pageUIId_currentPageId").text("1");
	selectLookUpCdeForPage(lookUpTypeId);
}
function selectLookUpCdeForPage(lookUpTypeId){
	var dictionaryType = $("#dictionaryType").val();
	var beginPage = lookUpCdeGrid.getCurrentPage();
	if(lookUpTypeId!=undefined){
		dictionaryType = lookUpTypeId;
	}
	var dictionaryName=$("#text_lookUpCdeManagerGrid").val();
	var data = [];
	$.ajax({
		  url: contextPath +"/getLookUpCdeListForPage.jhtml?r="+Math.random(),
		  async:false,
		  type:"POST",
		  data:{"dictionaryName":dictionaryName,"dictionaryType":dictionaryType,"currentPage":beginPage},
		  success: function(result) {
			  totalPage = result.pages;
			  $.each(result.list, function(i,value) {
					var d = (data[i] = {});
					d["id"] = value.id;
					d["cdeName"] = value.cdeName;
					d["cdeCode"] = value.cdeCode;
					d["typeId"] = value.typeId;
					d["remarks"] = value.remarks;
					d["integerKey"] = value.integerKey;
				});
			  lookUpCdeGrid.setTotalCount(result.count);
		  }
		});
	lookUpCdeGrid.setTotalPages(totalPage);
	lookUpCdeGrid.onAddNewRow.subscribe(function (e, args) {
		var item = args.item;
		item.bitFlag=0;
		lookUpCdeGrid.invalidateRow(data.length);
		data.push(item);
		lookUpCdeGrid.updateRowCount();
		lookUpCdeGrid.render();
	});
	lookUpCdeGrid.setData(data,true);	
	lookUpCdeGrid.render();
}

//保存按钮
function saveLookupCde() {
	lookUpCdeGrid.getEditorLock().commitCurrentEdit();
	var rowNums = lookUpCdeGrid.getSelectedRows();
	if (rowNums.length != 0) {
		for ( var i = 0; i < rowNums.length; i++){
			var row = rowNums[i];
			var tempData = lookUpCdeGrid.getData();
			var params = tempData[row];
			$.post(contextPath + "/saveLookupCde.jhtml", params, function(data) {
				if (data.isSuccess) {
					selectLookUpCdeForPage($("#cdeId").val());
				}
				showMessageOfParent(data.content);
				setTimeout("hideMessageOfParent()", 2000);
			});
		}
	} else {
		layer.alert("请勾选至少一条需要保存的数据!");
		return;
	}
};


//删除
function removeLookupCde() {
	var delRowNums = lookUpCdeGrid.getSelectedRows();
    if(delRowNums.length!=0){
    	layer.confirm('确定要删除所选记录吗？',function(index){
    		layer.close(index);
			 for(var i= 0;i<delRowNums.length;i++){
				 var params = validateRemove(lookUpCdeGrid,delRowNums,i);
					if(params==false) continue;
				 $.post(contextPath + "/removeLookupCde.jhtml", params,function(data) {
					 if(data.value>0){
						 showMessageOfParent('删除成功 ！');	
					 }else{
						 showMessageOfParent('删除失败 ！');
					 }
					 setTimeout("hideMessageOfParent()", 2000);
					selectLookUpCdeForPage($("#cdeId").val());
				 });
			 }
		 });
    }else{
    	layer.alert("请勾选至少一条需要删除的数据!");
    }
}
//获取字典域
function getLookUpTypeList(){
	lookupArray=[];
	$.ajax({
		  url: contextPath +'/getALLLookUpTypeList.jhtml',
		  async:false,
		  type:"POST",
		  success: function(result) {
			  $.each(result, function(k, v) {
				  var data = new Object;
				  data.id = v.id;
				  data.name = v.typeName;
				  lookupArray.push(data);
			  });
		  }
		});
	return lookupArray;
}
$(function(){
	LookUpManage();
});