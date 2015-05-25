var lookUpTypeGrid;
var purviewSitedGrid;
var purviewNoSitedGrid;
var dataViewPurviewSited;
var dataViewPurviewNoSited;
var roleArray=[];
var totalPage;
function LookUpTypeManage() {
	showMessageOfParent("正在载入...");
	var beginPage =1;
	  var data = [];
	  var columns = [];
	  var checkboxSelector = new Slick.CheckboxSelectColumn({
		    cssClass: "slick-cell-checkboxsel"
		  });
	  
	  columns.push(checkboxSelector.getColumnDefinition());
	  columns.push(
			  {id: "typeCode", name: "编号", field: "typeCode", width: 110, editor: Slick.Editors.Text},
	          {id: "typeName", name: "名称", field: "typeName", width: 170, editor: Slick.Editors.Text}
	    );
	  var options = {
			    editable: true,
			    enableAddRow: true,
			    enableCellNavigation: true,
			    asyncEditorLoading: false,
			    autoEdit: false,
			    showTopPanel: true,
			    callback:selectLookUpTypeForPage,
  			    showPagePanel:true,
			    topPanelButtonAttr:[
			      			       {permission:"LookupTypeManager:save",name:"saveClick",onclick:"saveLookupType()",title:"保存",alt:"save",src:"resources/images/save.png",className:"hover-icon-save"},
			      			       {permission:"LookupTypeManager:remove",name:"removeClick",onclick:"removeLookType()",title:"删除",alt:"cancel",src:"resources/images/delete.png",className:"hover-icon-delete"}
			      			       ]
			  };
	  
		  $.ajax({
			  url: contextPath +"/getLookUpTypeListForPage.jhtml?r="+Math.random(),
			  async:false,
			  type:"POST",
			  data:{"currentPage":beginPage},
			  success: function(result) {
				  totalPage = result.pages;
				  $.each(result.list, function(i,v) {
					  var d = (data[i] = {});
					  d["id"] = v.id;
					  d["typeName"] = v.typeName;
					  d["typeCode"] = v.typeCode;
				  });
				  var toolbarModel = new Slick.Plugins.ToolbarModel({queryText:"名称",action:"getLookUpTypeForPage()"});
				  lookUpTypeGrid = new Slick.Grid("#lookUpTypeManagerGrid", data, columns, options);
				  lookUpTypeGrid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow:true}));
				  lookUpTypeGrid.registerPlugin(checkboxSelector);
				  lookUpTypeGrid.setTotalPages(totalPage);
				  lookUpTypeGrid.setTotalCount(result.count);
				  lookUpTypeGrid.registerPlugin(toolbarModel); 
		  
				  lookUpTypeGrid.onAddNewRow.subscribe(function (e, args) {
					  var item = args.item;
					  item.bitFlag=0;
					  lookUpTypeGrid.invalidateRow(data.length);
					  data.push(item);
					  lookUpTypeGrid.updateRowCount();
					  lookUpTypeGrid.render();
				  });
				  lookUpTypeGrid.onClick.subscribe(function (e) {
					  var cells = lookUpTypeGrid.getCellFromEvent(e);
					  var row = lookUpTypeGrid.getSelectedRows();
					  if(cells.row==row[0]){
						  return;
					  }
					  if(lookUpTypeGrid.getData()[cells.row] == undefined){
						  return;
					  }
					  var lookUpTypeId = lookUpTypeGrid.getData()[cells.row].id;
					  if(lookUpTypeId==undefined){
						  lookUpTypeId=" ";
					  }
					  $("#lookUpCdeManagerGridDiv").css("visibility","visible");
					  $("#cdeId").val(lookUpTypeId);
					  getLookUpCdeForPage(lookUpTypeId);
				  });
				  hideMessageOfParent();
			  }
	 });
}
function getLookUpTypeForPage(){
	$("#lookUpTypeManagerGrid_pageUIId_currentPageId").text("1");
	selectLookUpTypeForPage();
}
function selectLookUpTypeForPage() {
	var beginPage = lookUpTypeGrid.getCurrentPage();
	var name=$("#text_lookUpTypeManagerGrid").val();
/*	if(name.length>0){
		beginPage=1;
	} */
	var data = [];
	$.ajax({
			url: contextPath +"/getLookUpTypeListForPage.jhtml?r="+Math.random(),
			async:false,
			type:"POST",
			data:{"name":name,"currentPage":beginPage},
			success: function(result) {
				totalPage = result.pages;
				$.each(result.list, function(i,v) {
					var d = (data[i] = {});
					d["id"] = v.id;
					d["typeName"] = v.typeName;
					d["typeCode"] = v.typeCode;
				});
				lookUpTypeGrid.setTotalCount(result.count);
			}
		});
	lookUpTypeGrid.setTotalPages(totalPage);
	lookUpTypeGrid.onAddNewRow.subscribe(function (e, args) {
		var item = args.item;
		item.bitFlag=0;
		lookUpTypeGrid.invalidateRow(data.length);
		data.push(item);
		lookUpTypeGrid.updateRowCount();
		lookUpTypeGrid.render();
	});
	lookUpTypeGrid.setData(data,true);	
	lookUpTypeGrid.render();
/*	if(name.length>0){
		$("#lookUpTypeManagerGrid_pageUIId_currentPageId").text("1");
	}*/
}

//保存按钮
function saveLookupType() {
	lookUpTypeGrid.getEditorLock().commitCurrentEdit();
	var rowNums = lookUpTypeGrid.getSelectedRows();
	if (rowNums.length != 0) {
		for ( var i = 0; i < rowNums.length; i++){
			var row = rowNums[i];
			var tempData = lookUpTypeGrid.getData();
			var params = tempData[row];
			$.post(contextPath + "/saveLookupType.jhtml", params, function(data) {
				showMessageOfParent(data.content);
				setTimeout(" hideMessageOfParent()", "3000");
				if(data.isSuccess){
					selectLookUpTypeForPage();
				}
			});
		}
	} else {
		layer.alert("请勾选至少一条需要保存的数据!");
		return;
	}
};

//删除
function removeLookType() {
	var delRowNums = lookUpTypeGrid.getSelectedRows();
    if(delRowNums.length!=0){
    	layer.confirm('确定要删除所选记录吗？',function(index){
    		layer.close(index);
			 for(var i= 0;i<delRowNums.length;i++){
				 var params = validateRemove(lookUpTypeGrid,delRowNums,i);
				 if(params==false) continue;
				 $.post(contextPath + "/removeLookupType.jhtml", params,function(data) {
					 if (data.code == '00') {
						 LookUpTypeManage();
					 }
					 showMessageOfParent(data.content);
					 setTimeout("hideMessageOfParent()", 2000);
				 });
			 }
		 });
    }else{
    	layer.alert("请勾选至少一条需要删除的数据!");
    }
}
$(function(){
	LookUpTypeManage();
});