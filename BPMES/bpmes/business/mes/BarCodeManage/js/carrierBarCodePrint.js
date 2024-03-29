/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var searchCARE_NM = $('#searchCARE_NM').textbox('getValue');
			var searchCARE_LB =$("#searchCARE_LB").textbox('getValue');
			var reqData = {
				IFS: 'S0000023',
				CARE_NM:searchCARE_NM,
				CARE_LB:searchCARE_LB,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'carrierBarCodePrint_tab', reqData);
		}		
		var tmp = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "B000021"},
                successCallBack: function(a) {
                	dataTmp = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataTmp.push({'value':obj.FT_CD,'text':obj.FT_NM});
                    	Tmp[a.RESPONSE[0].RESPONSE_DATA[n].FT_CD]=a.RESPONSE[0].RESPONSE_DATA[n].FT_NM;
				    }); 
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(tmp);
		
		
		/*绑定载具类别下拉列表*/	
		var printType = {
            url: "/iPlant_ajax",
            dataType: "JSON",
			data:{
				IFS : 'D000008',
				DICT_CD:'ZJLX',
				USE_YN:'Y'
			},
            successCallBack: function(a) {
            	dataPrintType = [];
            	var op = a.RESPONSE[0].RESPONSE_DATA;
                $.each(op,function(n,obj) {
                	dataPrintType.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
                	PrintTmp[a.RESPONSE[0].RESPONSE_DATA[n].DICT_IT]=a.RESPONSE[0].RESPONSE_DATA[n].DICT_IT_NM;
			    }); 
            },
            errorCallBack: function() {
                $.messager.alert("提示", '请联系管理员，查询失败！')
            }
        };
		iplantAjaxRequest(printType);
	
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'carrierBarCodePrint_tab',
				dataType: 'json',
				columns: [[
                                    
				           	{field : "CZ",width : 10,checkbox : true},
				           	{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( Tmp[value] || row.FCT_NM)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
			           		{field: 'CARE_LB',title: '载具编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'textbox',
						           options:{
						        	   		required:true, 
						        	   		onChange:function(a){
							        		if(!edited){
							        			 verifyCode(a,this,'S0000023');
							        		}
							        	}
						           }
			           		}},
				            {field: 'CARE_NM',title: '载具名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					               options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
					        {field: 'CAR_BO_QTY',title: '载具拼版数',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
				            {field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
				            {field: 'VERSION',title: '版本号',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},     
					        {field: 'CARRIER_TYPE',title: '载具类型',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( PrintTmp[value] || row.DICT_IT_NM)+ "</span>";},
			           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataPrintType,required:true,editable:false}}},
						    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
					        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{validType:['length[0,50]','specialTextCharacter']}}},
					        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var edditmp = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    	 row.FCT_CD = $(edditmp.target).combobox('getValue');
			    	 row.FCT_NM = $(edditmp.target).combobox('getText');
			     },
			     /**进入编辑模式的操作*/
				onBeforeEdit:function(index,row){
			    	 showmessage.html('');
			    	 row.editing = true;
			    	 row.edited = false;
			    	 oldRow = JSON.stringify(row).replace(reg,'\"\"');
			    	 $(this).datagrid('refreshRow', index);
			     },
			     /**编辑模式进入之后的操作*/
			    onAfterEdit:function(index,row){
			    	 /**判断是否进行数据变更*/
			    	 var temp = JSON.stringify(row).replace(reg,'\"\"');
			    	 if(temp!=oldRow){
			    		 row.edited = true;
			    	 }
			    	 row.editing = false;
			    	 $(this).datagrid('refreshRow', index);
			     },
		        onCancelEdit:function(index,row){
		            row.editing = false;
		            $(this).datagrid('refreshRow', index);
		        },
		        /**单击进入编辑模式*/
		        onClickCell: function (index,field,value) {
		        	edited = true;		//修改状态编码字段不进行验证
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	/**判断是否为可编辑字段*/
		        	addDatagridEditor(dataGrid,index);
		        	if(!checkNotEmpty(row.editType)){/*如果是修改的情况，ft_cd字段为只读模式*/
		        		ed = $(this).datagrid('getEditor', {index: index,field: 'CARE_LB'});
			    		fc = ed.target;
			    		fc.prop('readonly',true);
			        	OpenFrameAttribute(row.CARE_LB);
			        	$('#header-bottom').html(row.CARE_LB);
//			    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'CARE_CD'});
//			    		fc2 = ed2.target;
//			    		fc2.prop('readonly',true);
		    		}
		        },
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
//			    $(this).datagrid('selectRow',0);
//				$('#header-bottom').html(data.rows[0].CARE_LB);
			    OpenFrameAttribute(data.rows[0].CARE_LB);
			    
			}}).datagrid('loadData', jsonData);
//			dataGrid.datagrid('loadData', jsonData);
		},
