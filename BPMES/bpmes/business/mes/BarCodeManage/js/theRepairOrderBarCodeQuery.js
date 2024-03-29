/* 启动时加载 */
/*订单查询
 */
(function() {
	function factoryInfo() {
		/**初始化公司combobox内容*/
		initGridData = function() {
			var company = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "W000001"},
                successCallBack: function(a) {
                	dataCompany = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataCompany.push({'value':obj.CP_CD,'text':obj.CP_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(company)
			
			/*工厂下拉框查询*/
			var tmp = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "B000021"},
	                successCallBack: function(a) {
	                	dataTmp = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataTmp.push({'value':obj.FT_CD,'text':obj.FT_NM});
	                    	factoryName[a.RESPONSE[0].RESPONSE_DATA[n].FT_CD]=a.RESPONSE[0].RESPONSE_DATA[n].FT_NM;
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(tmp);
			
			/*车间下拉框查询*/
			var Workshop = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS:'B000025'},
	                successCallBack: function(a) {
	                	dataWorkshop = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataWorkshop.push({'value':obj.PL_CD,'text':obj.PL_NM});
	                    	WorkshopName[a.RESPONSE[0].RESPONSE_DATA[n].PL_CD]=a.RESPONSE[0].RESPONSE_DATA[n].PL_NM;
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
				iplantAjaxRequest(Workshop);
			
			/*工序路线下拉框*/
			var routeName = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "GX00011"},
	                successCallBack: function(a) {
	                	dataRouteName = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataRouteName.push({'value':obj.ROUT_CD,'text':obj.ROUT_NAME});
	                    	routName[a.RESPONSE[0].RESPONSE_DATA[n].ROUT_CD]=a.RESPONSE[0].RESPONSE_DATA[n].ROUT_NAME;
					    }); 
	                    console.log(routName)
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(routeName);
				
			/*产线下拉框查询*/
			var company = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "B000109"},
	                successCallBack: function(a) {
	                	dataFactory = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataFactory.push({'value':obj.PD_LN_CD,'text':obj.PD_LN_NM});
	                    	factory2Name[a.RESPONSE[0].RESPONSE_DATA[n].PD_LN_CD]=a.RESPONSE[0].RESPONSE_DATA[n].PD_LN_NM;
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(company);
				
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'S0000016',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'theRepairOrderBarCodeQuery_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'theRepairOrderBarCodeQuery_tab',
				dataType: 'json',
				singleSelect : false,
				columns: [[
				    {field : "CZ",width : 10,'checkbox' : true},
				    {field: 'BAR_CODE',title: '条码',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'PRE_FIX',title: '前缀',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'BIND_NO',title: '绑定号',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'CRT_DT',title: '打印时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + (factoryName[value]) + "</span>";}},
					{field: 'MO_NO',title: '工单编号',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'WO_NO',title: '作业指示编号',width: 170,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					
					{field: 'WC_CD',title: '车间名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + (WorkshopName[value]) + "</span>";}},
					{field: 'SHIFT_CD',title: '班组',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'LINE_CD',title: '产线名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + (factory2Name[value]) + "</span>";}},
					{field: 'ITEM_CD',title: '物料编码',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_NM',title: '物料名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'MODEL_CD',title: '机型代码',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'MODEL_NM',title: '机型名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'PLAN_WO_QTY',title: '排程量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'BC_QTY',title: '已打印数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'BC_STATUS',title: '条码状态',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ROUT_CD',title: '工艺路线',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + (routName[value]) + "</span>";}},
					{field: 'OLD_ROUT_CD',title: '前工艺路线',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + (routName[value]) + "</span>";}},
					
					{field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				]],
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		
	      /*获取输入框里面的内容然后查询 */
	  	openSearchLayer = function() {
	  		    var dgrid=$('#theRepairOrderBarCodeQuery_tab').datagrid('options');
	  		    var searchMO_NO = $('#searchMO_NO').textbox('getValue');		/*工单号*/
	  		    var searchITEM_CD = $('#searchITEM_CD').textbox('getValue');	
		  		var searchBAR_CODE = $('#searchBAR_CODE').textbox('getValue');	
		  		var searchWO_NO = $('#searchWO_NO').textbox('getValue');	
		  		var searchMODEL_CD = $('#searchMODEL_CD').textbox('getValue');	
		        var searchPRE_FIX =$('#searchPRE_FIX').textbox('getValue');			/*工单状态*/
		        
		        WONO = searchWO_NO;
		        MONO = searchMO_NO;
		        
	  			var reqData ={
	  				  MO_NO: searchMO_NO,
	  		          ITEM_CD: searchITEM_CD,
	  		          BAR_CODE: searchBAR_CODE,
	  		          WO_NO: searchWO_NO,
	  		          MODEL_CD: searchMODEL_CD,
	  		          PRE_FIX : searchPRE_FIX,
	  				  IFS:'S0000016',
	                  pageIndex:1,
	                  pageSize:dgrid.pageSize
	  			}
	  			reqGridData('/iPlant_ajax','theRepairOrderBarCodeQuery_tab',reqData);
	  	}
	  	
	}
	
	
	/**
	 * 重新打印SN
	 * 
	 * @param dgrid
	 */
	saveMesSNcode = function(){
		var workOrdeSNs = $('#theRepairOrderBarCodeQuery_tab').datagrid('getSelections');	/*获取所有选择的工单条码*/
		var data1=new Array();
		var barCodeList="";
		/*获取当前日期作为打印日期*/
		function p(s) {
		    return s < 10 ? '0' + s: s;
		}
		var myDate = new Date();
		//获取当前年
		var year=myDate.getFullYear();
		//获取当前月
		var month=myDate.getMonth()+1;
		//获取当前日
		var date=myDate.getDate(); 
		var now=year+p(month)+p(date);
		/*获取当前日期END*/
		
		var path=$('#labelName').filebox('getValue');
		console.info(path);
		
//		var file = document.getElementById("labelName");
//		file.select();
//		var realPath = file.files.item(0).getAsDataURL();
//		console.info(realpath);
		
		
		for (var i=0;i<workOrdeSNs.length;i++){
    		data1.push({"SN":workOrdeSNs[i].BAR_CODE,"LOTNO":workOrdeSNs[i].PRE_FIX,"DateTime":now});
//    		barCodeStr = {labName:"mes04.lab","barCodeList":data1};
		}
		barCodeStr = {printerName:'ZDesigner GK888t (EPL)',labName:"C:\\B&P\\conf\\mes04.lab","barCodeList":data1};
		$.messager.progress({
			title:'提示信息' ,
			msg:'正在发送数据，请稍候...'
		});
		
		$.ajax({
	        url: '/iTaurus/PrinterService',
	        method: 'POST',
//	        contentType: "application/x-www-form-urlencoded; charset=utf-8",
	        async: true,
	        data: {
//	        	step:'1',
	        	dataList:JSON.stringify(barCodeStr)
	        },
	        dataType: 'json',
	        success: function(data){
	        	$.messager.progress('close');
//	        	var data=eval("("+response+")");
	        	if(data.MSG_CODE == '0000'){
	        		$.messager.alert('提示信息','数据已发送，请等待打印机工作','info');
	        	}else{
	        		$.messager.alert(data.RESPONSE_TEXT);
	        	}
	        },
	        error : function(error) {//失败
	        	$.messager.progress('close');
	        	$.messager.alert('提示信息','数据已发送，请等待打印机工作','info');
//	        	$.messager.alert('提示信息','打印时发生错误','info');
	        }
	    });
		
//		zbSocketPrinter(barCodeStr);
//		$('#PrintPreview_openDiv').dialog('close');
//		$.messager.alert("提示", '条码打印完成！');
//		initGridData();	
	}
	
	/*是否打印弹出打印预览页面*/
	openPrintPreview = function(){
		$("#PrintPreview_openDiv").dialog("open").dialog('setTitle', '打印预览页面');
		function p(s) {
		    return s < 10 ? '0' + s: s;
		}
		var myDate = new Date();
		//获取当前年
		var year=myDate.getFullYear();
		//获取当前月
		var month=myDate.getMonth()+1;
		//获取当前日
		var date=myDate.getDate(); 

		var now=year+'-'+p(month)+'-'+p(date);
		
		var grid = $('#theRepairOrderBarCodeQuery_tab').datagrid('getSelected');
		
		$("#txtNOW_PRINT_TIME").textbox('setValue',now);
		$("#FCT_CD").val(grid.FCT_CD);
		$("#txtLINE_CD").textbox('setValue',grid.LINE_CD);
		$("#txtWO_NO").textbox('setValue',grid.WO_NO);
		$("#txtPLAN_WO_QTY").textbox('setValue',grid.PLAN_WO_QTY);
		$("#txtMO_NO").textbox('setValue',grid.MO_NO);
		$("#txtITEM_CD").textbox('setValue',grid.ITEM_CD);
		$("#txtITEM_NM").textbox('setValue',grid.ITEM_NM);
		$("#txtPTY_QTY").textbox('setValue',grid.PTY_QTY);
		$('#prefix').textbox('setValue',grid.PRE_FIX)
		$("#txtCRT_ID").textbox('setValue',grid.CRT_ID);
		$("#txtCurrentCount").textbox('setValue',1);
		$("#txtLAST_PRINT_TIME").textbox('setValue',grid.CRT_DT);
		$("#txtLAST_BAR_CODE").textbox('setValue',grid.LAST_BAR_CODE);
		
		
	}
	
	deleteDataGrid = function () {
		var checkedItems = $('#theRepairOrderBarCodeQuery_tab').datagrid('getSelections');
        if (checkedItems.length==0) {
            $.messager.alert('提示', '请选择一条数据进行删除');
            return;
        }
        /*确认提示框*/
        var delCnt=0,arrUpdate = new Array();;
        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
           	if(r==true){
           		var tmp='';
           		 $.each(checkedItems, function (index, item) {
           				arrUpdate.push({BAR_CODE:item.BAR_CODE});
                 });
           		 
           		 if(arrUpdate.length>0){
     	          /*批量删除*/
                     var ajaxUpdate = {
                         url: '/iPlant_ajax',
                         dataType: 'JSON',
                         data: {
                             list: arrUpdate,
                             IFS: 'MES_S000004'
                         },
                         successCallBack: function (data) {
                         	showmessage.html('<font color=red>删除成功！</font>');
                         	initGridData();
                             return;
                         },
                         errorCallBack: function (data) {
                         	showmessage.html('<font color=red>删除失败！</font>');
                             return;
                         }
                     };
                     iplantAjaxRequest(ajaxUpdate);

           		 }else{
           			showmessage.html('<font color=red>删除失败，此工单不是创建状态！</font>');
           		 }
           	}
        });      
	}
	setUpPrintParams=function(){
		//打印机列表
		$.ajax({
        url: '/iTaurus/PrinterService',
        method: 'POST', 
        async: true,
        data: {
        	step:'2'
        },
        dataType: 'json',
        success: function(data){
        	$('#cbPrentName').combobox({
        		valueField:'name',
        		textField:'value',
        		data: data
        	});  
        },
        error : function(error) {
        }
    });
		
		$('#labelName').filebox({
			buttonText:'...',
			fileElementId:'labelFileName',
			onChange:function(newfile,oldfile){
				console.info(newfile);
				console.info(oldfile);
				var file =document.getElementById('filebox_file_id_2');
				var realPath = getPath(file);
				console.info(realPath);
			}
		})
	}
	
	function getPath(obj) 
	{ 
	  if(obj) 
	    { 
	    if (window.navigator.userAgent.indexOf("MSIE")>=1) 
	      { 
	          obj.select(); 
	          document.getElementById("button").focus();
	          return document.selection.createRange().text; 
	    	
	      } 
	    else if(window.navigator.userAgent.indexOf("Firefox")>=1) 
	      { 
	      if(obj.files) 
	        { 
	        return obj.files.item(0).getAsDataURL(); 
	        } 
	      return obj.value; 
	      } 
	    return obj.value; 
	    }  
	}
     
     
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#theRepairOrderBarCodeQuery_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				/*获取工厂类别下拉*/
				
				setUpPrintParams();
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				
				$('#btnSearch').click(function() {
					openSearchLayer();					/*调用查询*/
				
				});
				
				$('#btnPrint').click(function() {
					openPrintPreview();					/*重新打印*/
				});
				
				$('#btnExprt').click(function(){						/*导出*/
				 	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                		WO_NO: WONO,
                	    MO_NO:MONO,
                		IFS:'S0000016'
                	}
                	createTable('tbIMESReport','工单条码信息导出','theRepairOrderBarCodeQuery_tab',reqData);
                });
			});
		}
	}
	var fcfo = new factoryInfo();var factoryName = {},WorkshopName = {},companyName = {},factory2Name = {},routName = {},WONO,MONO;
	fcfo.init();
})();