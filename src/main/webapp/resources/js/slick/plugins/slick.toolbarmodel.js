(function(jQuery) {
	$.extend(true, window, {
		"Slick" : {
			"Plugins" : {
				"ToolbarModelSelect" : ToolbarModelSelect,
				"ToolbarModel" : ToolbarModel,
				"ToolbarModelWithPara" : ToolbarModelWithPara
			}
		}
	});

	function ToolbarModelSelect(option) {

		var _grid;

		function init(grid) {
			_grid = grid;
			var _gridId = '#' + _grid.getGridId();
			var $containerDiv = $('<span style="float:right;margin-top:5px;display:inline;width:210px"></span>');
			var $selectOption = $("<select id='select" + _grid.getGridId()
					+ "' style='float:left;padding:1px;margin-top:-5px;height:22px;' class='bootstrap-text'>");
			$selectOption.append('<option value="">请选择</option>');
			$.each(option.list, function(k, v) {
				$selectOption.append('<option value=' + v.id + '>' + v.name + '</option>');
			});

			var $buttonQuery = $('<input id=button_'
					+ _grid.getGridId()
					+ ' type="button" value="查询" style="font-size: 12px; margin-top: -7px; width: 45px;height:23px" class="bootstrap-button">');

			$containerDiv.append($selectOption).append($buttonQuery);
			$containerDiv.appendTo($(_gridId + ' div .slick-top-panel'));

			$buttonQuery.bind("click", function() {
				eval(option.action);
			});
		}

		$.extend(this, {
			"init" : init
		});
	}

	function ToolbarModel(option) {

		var _grid;

		function init(grid) {
			_grid = grid;
			var _gridId = '#' + _grid.getGridId();
			var $containerDiv = $('<span style="float:right;margin-top:5px;display:inline;width:210px;position:relative"></span>');
			var $textInput = $('<input id=text_' + _grid.getGridId() + ' type="text" style="height:20px;float:left;padding:1px;margin-top:-2px;position:relative;background:transparent;" class="bootstrap-text">');
			var $textLabel = $("<label style='position:absolute;height:23px;line-height:23px;left:5px;color:#ccc;cursor: text;display:block;'>"+option.queryText+"</label>");
			var $div = $("<div style='background:#fff;position: relative; display: inline-block;float: left;height: 22px;margin-top: -5px;'></div>");
			$div.append($textLabel).append($textInput);
			var $buttonQuery = $('<input id=button_'
					+ _grid.getGridId()
					+ ' type="button" value="查询" style="font-size: 12px;height:24px; margin-top: -7px; width: 45px;margin-left: 5px;" class="bootstrap-button">');

			$containerDiv.append($div).append($buttonQuery);
			$containerDiv.appendTo($(_gridId + ' div .slick-top-panel'));

			$buttonQuery.bind("click", function() {
				eval(option.action);
			});
			$div.click(function(e){
				$textLabel.hide();
				$textInput.focus();
			});
			$textInput.focus(function(e){
				$textLabel.hide();
			});
			$textInput.focusout(function(){
				if($textInput.val().length==0){
					$textLabel.show();
				}
			});
		}

		$.extend(this, {
			"init" : init
		});
	}

	function ToolbarModelWithPara(options) {

		var _grid;
		var _gridId;

		function init(grid) {
			_grid = grid;
			var _gridId = '#' + _grid.getGridId();
			var $containerDiv = $('<div style="float:right;"></div>');
			var $textInputDiv = $('<div style="height:23px;float:left;margin-top:-2px;position:relative;background:#FFF;"></div>');
			var $textInput = $('<input id=text_' + _grid.getGridId()
					+ ' style="height:14px;margin-top:0px;background:transparent;position:relative;" type="text" class="bootstrap-text">');
			var $textLabel = $("<label style='position:absolute;top:3px;left:5px;color:#ccc;cursor: text;display:block;'>"+options.queryText+"</label>");
			var $buttonDiv = $('<div  align="center" class="btn-group" style="float:left;" >');
			var $buttonQuery = $('<button id=button_'
					+ _grid.getGridId()
					+ ' class="bootstrap-button" style="float:left;border-radius: 4px 0 0 4px;margin:-2px 0 0 0;height:24px">查 询</button>');
			var $buttonDropdown = $(
					'<button class="bootstrap-button" dropdown-toggle style="float:left;margin:-2px 0 0 -6px;height:24px;padding:0 3px;border-radius: 0 4px 4px 0;"><span class="caret"></span></button>')
					.bind(
							'click',
							function(event) {
								if ($("#menuDropdown").is(":hidden")) {
									$(".form-content").children("input:first").val(
											$("#text_" + grid.getGridId()).val());
									$("#menuDropdown").show();
								} else {
									$("#menuDropdown").hide();
								}
								event.stopPropagation();// 阻止冒泡
								$("#menuDropdown").css('top', $(this).offset().top + 26);
								$("#menuDropdown").css('left', $(this).offset().left - 250);
								$("#menuDropdown").css('height',
										options.queryItems.length * 40 + 80);
								// $("#menuDropdown").toggle();
							});
			var $menuDropdown = $(' <div  id="menuDropdown" class="menu-style"></div>');
			var $menuContent = $('<table style="margin-top:10px;margin-left:15px">');
			// 动态增加表单
			for ( var i = 0; i < options.queryItems.length; i++) {
				var $firstTr = $("<tr>");
				var type = options.queryItems[i].type;
				if ("text" == type) {
					$firstTr
							.append(
									$("<td class='form-title'>").append(
											options.queryItems[i].title + ":"))
							.append(
									$("<td class='form-content'>")
											.append(
													$('<input type="text" class="bootstrap-text" style="margin-top: 0px;height:16px;border-radius:0" class="span2 input-border-color" id='
															+ options.queryItems[i].id + '>')));
					$menuContent.append($firstTr);
				} else if ("select" == type) {
					var selectOption = $('<select class="bootstrap-select" style="margin-top: 0px;" id='
							+ options.queryItems[i].id + '>');
					selectOption.append('<option value="">-----请选择-----</option>');
					for ( var j = 0; j < options.queryItems[i].items.length; j++) {
						selectOption.append('<option value=' + options.queryItems[i].items[j].id
								+ '>' + options.queryItems[i].items[j].name + '</option>');
					}
					$firstTr.append(
							$("<td class='form-title'>").append(options.queryItems[i].title + ":"))
							.append($("<td class='form-content'>").append(selectOption));
					$firstTr.append('</select>');
					$menuContent.append($firstTr);
				}else if ("checkbox" == type) {
					$firstTr
					.append(
							$("<td class='form-title'>").append(
									options.queryItems[i].title + ":"))
					.append(
							$("<td class='form-content'>")
									.append(
											$('<input type="checkbox" value='+ options.queryItems[i].id +' name='+ options.queryItems[i].id +' id='
													+ options.queryItems[i].id + '>')));
					$firstTr.append('</input>');
					$menuContent.append($firstTr);
				} else {
					var radioOption = $("<td class='form-content'>");
					for ( var j = 0; j < options.queryItems[i].items.length; j++) {
						radioOption
								.append(
										$('<input type=' + type + ' name='
												+ options.queryItems[i].name + ' value='
												+ options.queryItems[i].items[j].content + '>'))
								.append(options.queryItems[i].items[j].content);
					}
					$firstTr.append(
							$("<td class='form-title'>").append(options.queryItems[i].title + ":"))
							.append(radioOption);
					$menuContent.append($firstTr);
				}
			}

			var $fifthTr = $("<tr>");
			var $detailsQueryButton = $('<button class="bootstrap-button search" id=detailsQuery'
					+ _grid.getGridId() + ' style="width:55px;height:26px;margin-left:20px;margin-top:20px;">查询</button>');
			var $resetButton = $('<button class="bootstrap-button" style="margin-left:20px;width:55px;height:26px">重置</button>');
			$fifthTr.append($("<td class='form-title'>").append("")).append(
					$("<td class='form-cont'>").append($detailsQueryButton).append($resetButton));
			var $body = $(document.body);
			$menuContent.append($fifthTr);
			$body.append($menuDropdown);
			$buttonDiv.append($buttonQuery).append($buttonDropdown);
			$textInputDiv.append($textLabel).append($textInput);
			$containerDiv.append($textInputDiv).append($buttonDiv);
			$menuDropdown.append($menuContent);

			$containerDiv.appendTo($(_gridId + ' div .slick-top-panel'));
			// 重置表单
			$resetButton.bind("click", function() {
				reset();
			});
			$buttonQuery.bind("click", function() {
				$(".form-content").children("select").val("");
				$(".form-content").children("input:gt(0)").val("");
				$(".form-content").children("input:first").val($textInput.val());
				$detailsQueryButton.trigger("click");
				// eval(options.action);
			});
			$detailsQueryButton.bind("click", function() {
				eval(options.actionDetalis);
				// $buttonQuery.trigger("click");
				// reset();
				$("#menuDropdown").hide();
			});
			/*$("body").click(function() {
				$("#menuDropdown").hide();
				// reset();
			});*/
			/*$('#menuDropdown').click(function() {
				return false;
			});*/
			function reset() {
				$(".form-content").children("input").val("");
				$(".form-content").children("select").val("");
				$(".form-content").children(":radio").val([ "null" ]);
				$(".form-content").children(":checkbox").val([ "null" ]);
			}
			$textInputDiv.click(function(e){
				$textLabel.hide();
				$textInput.focus();
			});
			$textInput.focus(function(e){
				$textLabel.hide();
			});
			$textInput.focusout(function(){
				if($textInput.val().length==0){
					$textLabel.show();
				}
			});
		}

		$.extend(this, {
			"init" : init
		});
	}

})(jQuery);
