(function () {
    function cardDetail() {
        pageConfig={
            gridName: 'stopReport'
        },
        initGridData=function(){
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            if(!dgrid) return;
            var reqData = {
                    IFS: 'R000012',
                    pageIndex:1,
                    pageSize:dgrid.pageSize
            }
         reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
        },
        bindGridData = function (reqData,jsonData) {
            var grid = {
                name: pageConfig.gridName,
                rownumbers:false,
                dataType: 'json',
                columns: [[
                	{ field: 'ET_CD', title: '设备唯一码', width: 200, align: 'center',/*hidden:true*/ },
                    { field: 'ET_NM', title: '设备编号', width: 200, align: 'center' },
                    { field: 'PL_CD', title: '车间', width: 200, align: 'center',/*hidden:true*/},
                    { field: 'PL_NM', title: '车间', width: 200, align: 'center' },
                    { field: 'CL_WT', title: '停机总时长', width: 200, align: 'center',
                    	formatter: function (value, row, index) {
                            if (value == 'N/A') {
                                 return '0';
                            }
                            else
                            {
                               return value;
                            }

                     }},
                    { field: 'CRT_ID', title: '创建人', width: 200,align:'center'},
				    { field: 'CRT_DT', title: '创建时间', width: 200,align:'center'}
                ]],	
				}

//          }
            
            initGridView(reqData,grid);
            $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
        }
        expanddata = function(){
        	$('#'+pageConfig.gridName).datagrid({
				view: detailview,
				detailFormatter:function(index,row){
					return '<div style="padding:2px"><table class="ddv"></table></div>';
				},
				onExpandRow: function(index,row){
					var ddv = $(this).datagrid('getRowDetail',index).find('table.ddv');
					
					var ajaxParam = {
						url: '/iPlant_ajax',
						data: {
							ET_CD:row.ET_CD,
							PL_CD:row.PL_CD,
							IFS: 'R000019'
						},
						successCallBack: function(data) {
							var rowNum = 0
							if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
								rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
							}
							var rowCollection = createSourceObj(data);
							var jsonData = {
								total: rowNum,
								rows: rowCollection
							}
							ddv.datagrid({
								title:'停机详情',
								data:rowCollection,
								fitColumns:true,
								singleSelect:true,
								rownumbers:true,
								loadMsg:'',
//								height:'auto',
								columns:[[
									{field:'CL_BGN_DATE',title:'停机开始时间',width:100,align:'center'},
									{field:'CL_END_DATE',title:'停机结束时间',width:100,align:'center'},
									{field:'CL_WT',title:'停机时长',width:100,align:'center',
										formatter: function (value, row, index) {
			                                  if (value == 'N/A') {
			                                       return '0';
			                                   }else{
			                                    return value;
			                                   }

			                        }},
									{field:'BGN_EMP_NM',title:'停机开始操作人',width:100,align:'center'},
									{field:'END_EMP_NM',title:'停机结束操作人',width:100,align:'center'},
									{field:'CL_NM',title:'停机原因',width:100,align:'center'}
								]],
								onResize:function(){
									$('#'+pageConfig.gridName).datagrid('fixDetailRowHeight',index);
								},
								onLoadSuccess:function(){
									setTimeout(function(){
										$('#'+pageConfig.gridName).datagrid('fixDetailRowHeight',index);
									},0);
								}
							});
							$('#'+pageConfig.gridName).datagrid('fixDetailRowHeight',index);
							$('#'+pageConfig.gridName).datagrid('loadData', jsonData);
							
						}
					}
					iplantAjaxRequest(ajaxParam);
					}
       })
	}
        getDataByCondition =function(){
          	var spareCD = $('#spareCD').combobox('getValue');
        	var spareNM = $('#spareNM').combobox('getValue');
            var reqData ={
    			PL_CD:spareCD,
            	ET_CD:spareNM,
                IFS:'R000012'
            }
                reqGridData('/iPlant_ajax',pageConfig.gridName,reqData)
        }
        equipmentData=function(){
        	var ajaxParam1={
            url:'/iPlant_ajax',
            data:{
                IFS:'B000029',
            	USE_YN:'Y' 
            },
            successCallBack:function(data){
                var rowNum=0
                if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                   rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                }
                var rowCollection=createSourceObj(data);
                var jsonData={
                      total:rowNum,
                      rows:rowCollection
                }
                $('#spareNM').combobox({
                    data:rowCollection,
                    valueField:'ET_CD',
                    textField:'ET_NM',
                    panelWidth:200,
                });
               
          }
           }
          iplantAjaxRequest(ajaxParam1);
          var ajaxParam2={
            url:'/iPlant_ajax',
            data:{
                IFS:'B000025',
            	USE_YN:'Y' 
            },
            successCallBack:function(data){
                var rowNum=0
                if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                   rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                }
                var rowCollection=createSourceObj(data);
                var jsonData={
                      total:rowNum,
                      rows:rowCollection
                }
                $('#spareCD').combobox({
                    data:rowCollection,
                    valueField:'PL_CD',
                    textField:'PL_NM',
                    panelWidth:200
                   
                });
               
                  }
          }
          iplantAjaxRequest(ajaxParam2);
        }
    }
    cardDetail.prototype ={
        init: function () {
            $(function () {
                initGridData();
				expanddata();
				equipmentData();
                $('#btnSearch').click(function(){
                    getDataByCondition();
                })				
//				onClickrow:function()
			
        })
    }
       }
    var card = new cardDetail();
    card.init();
})();