//		openPrintPreview = function(CARE_LB,CARE_CD,CARE_NM,CRT_ID){
//			$("#PrintPreview_openDiv").dialog("open").dialog('setTitle', '打印预览页面');
//			$("#CARE_LB").textbox('setValue',CARE_LB);
//			$("#CARE_CD").textbox('setValue',CARE_CD);
//			$("#CARE_NM").textbox('setValue',CARE_NM);
//			$("#txtCRT_ID").textbox('setValue',CRT_ID);
//			$("#txtCurrentCount").numberbox('setValue',1);
//		}
		/*是否打印弹出打印预览页面*/
		openPrintPreview = function(CARE_LB,CARE_NM,CRT_ID){
			$("#PrintPreview_openDiv").dialog("open").dialog('setTitle', '打印预览页面');
			$("#CARE_LB").textbox('setValue',CARE_LB);
//			$("#CARE_CD").textbox('setValue',CARE_CD);
			$("#CARE_NM").textbox('setValue',CARE_NM);
			$("#txtCRT_ID").textbox('setValue',CRT_ID);
			$("#txtCurrentCount").numberbox('setValue',1);
		}
		
		/*底部的关联表格*/   
		OpenFrameAttribute = function(CARE_LB){
			var tabName = 'carrierBarCodePrintQuerybottom_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'S0000040',
				CARE_LB: CARE_LB,
				pageIndex: 1,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
						{field: 'CARE_LB',title: '载具编码',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},  
						{field: 'CARE_BARCODE',title: '载具条码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
						{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}];

				var gridLists = {
					name: tabName,
					dataType: 'json',
					columns: [columnsTab]
				}
				initEditorDataGridView(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
		}
		
		
		
		
		/**
		 * 打印SN
		 * 
		 * @param dgrid
		 */
		saveMesSNcode = function(){
			
			var post = $("#carrierBarCodePrint_tab").datagrid('getSelections');
			var postLenght = post.length;
			var rowSz = $('#rowSize').textbox('getValue');
			if(rowSz >99){
				$.messager.alert("提示", '条码张数限制最大为99！');
				return false
			}
			var data1=new Array();var dataRow = new Array();
			var barCodeList="";
            $.each(post,function(n,obj) {
	    		 var ajaxParam0 = {
			            url: '/iPlant_ajax',
			            async:false,
			            dataType: 'JSON',
			            data: {
			            	CARE_LB:obj.CARE_LB,
			                IFS: 'S0000038'
			             },
			            successCallBack:function(dataList){
			            	var op = dataList.RESPONSE[0].RESPONSE_DATA[0].CARE_BARCODE;
			            	if(op!=null){         		
			            		var index = op.lastIndexOf("\-"),str = op.substring(index+1,op.length);	
					        		for (var h=1;h<=rowSz;h++){
					        			 var sum = (parseInt(str) + h),code;
					        			 if(sum < 10){
						            			code = '0'+sum;
						            		}else {
						            			code = sum;
									        }
					        			
					            		 /*if(sum >= 10 && sum < 100){
						         				code = '00' +sum;
						         			}else if(sum >= 100 && sum < 1000){	
						         				code = '0' +sum;
						         			}else if(sum >= 1000){
						         				code = sum;
						         			}else {
						         				code = '000' +sum;
						         			}*/
					        			data1.push({"CODE":obj.CARE_LB +'-'+ code});	
					        			dataRow.push({CARE_LB:obj.CARE_LB,CARE_BARCODE:obj.CARE_LB +'-'+ code}); 			 
					        		}

			            	}else{
					        		for (var j=1;j<=rowSz;j++){			
					        			 var sum = j,code;
					        			 if(sum < 10){
						            			code = '0'+sum;
						            		}else {
						            			code = sum;
									        }
					            		 /*if(sum >= 10 && sum < 100){
						         				code = '00' +sum;
						         			}else if(sum >= 100 && sum < 1000){	
						         				code = '0' +sum;
						         			}else if(sum >= 1000){
						         				code = sum;
						         			}else {
						         				code = '000' +sum;
						         			}*/
					        			data1.push({"CODE":obj.CARE_LB+'-'+code});	
					        			dataRow.push({CARE_LB:obj.CARE_LB,CARE_BARCODE:obj.CARE_LB+'-'+code});
					        			
					        		  }
			            	}
				    		var ajaxParam = {
						            url: '/iPlant_ajax',
						            dataType: 'JSON',
						            data: {
						            	list:dataRow,    	
						                IFS: 'S0000037'
						            }
						      };
						    iplantAjaxRequest(ajaxParam);
						    dataRow = [];

			         }
			      };
			      iplantAjaxRequest(ajaxParam0);
            });
            console.log(data1);
            barCodeStr = {labName:"CARELB.lab",'rowSize':rowSz,"barCodeList":data1};
    		zbSocketPrinter(barCodeStr);    		
			$('#PrintPreview_openDiv').dialog('close');
			$.messager.alert("提示", '条码打印完成！');
			initGridData();		
		 }
		
		
		
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
		},
		
		setDataNull=function(){
			 $('#showFileName').html('');
		},
		
		/*导入*/
		OpenImprotFramedr = function(){
			$("#enditTabupload").dialog("open").dialog('setTitle', '载具信息导入');
		}
		
		/**
		 * ImportStation  SMT导入提交
		 * importFile 验证文件是否为空
		 * @param tabName
		 */
		importFile = function (){
	 	   /* 以下即为完整客户端路径*/
	 	   var pic = document.getElementById('txtPHOTO'),file,fileName,fileType,temp = [],strSrc;
	 	   if(pic.files.length>0){
	 		   file = pic.files[0],fileName = file.name,fileType=file.type;
	 		   if(fileName.indexOf('.')>0){
	 			   temp=fileName.split('.');
	 			   strSrc = temp[temp.length-1];
	 			   if(strSrc.toLowerCase().localeCompare('xlsx') === 0 || strSrc.toLowerCase().localeCompare('xls') === 0 ){
	 				   $('#showFileName').html(fileName);
	 			   }else{
	 				   $('#showFileName').html('<font color=red>请输入excel文件！</font>');
	 				   return false;
	 			   }
	 		   }
	 	   }
	    }
		ImportStation =function(){
	    	   var webroot=document.location.origin;	
	    	   var pic = document.getElementById('txtPHOTO'),file,fileName,fileType,temp = [],strSrc;
	    	   if(pic.files.length>0){
	    		   file = pic.files[0],fileName = file.name,fileType=file.type;
	    		   if(fileName.indexOf('.')>0){
	    			   temp=fileName.split('.');
	    			   strSrc = temp[temp.length-1];
	    			   if(strSrc.toLowerCase().localeCompare('xlsx') === 0 || strSrc.toLowerCase().localeCompare('xls') === 0 ){
	    				   $('#FILE_BELONG').val("BOM_CD"),
	    		    	   $('#FILE_CLS').val("import"),
	    		    	   $('#FILE_TYPE').val('xlsx'),
	    		    	   $('#importType').val('1'),
	    		    	   $('#IFS').val('S0000024');
	    				   var formData = new FormData($( "#importUplod" )[0]);  
	    				   $.ajax({
	    		                cache: true,
	    		                type: "POST",
	    		                url:webroot+'/iTaurus/iPlant_ImgUpload',
	    		                data:formData,/* 你的formid*/
	    		                async: false,
	    		                processData:false,
	    		                contentType:false,
	    		                error: function(request) {
	    		                	$.messager.alert("提示", '导入失败！');
	    		                },
	    		                success: function(data) {
	    		                	$.messager.alert("提示", data[0].msg);
	    		                }
	    		            });
	    			   }else{
	    				   $('#showFileName').html('<font color=red>请输入excel文件！</font>');
	    				   return false;
	    			   }
	    		   }
	    	   }
		   };
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#carrierBarCodePrint_tab'),dataTmp=[],dataPrintType=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					edited = false;
					var initData = {};
					if(dataTmp.length>0){
						initData={FCT_CD:dataTmp[0].value,USE_YN:'Y'}
					}
					
					insertDataGrid('carrierBarCodePrint_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid('carrierBarCodePrint_tab','CARE_LB','S0000025','showMessageInfo');
	            });
				
				$('#btnSave').click(function() {
					saveDataGrid('carrierBarCodePrint_tab','S0000024','S0000026','showMessageInfo');
				});
				
				$('#btnImport').click(function() {						/*导入*/
					OpenImprotFramedr();
				});
				
				$('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'S0000023'
	                	}
	                	createTable('tbIMESReport','载具信息导出','carrierBarCodePrint_tab',reqData);
	             });
//					var CARE_LB,CARE_CD,CARE_NM,CRT_ID;
//					CARE_LB = post[0].CARE_LB;CARE_CD = post[0].CARE_CD;CARE_NM = post[0].CARE_NM; CRT_ID= post[0].CRT_ID;
//					openPrintPreview(CARE_LB,CARE_CD,CARE_NM,CRT_ID);
//				}
				 $('#btnPrint').click(function(){
						var post = $("#carrierBarCodePrint_tab").datagrid('getSelections');
						if(post == null || post == ''){
							$.messager.alert('提示', '请选择一条数据进行打印');
						}else{
							var CARE_LB,CARE_NM,CRT_ID;
							CARE_LB = post[0].CARE_LB;CARE_NM = post[0].CARE_NM; CRT_ID= post[0].CRT_ID;
							openPrintPreview(CARE_LB,CARE_NM,CRT_ID);
						}
					})
			});
		}
	}
	var fcfo = new factoryInfo();var Tmp = {}; var PrintTmp = {},edited;
	fcfo.init();
})();