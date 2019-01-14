(function() {
	var et;
	var arr=[];
	function dictItem() {
		pageConfig = {
			dictCD : windowPageConfig.dictCode || 'CCT01',
			gridName : windowPageConfig.gridName || 'dict_tab',
			txtDictCode : windowPageConfig.txtDictCode || 'txtDictCode',
			txtDictName : windowPageConfig.txtDictName || 'txtDictName',
			txtMethod	: windowPageConfig.txtMethod   || 'txtMethod',
			cbUsed : windowPageConfig.cbUsed || 'cbUsed',
			dictRemark : windowPageConfig.dictRemark || 'txtDictRemrk',
			title : windowPageConfig.title || '客户类别',
			gcDictCD : windowPageConfig.gcDictCD || '字典编号',
			gcDictName : windowPageConfig.gcDictName || '字典名称'
		}
		
		initGridData = function(et,a) {
			var dgrid = $('#' + pageConfig.gridName).datagrid('options');
			if (!dgrid) return;
			var reqData = {
				IFS : 'D00000112',
				DICT_CD : pageConfig.dictCD,
				TMEP: et,
				flag: a,
				pageIndex : 1,
				pageSize : dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', pageConfig.gridName, reqData);
		}
		
		test1 = function(){//调用模糊查询
			et=$("#eqct").val();
			var a=$("input[type='checkbox']").is(':checked');
			initGridData(et,a);
		}
		
		clean = function(){//清空
			$("#eqct").textbox('setValue');
			$('#cb').prop('checked', '');
		}
		bindGridData = function(reqData, jsonData) {
			var grid = {
				name : 'listType_tab',
				dataType : 'json',
				//singleSelect:false,
				columns : [[ 
				           { field : "CZ",width : 10,checkbox : true}, 
				           { field : 'MT_CD',title : pageConfig.gcDictCD,width : 200,align : 'center'}, 
				           { field : 'KB_NM',title : '保养项目名',width : 200,align : 'center'},
				           { field : 'KB_PD',title : '保养方法',width : 200,align : 'center'},
				           { field : 'KB_SC',title : '描述',width : 200,align : 'center'},
				           {field : 'DICT_IT_NM_01',title : '保养分组名',width : 200,align : 'center'},
				           {field : 'DICT_IT_NM_02',title : '保养项目值',width : 200,align : 'center'},
				           { field : 'USE_YN',title : '是否启用',width : 200,align : 'center',
						         formatter : function(value, row, index) {
							        if (value == 'Y') {
								       return '启用';
							        } 
							        else {
							    	    return '未启用';
							        }
						         }
					           }, 
				           {field : 'KB_CS',title : '工具材料',width : 200,align : 'center'},
				           {field : 'KB_CD',title : '备注',width : 200,align : 'center'},
				         ]]
			}
			initGridView(reqData, grid);
			$('#' + pageConfig.gridName).datagrid('loadData', jsonData);
		}
		OptType = 0, 
		getOptType = function() {
			return this.OptType;
		} 
		setOptType = function(value) {
			this.OptType = value;
		}
		/* 数据有效性验证 */
		checkDataValid = function() {
			/* 数据不能为空验证 */
			var dictCode = $('#' + pageConfig.txtDictCode).val();
			if (dictCode == '') {
		     	return false;
			}
			var dictName = $('#' + pageConfig.txtDictName).val();
			if (dictName == '') {
				//$('#' + pageConfig.txtDictName).textbox({required : true});
				return false;
			}
			return true;
		}
		
		/*是否存在输入的字典项*/
		existDictItem = function(dictCode) {
			var rowNum, tpm = $('#' + pageConfig.txtDictCode);
			if (OptType == 0) {
				if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#' + pageConfig.txtDictCode).textbox('getText'))){
		        	$.messager.alert('提示', pageConfig.gcDictCD+"不能是中文和非法字符，请重新输入。","",function(){
		        		$('#' + pageConfig.txtDictCode).textbox('setValue', '');
		        	});
		        	return;
		        }
				if (tpm.val() != undefined && tpm.val() != ''&& tpm.val() != null) {
					if (dictCode != undefined && dictCode != ''&& dictCode != null) {
						if (tpm.textbox('getValue') != undefined && tpm.textbox('getValue') != '' && tpm.textbox('getValue') != null){
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'D000008',
									DICT_CD : pageConfig.dictCD,
									DICT_IT:dictCode,
									pageIndex : 1,
									pageSize : 10
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										$.messager.alert('提示','您输入的'+pageConfig.gcDictCD+'['+ dictCode+ ']已有相同,请重新输入!');
										tpm.textbox('setValue', '');
										return false;
									} 
									else {
										return 1;
									}
								}
							};
							iplantAjaxRequest(ajaxParam);
						}
					}
				}
			}
		}
		/*修改时,验证是否修改任何内容*/
		saveUpdateValidate = function() {
			var checkedItems = $('#'+windowPageConfig.gridName).datagrid('getSelections');
			row = checkedItems[0];
			if (row.MT_CD) {
				var isUserYn = 'N';
				if ($('#'+pageConfig.cbUsed).is(':checked')) {
					isUserYn = "Y";
				} 
				else {
					isUserYn = "N";
				} 
				if($('#'+pageConfig.txtDictName).val() == row.KB_NM
				   && $('#'+pageConfig.dictRemark).val() ==row.KB_PD
				   && $("#groupName").val() ==row.DICT_IT_NM_01
				   && $("#tool").val()== row.KB_CS 
				   && $("#desc").val()==row.KB_SC
				   && $('#equipmentValue').combobox('getValue')==row.DICT_IT_NM_02 
				   && $("#remark").val()==row.KB_CD
				   && isUserYn == row.USE_YN
				){
					return true;	
				}
				else {
					return false;
				}
			}
		}
		setDataNull = function() {
			$('#' + pageConfig.txtDictCode).textbox('setValue', '');
			$('#' + pageConfig.txtDictName).textbox('setValue', '');
			$('#' + pageConfig.dictRemark).textbox('setValue', '');
		}
		validSelectedData = function(gridName, type){
			var checkedItems = $('#' + gridName).datagrid('getSelections');
			var num = 0;
			$.each(checkedItems, function(index, item) {
				num++;
			});
			if (type == 'Update') {
				if (num != 1) {
					return false;
				}
			} 
			else{
				if (num <= 0){
					return false;
			    }
			}
			return true;
		}
		
		checks = function (checkedItems){
			$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"white\">查看设备保养项目</font>');
    		$('#txtListCode').textbox('setValue',checkedItems[0].MT_CD);
    		$('#txtListName').textbox('setValue',checkedItems[0].KB_CS);
    		$('#equipmentMethod').textbox('setValue',checkedItems[0].KB_NM);
    		$('#desc').textbox('setValue',checkedItems[0].KB_SC);
    		$('#groupName').textbox('setValue',checkedItems[0].DICT_IT_NM_01);
    		$('#equipmentValue').textbox('setValue',checkedItems[0].DICT_IT_NM_02);
    		$('#tool').textbox('setValue',checkedItems[0].MT_ST);
    		$('#remark').textbox('setValue',checkedItems[0].KB_CD);
    		if (checkedItems[0].USE_YN == "Y") {
				$('#' + pageConfig.cbUsed).prop('checked','checked');
			} 
			else{
				$('#' + pageConfig.cbUsed).prop('checked', '');
			}
		}
		
		
		//查看功能
		checkDictItem = function() {
			setOptType(2);
			var checkedItems = $('#listType_tab').datagrid('getChecked');//获取选中行信息
			 if(checkedItems.length==0){
	        	 $.messager.alert('提示', '请选择一行数据进行查看！');
		            return;
	        }else{
	        	if(checkedItems.length==1){
	        		checks(checkedItems);
	        	}else if(checkedItems.length>1){
	        		
        			$.messager.confirm('提示', '您已选择多行记录，程序将只查看您选择的第一条记录！是否继续？',function(r){
        				if(r){
        					checks(checkedItems);
        				}
        			})
        			}
	        }
		}
		
		updateDictItem = function() {
			var isSelectedData = validSelectedData(pageConfig.gridName,'Update');
			if (!isSelectedData) {
				   $.messager.alert('提示', '请选择一条数据进行修改');
				   return;
			}
			var row = $("#" + pageConfig.gridName).datagrid("getSelected");
			setOptType(1);
			if (row){
				$("#enditTab").dialog("open").dialog('setTitle','编辑' + pageConfig.title + '维护');
				$('#' + pageConfig.txtDictCode).textbox('textbox').attr('readonly', true);//只读
				$('#' + pageConfig.txtDictCode).textbox('textbox').attr('disabled', true);//变灰
				$('#' + pageConfig.txtDictCode).textbox('setValue',row.MT_CD);//保养项目编号
				$('#' + pageConfig.txtDictName).textbox('setValue',row.KB_NM);//保养项目名
				$('#remark').textbox('setValue',row.KB_CD);//备注
				$("#tool").textbox('setValue',row.KB_CS);//所需工具/材料
				$('#groupName').textbox('setValue',row.DICT_IT_NM_01);//保养项目分组名
				$('#desc').textbox('setValue',row.KB_SC);//描述
				$('#' + pageConfig.dictRemark).textbox('setValue',row.KB_PD);//保养方法
				$('#equipmentValue').combobox('setValue',row.DICT_IT_NM_02);//保养项目值
				if (row.USE_YN == "Y") {
					$('#' + pageConfig.cbUsed).prop('checked','checked');
				} 
				else{
					$('#' + pageConfig.cbUsed).prop('checked', '');
				}
			}
		}
		deleteDictItem=function(){
			var isSelectedData = validSelectedData(pageConfig.gridName,'Delete');
			if (!isSelectedData) {
				 $.messager.alert('提示', '请选择一条数据进行删除');
				 return;
			}
			var checkedItems = $('#' + pageConfig.gridName).datagrid('getSelections');
			// 确认提示框
		    var delCnt = 0;
		    var exceptionCode = '';
		   var arrUpdate = new Array();
		    $.messager.confirm('确认框','您确定要删除您所选择的数据?',
		      function(r){
		    	  if(r==true){
		    		 $.each(checkedItems,function(index,item){
		    			 delCnt++;
		    			 arrUpdate.push({MT_CD:item.MT_CD});
		    			 var ajaxParam = {
		    				 url : '/iPlant_ajax',
			    			 dataType : 'JSON',
			    			 data:{
			    				 list : arrUpdate,
			    				 IFS : 'A1000071'
			    			 },
			    			 successCallBack : function(data){
	    					        	    if (delCnt == checkedItems.length) {
	    							            var susMsg = '删除成功';
	    							            if ($.messager.alert('提示',susMsg)){
	    								           initGridData();
	    								        }
	    					             }
			    				 }
			    			 }
			    			 
			    			 
		    			 
		    			 iplantAjaxRequest(ajaxParam);
		    			
		    		 });
		    	  }
		      });
		    
		}
		
		//帮助
		onBtnHelpClick=function(){
			
			$.messager.show({
				title:'<font color=\"white\">帮助信息</font>',
				msg:'按住shift勾选多选框即可选择多条记录进行删除',
				showType:'show',
				width:'300px',
				height:'150px',
				style:{
				}
			});
		}
		
		//下拉框保养项目值
		textCombobox= function(){
		 var ajaxParam = {
				 url : '/iPlant_ajax',
   			 dataType : 'JSON',
   			 data:{
   				 IFS : 'W00011',
   			 },
   			 successCallBack : function(data){
   				 arr.push({"value":"","text":"全部"});
   				 var rowCollection=createSourceObj(data);
   				 for(var i=0;i< rowCollection.length;i++){
   					 arr.push({"value":rowCollection[i].DICT_IT_NM_02,"text":rowCollection[i].DICT_IT_NM_02});
   				 }
   				 $('#equipmentValue').combobox({
   					 	data:arr,
   		                valueField:'value',
   		                textField:'text',
   		                panelWidth:200,
   		                panelHeight:200
   		            });
   			 }
   			}
		 iplantAjaxRequest(ajaxParam);
		}
		
		addDictItem = function() {
			$('#' + pageConfig.txtDictCode).textbox('textbox').attr('readonly',false);
			$('#' + pageConfig.txtDictCode).textbox('textbox').attr('disabled',false);
			$("#enditTab").dialog("open").dialog('setTitle',pageConfig.title + '维护');
			$("#fmcustomtype").form("clear");
			$('#' + pageConfig.cbUsed).prop('checked','checked');
			setOptType(0);
			textCombobox();//调用下拉框
			/*
			 * $('#' +pageConfig.txtDictCode).textbox('setValue', ccCount); 
			 * $('#' +pageConfig.txtDictCode).textbox('readonly', true);
		    */
		
		}
		saveDictItem = function() {
			// 校验
				var value=$('#equipmentValue').combobox('getValue');//获取保养值下拉框选中的值
			if (($("#" + pageConfig.txtDictName).val() == null || $("#" + pageConfig.txtDictName).val() == "")) {
					 $.messager.alert('提示', "请输入 "+pageConfig.gcDictName+"。");
					 return;
			}else if
				(($("#" + pageConfig.txtDictCode).val() == null || $("#" + pageConfig.txtDictCode).val() == "")){
				 $.messager.alert('提示', "请输入 "+pageConfig.gcDictCD+"。");
				 return;
			}else if
				(($("#groupName").val() == null || $("#groupName").val() == "")){
				$.messager.alert('提示', "请输入保养项目分组名。");
				 return;
			}else if
			(($("#tool").val() == null || $("#tool").val() == "")){
				 $.messager.alert('提示', "请输入所需工具/材料。");
				 return;
			}
				
			
			
			
			var IFServerNo = '', isUsed = '';
			if ($("input[name='postingdate']").is(':checked'))
				 isUsed = 'Y';
			else
				 isUsed = 'N';
			var reqData = {
				MT_CD : $("#" + pageConfig.txtDictCode).val(), // 字典代码
				KB_NM:$("#" + pageConfig.txtDictName).val(), // 字典名称
				KB_PD :$("#equipmentMethod").val(),//保养方法
				DICT_IT_NM_01 : $("#groupName").val(), // 保养项目分组名  
				KB_SC :$("#desc").val(),//描述	
				 KB_CD:$("#remark").val(),//备注
				DICT_IT_NM_02:value,//保养项目值
				KB_CS : $("#tool").val() ,//工具材料
				USE_YN : isUsed
			}
			var optType = getOptType();
			if(optType==2){//查看状态
				$.messager.show({
					title:'提示信息',
					msg:'查看状态下无法编辑设备保养项目！',
					showType:'show',
					timeout:2000,
					style:{}
				});
				return;
			}
			// 新增
			if (optType == 0) {
				IFServerNo = 'D0000055', 
				$.extend(reqData, {
					CRT_ID : '',
					CRT_IP : '',
					IFS : IFServerNo
				});
			}
			// 修改
			else if (optType == 1) {
				if (saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				reqData = $.extend(reqData, {
					CRT_ID : '',
					CRT_IP : '',
					IFS : 'D0000033'
				});
				initEditorDataGridView(reqData);
			}
			var susMsg = '', errorMsg = '';
			if (optType == 0) {
				susMsg = '添加成功';
				errorMsg = '添加失败,请联系管理员';
			} 
			else{
				susMsg = '更新成功';
				errorMsg = '更新失败,请联系管理员';
			}
			var ajaxParam = {
				url : '/iPlant_ajax',
				dataType : 'JSON',
				data : reqData,
				successCallBack : function(data) {
					if (data.RESPONSE[0].RESPONSE_HDR.MSG_CODE == '-1007') {
						susMsg = data.RESPONSE[0].RESPONSE_HDR.MSG_TEXT;
					}
					if ($.messager.alert('提示', susMsg)) {
						  $('#enditTab').dialog('close');
						  setDataNull();
						  initGridData();
					}
				},
				errorCallBack : function() {
					$.messager.alert('提示', errorMsg);
				}
			};
			iplantAjaxRequest(ajaxParam);
		}
		addID = function(data) {
			var arr = data.split(".");
			var i = parseInt(arr[1]) + 1;
			if (i < 10) {
				return pageConfig.dictCD + ".00" + i;
			} 
			else if (i < 100) {
				return pageConfig.dictCD + ".0" + i;
			} 
			else {
				return pageConfig.dictCD + "." + i;
			}
		}
		addCCID = function(data) {
			var arr = data.split(".");
			var i = parseInt(arr[1]) + 1;
			if (i < 10) {
				return pageConfig.dictCD + ".0" + i;
			} 
			else{
				return pageConfig.dictCD + "." + i;
			}
		}
	 }
	
	
	 dictItem.prototype = {
		init:function() {
			$(function() {
				$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
				initGridData();
				$('#btnFreshen').click(function() {
					initGridData();
				});
				$('.add').click(function() {
					addDictItem();
				});
				$('#btnExport').click(function(){//导出
	                    var reqData = {
	                        IFS: 'D00000112'
	                    }
	                    createTable('Type_tab','设备保养','listType_tab',reqData); 
	            });
				$('.update').click(function() {
					updateDictItem();
				});
				$('.save').click(function() {
					saveDictItem();
				});
				$('.close').click(function() {
					setDataNull();
					$('#enditTab').dialog('close');
				});
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
				$('.delete').click(function() {
					deleteDictItem();
				});
				$('#btncheck').click(function(){//查看
					checkDictItem();
				});
				//帮助
				$('#btnHelp').click(function(){
					onBtnHelpClick();
				});
				$("input",$("#"+pageConfig.txtDictCode).next("span")).blur(function(){
				    var dictCode = $("#"+pageConfig.txtDictCode).val();
				    existDictItem(dictCode);
			    });
				//判断输入文字的长度
//				$("input", $("#" + pageConfig.txtDictCode).next("span")).keyup(function() {
//					checkInputLength('#' + pageConfig.txtDictCode, 20);
//				})
//
//				$("input", $("#" + pageConfig.txtDictName).next("span")).keyup(function() {
//					checkInputLength('#' + pageConfig.txtDictName, 50);
//				})
//
//                $("#" + pageConfig.dictRemark).textbox('textbox').bind("keyup", function() {
//					checkInputLength('#' + pageConfig.dictRemark, 200);
//				})
			});
		}
	}
	var dict = new dictItem();
	dict.init();
})();