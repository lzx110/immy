var columns = [];
var lookupArray = [];
var grid;


var pagination;
var gridOptions;
var currentPageNumber = 1;
var maxsize = 5000;
var dataSize = 0;
var status_cde_map = new Map();

$(function(){	
	// 预输入(代理商)
	$("#acqId").autocomplete({
		source: acqName()
	});
	
	// 分页查询
	$("#search").bind("click", function() {
		currentPageNumber = 1;
		getStatementConfigListForPage();
	});
	$("#reset").bind("click",function(){
		$(':input').not(':button, :submit, :reset, :hidden, :checkbox').val('');
		$.each($("select"),function(i,k){
			$(k).get(0).selectedIndex=0;
		});
		$("input[type='checkbox']").removeAttr("checked");
	});
	

	columns.push( 
			{id: "acqName", name: "通道名称", width:"150px"},
			/*{id: "statementName", name: "配置名", width:"120px"},*/
			{id: "startRow", name: "对账文件开始行", width:"120px",  field: "statementFile.startRow"},
			{id: "extension", name: "对账文件后缀", width:"120px"},
			{id: "separator", name: "对账文件分隔符", width:"120px"},
			{id: "createUser", name: "创建人", width:"120px"},
			{id: "createTime", name: "创建时间", width:"160px"},
			{id: "operating", name: "操作"}
	);
	
	//分页
	gridOptions = {};
	gridOptions.showTopPanel=true;
	gridOptions.column=columns;
	grid = new HatchetFramework.Grid("#statementConfig_grid",null,null,gridOptions);
	grid.setColumns(columns);
	
})


//查询
function getStatementConfigListForPage() {
	showMessageOfParent("正在载入...");
	
	var acqId = $("#acqId").val();
	
	
	$.ajax({
		url : contextPath + "/getStatementConfigListForPage.jhtml",
		type : "POST",
		data: {
			"currentPage":currentPageNumber,
			"acqId":acqId
			
		},
		success : function(result) {	
			$.each(result.list, function(k, v) {
				 /*result.list[k].acqName=$("<a  href='javascript:void(0)'>"+v.acqName+"</a>").bind("click",function(){
					 parent.menuClickFun(null, v.acqId+"pos", "查看详情",contextPath + "/viewStatementConfig.jhtml?id="+v.acqId);	 
				 });*/
				
				result.list[k].startRow = result.list[k].statementFile.startRow;
				result.list[k].extension = result.list[k].statementFile.extension;
				result.list[k].separator = result.list[k].statementFile.separator;
				
				 var operatingArray = []; 
			 var $eidtA = $("<a id=edit_"+v.id+" style='padding:0 5px;' href='javascript:void(0)'>编辑</a>").bind("click",function(){
			 parent.menuClickFun(null, v.acqId, 
					 "编辑","editStatementConfig.jhtml?acqId="+v.acqId);
			 return false;
			});
				
			var $deleteA = $(" <a id=delete_"+v.acqId+" style='padding:0 5px;' href='javascript:void(0)'>删除</a>").bind("click",function(){
				
				layer.confirm("确定要删除么？", function(index){
					$.ajax({
						  url: contextPath +"/removeStatementConfig.jhtml",
						  data:{acqId : v.acqId },
						  type:"POST",
						  success: function(msg) {
							  showMessageOfParent(msg.content);
							  setTimeout("hideMessageOfParent()",3000);
							  if(msg.isSuccess){
								  getStatementConfigListForPage();
							  }
						  }
					});
					layer.close(index);
				});
				
			});
			$deleteA.attr("permission","StatementConfigManager:remove");
			$eidtA.attr("permission","StatementConfigManager:edit");
			operatingArray.push($eidtA);
			operatingArray.push($deleteA);
			result.list[k].operating = operatingArray;
			
			});
			$addA=$("<a  href='javascript:void(0);' style='margin-left:10px;' class='hatchet-top-button' id ='add'> 新增</a>").bind("click",function(){
			
				var r=getRandomString(32);
				parent.menuClickFun(null, r, "新增","addStatementConfig.jhtml?r="+r);
				return false;
			});
			if(grid.getTopButton("add")==null){
				grid.setTopButton("add",$addA,"StatementConfigManager:add");
			}	
			
		    grid.setData(result.list);
		    
		    //// b不分页
		    /*if (pagination == null||pagination==undefined) {
		    	var options = {callback:paginationCallBack};
		    	pagination = new HatchetFramework.Pagination("#statementConfig_pagination",options);
		    } else {
		    	pagination.setCurrentPageNumber(currentPageNumber);
		    }

	    	pagination.setPageCount(result.pages);
		    pagination.setCount(result.count);
		    dataSize = result.count;*/
		    hideMessageOfParent();
		}
	});
}


//通道商户名称(预输入)
function acqName() {
	var array=[];
	$.ajax({
		url: contextPath + "/getAllAcq.jhtml",
		async:false,
		type:"POST",
		data:{},
		success: function(result) {
			$.each(result, function(i,v) {
				if (v.acqName != null && v.acqName != undefined) {
					array.push(v.acqName);
				}
			});
		}
	});
	return array;
}




//分页控制
function paginationCallBack() {
	if (pagination != null || pagination != undefined) {
		currentPageNumber = pagination.getCurrentPageNumber();
	}
	getStatementConfigListForPage();
}

function startLoad() {
	currentPageNumber = 1;
	getStatementConfigListForPage();
}

$(function(){
	startLoad();
});

