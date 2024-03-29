(function () {
    function sbOEEDetail() {
        pageConfig={
            gridName: 'sbOEE_tab',
            title:'设备OEE',
        },
        initGridData=function(){
           //设备编号
            iplantAjaxRequest( {
                url: '/iPlant_ajax',
                data: {IFS:'B000029'},
                successCallBack: function (data) {
                    var array = new Array();
                    var rowCollection=createSourceObj(data);
                    var array = new Array();
                    array.push({ "id": "", "text": "全部"});
                    for (var i = 0; i < rowCollection.length; i++) {
                        array.push({ "id": rowCollection[i].ET_CD, "text": rowCollection[i].ET_NM });
                    }
            
                    //查询
                    $('#txtSBMC').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                }
            });

            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            if(!dgrid) return;
            var reqData = {
                    IFS: 'R000008',
                    pageIndex:1,
                    pageSize:dgrid.pageSize
            }
         reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
        },
        bindGridData = function (reqData,jsonData) {
            var grid = {
                name: pageConfig.gridName,
                dataType: 'json',
                columns: [[
                           {field:'DR_DT',title:'日期',width:200,align:'center'},
                           {field:'CS_NM',title:'班次名称',width:200,align:'center'},
                           {field:'DO_CD',title:'派工单',width:200,align:'center'},
                           {field:'DICT_IT',title:'派工单类别',width:200,align:'center'},
                           {field:'DICT_IT_NM',title:'派工单类别名称',width:200,align:'center'},
                           {field:'MO_CD',title:'制令单',width:200,align:'center'},
                           {field:'ET_NM',title:'设备编号',width:200,align:'center'},
                           {field:'PT_CD',title:'物料编码',width:200,align:'center'},
                           {field:'PT_NM',title:'物料名称',width:200,align:'center'},
                           {field:'DO_NUM',title:'派工数量',width:200,align:'center'},
                           {field:'PT_NUM',title:'产品出数',width:200,align:'center'},
                           {field:'DR_NUM',title:'生产数',width:200,align:'center'},
                           {field:'DR_GQ',title:'良品数',width:200,align:'center'},
                           {field:'DR_BN',title:'不良数',width:200,align:'center'},
                           {field:'DR_AT',title:'稼动时间',width:200,align:'center',
                        	   formatter: function (value, row, index) {
                                   if (value == 'N/A') {
                                       return '0';
                                   }
                                   else{
                                	   return value;
                                   }
                           }},
                           {field:'DR_TC',title:'理论产量',width:200,align:'center'},
                           {field:'DR_DM',title:'停机时间',width:200,align:'center',
                        	   formatter: function (value, row, index) {
                                   if (value == 'N/A') {
                                       return '0';
                                   }
                                   else{
                                	   return value;
                                   }
                           }},
                           {field:'DR_ST',title:'计划停机时间',width:200,align:'center',
                        	   formatter: function (value, row, index) {
                                   if (value == 'N/A') {
                                       return '0';
                                   }
                                   else{
                                	   return value;
                                   }
                           }},
                           {field:'MD_CL',title:'标准周期',width:200,align:'center'},
                           {field:'DR_EE',title:'设备效率',width:200,align:'center',
                        	   formatter: function (value, row, index) {
                                   if (value == '0%') {
                                        return '0';
                                   }
                                   else{
                                     return value;
                                   }

                               }
                           },
                           {field:'OEE',title:'OEE',width:200,align:'center',
                        	   formatter: function (value, row, index) {
                                   if (value == '0%') {
                                        return '0';
                                   }
                                   else{
                                     return value;
                                   }

                               }
                           },
                           {field:'DR_ER',title:'有效开机率',width:200,align:'center',
                        	   formatter: function (value, row, index) {
                                   if (value == '0%') {
                                        return '0';
                                   }
                                   else{
                                     return value;
                                   }

                               }
                           },
                           {field:'DR_BR',title:'不良率',width:200,align:'center',
                        	   formatter: function (value, row, index) {
                                   if (value == '0%') {
                                        return '0';
                                   }
                                   else{
                                     return value;
                                   }

                               }
                        	   
                           }
                ]]
            }
            initGridView(reqData,grid);
            $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
        },
        getDataByCondition =function(){
            var startDate = $('#startDate').datetimebox('getValue');
            var endDate = $('#endDate').datetimebox('getValue');
            var bc = $('#txtBC').combobox('getValue');
            var sbmc = $('#txtSBMC').combobox('getValue');
            if(startDate !=''&& endDate !=''){
  	        	var strA= startDate.replace(/\-/g, "").replace(/\:/g, "").replace(/\s+/g,"");
  	        	var strB= endDate.replace(/\-/g, "").replace(/\:/g, "").replace(/\s+/g,"");
  	        	if(strA>strB){
  	        		$.messager.alert('提示', '开始时间不能大于结束时间！');
          			return;
  	        	}
  	         }
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            var reqData ={
            	StartDate: startDate,
            	EndDate: endDate,
                CS_CD:bc,
                ET_CD: sbmc,
                IFS:'R000008',
                pageIndex:1,
                pageSize:dgrid.pageSize
            }
            reqGridData('/iPlant_ajax',pageConfig.gridName,reqData);
            $('#'+pageConfig.gridName).datagrid({pageNumber:1});
            $('#queryTab').dialog('close'); 
            /*$("#queryBadReport").form("clear");*/
        },
        getRightDate =function(){
            var ds='';
            $('#startDate').datebox().datebox('calendar').calendar({
                validator: function(date){
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date<=d1;
                }
            });
            $('#endDate').datebox().datebox('calendar').calendar({
                validator: function(date){
                    var now = new Date();
                    var de =new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date<=de;
                }
            });
        },
        bindEquipName =function(){
            var ajaxParam={
                url:'/iPlant_ajax',
                data:{
                    IFS:'B000029'
                },
                successCallBack:function(data){
                    var rowNum=0;
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                    }
                    var rowCollection=createSourceObj(data);
                    $('#txtSBMC').combobox({
                        data:rowCollection,
                        valueField:'ET_CD',
                        textField:'ET_CD',
                        panelWidth:200,
                        panelHeight:225
                    });
                }
                  
            }
            iplantAjaxRequest(ajaxParam);
        }
    }
    sbOEEDetail.prototype = {
        init: function () {
            $(function () {
                initGridData();
                getRightDate();
                bindEquipName('');
              //初始化  combobox
                iplantAjaxRequest( {
        			url: '/iPlant_ajax',
        			data: {IFS:'B000017'},
        			successCallBack: function (data) {
        				var rowCollection = createSourceObj(data);
        				var array = new Array();
        				array.push({"id":"","text":"全班"});
        				if(rowCollection.length>0){
        					for(var i=0; i<rowCollection.length;i++){
            					array.push({"id":rowCollection[i].CS_CD,"text":rowCollection[i].CS_NM});
            				}
        				}
            	
        				$('#txtBC').combobox({
        					data:array,
        					valueField:'id',
        					textField:'text'
        				});
        			}
        		});
                $('#btnSearch').click(function(){

                    getDataByCondition();
                    /*$('#queryTab').dialog('open').dialog('setTitle', pageConfig.title);*/

                });
                
                $('#btnExprt').click(function(){
                	var reqData = {
                    	    IFS: 'R000008'
                    	};
                    	createTable('tbPlantReport','设备OEE','sbOEE_tab',reqData);
                });

                /*$('#save').click(function(){
                    getDataByCondition();
                });

                $('.close').click(function(){
                    $('#queryTab').dialog('close');
                    $("#queryBadReport").form("clear");
                });*/
            });
        }
    }
    var sbOEE = new sbOEEDetail();
    sbOEE.init();
})();