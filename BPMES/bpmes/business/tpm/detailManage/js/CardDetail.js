(function () {
    function cardDetail() {
        pageConfig={
            gridName: 'cardDetail_tab',
            title:'刷卡记录',
        }
        initGridData=function(){
            //派工单号
            iplantAjaxRequest( {
                url: '/iPlant_ajax',
                data: {IFS:'P0000022',CK_STATUS:"1",},
                successCallBack: function (data) {
                    var array = new Array();
                    var rowCollection=createSourceObj(data);
                    for(var i=0; i<rowCollection.length;i++){
                        array.push({"id":rowCollection[i].DO_CD,"text":rowCollection[i].DO_CD});
                    }
                    
                    //查询
                    $('#ccsendWorkOrder').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                    //高级查询
                    $('#sendWorkOrder').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                }
            });

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
                        array.push({ "id": rowCollection[i].ET_CD, "text": rowCollection[i].ET_CD });
                    }
            
                    //查询
                    $('#ccmachineCode').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });

                    //高级查询
                    $('#machineCode').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text',
                        panelWidth:150
                    });
                }
            });

            //操作人
            iplantAjaxRequest( {
                url: '/iPlant_ajax',
                data: {IFS:'D000041'},
                successCallBack: function (data) {
                    var array = new Array();
                    var rowCollection=createSourceObj(data);
                    for(var i=0; i<rowCollection.length;i++){
                        array.push({"id":rowCollection[i].EMP_CD,"text":rowCollection[i].EMP_NM});
                    }
                    //高级查询
                    $('#employeeName').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                }
            });

            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            if(!dgrid) return;
            var reqData = {
                    IFS: 'M000001',
                    pageIndex:1,
                    pageSize:dgrid.pageSize
            }
            reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
        },
        bindGridData = function (reqData,jsonData) {
            var grid = {
                name: pageConfig.gridName,
                dataType: 'json',
                title:pageConfig.tielt,
                columns: [[
                   { field: 'DO_CD', title: '派工单号', width: 100, align: 'center' },
                   { field: 'ET_CD', title: '设备编号', width: 100, align: 'center' },
                   { field: 'STP_YN', title: '操作类型', width: 100, align: 'center' },
                   { field: 'CL_NM', title: '操作原因', width: 200, align: 'center' },
                   { field: 'CL_WT', title: '停机时长', width: 100, align: 'center', 
                	   formatter: function (value, row, index) {
                           if (value == 'N/A') {
                               return '0';
                           }
                           else{
                        	   return value;
                           }
                	   }
                   },
                   { field: 'EMP_BGN_NM', title: '开始操作人', width: 100, align: 'center' },
                   { field: 'CL_BGN_DATE', title: '开始时间', width: 200, align: 'center' },
                   { field: 'EMP_END_NM', title: '结束操作人', width: 100, align: 'center' },
                   { field: 'CL_END_DATE', title: '结束时间', width: 200, align: 'center' }                                        
                ]]
            }
            initGridView(reqData,grid);
            $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
        }
        OptType=0,
        getOptType=function(){
            return this.OptType;
        },
        setOptType=function(value){
            this.OptType=value;
        },
        getReasonList =function(){
            var ajaxParm={
                url:'/iPlant_ajax',
                data:{
                    IFS:'T000014',
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                    }
                    var rowCollection=createSourceObj(data);
                        $('#operationReason').combobox({
                             data:rowCollection,
                             valueField:'CL_NM',  
                             textField:'CL_NM'
                        }); 
                }
            }
            iplantAjaxRequest(ajaxParm);
        }
        getRightDate =function(){
            var ds='';
            $('#startTime').datebox().datebox('calendar').calendar({
                validator: function(date){
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date<=d1;
                }
            });
            $('#endTime').datebox().datebox('calendar').calendar({
                validator: function(date){
                    var now = new Date();
                    var de =new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date<=de;
                }
            });
        }
        checkDate =function(){
            var startTime = $('#startTime').datetimebox('getValue');
             if(startTime!=""){
                 startTime.substring(0,21);
             }          
             var endTime = $('#endTime').datetimebox('getValue');
             if(endTime!=""){
                endTime.substring(0,21);
             }
             if(startTime !=''&& endTime !=''){
                var strA= startTime.replace(/\-/g, "").replace(/\:/g, "").replace(/\s+/g,"");
                var strB= endTime.replace(/\-/g, "").replace(/\:/g, "").replace(/\s+/g,"");
                if(strA>strB){
                    $('#endTime').datetimebox('setValue', '').datetimebox('hidePanel');
                    $.messager.alert('提示', '开始时间小于结束时间！');
                    return;
                }
              }
             var newDate =new Date();
             newDate=newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
             if(startTime&&endTime==''){
                endTime =newDate;
                $('#endTime').datetimebox('setValue',newDate);
             }
             if(startTime==''&&endTime){
                $.messager.alert('提示', '请输入开始时间');
                return
             }
        }
        /*onSelect =function(d){
            var issd = this.id == 'startTime', startTime = issd ? d : new Date($('#startTime').datebox('getValue')), endTime = issd ? new Date($('#endTime').datebox('getValue')) : d;
                if (endTime < startTime) {
                    $('#endTime').datebox('setValue', '').datebox('hidePanel');
                    $.messager.alert('错误','结束日期小于开始日期');
                }
        }*/
        getDataByCondition =function(){
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            var sendWorkOrder =$('#sendWorkOrder').textbox('getValue');
            var machineCode = $('#machineCode').combobox('getValue');
            var OReason =$('#operationReason').combobox('getValue');
            var employeeName = $('#employeeName').textbox('getValue');
            /*var employeeNum = $('#employeeNum').textbox('getValue');*/
            var startTime = $('#startTime').datetimebox('getValue');
            var endTime = $('#endTime').datetimebox('getValue');
            var reqData ={
                DO_CD: sendWorkOrder,
                ET_CD: machineCode,
                CL_NM: OReason,
                BGN_EMP: employeeName,
                /*EMP_BGN_NO: employeeNum,*/
                CL_BGN_DATE: startTime,
                CL_END_DATE: endTime,
                IFS:'M000001',
                pageIndex:1,
                pageSize:dgrid.pageSize
            }
            /*if(sendWorkOrder==''&&machineCode==''&&startTime==''&&endTime==''&&employeeName==''&&employeeNum==''){
                $.messager.alert('提示','请输入选择条件');
            }else{*/
                reqGridData('/iPlant_ajax','cardDetail_tab',reqData)
                $('#queryTab').dialog('close'); 
            /*}*/
        },
        getDataByConditiononce =function(){
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            var sendWorkOrder =$('#ccsendWorkOrder').combobox('getValue');
            var machineCode = $('#ccmachineCode').combobox('getValue');
            var reqData ={
                DO_CD: sendWorkOrder,
                ET_CD: machineCode,
                IFS:'M000001',
                pageIndex:1,
                pageSize:dgrid.pageSize
            };
            reqGridData('/iPlant_ajax','cardDetail_tab',reqData);
        }
    }
    cardDetail.prototype = {
        init: function () {
            $(function () {
                initGridData();
                getRightDate();
                //设备编号
                $('#btnGaoSearch').click(function(){
                    $('#queryTab').dialog('open').dialog('setTitle', '查询刷卡记录');
                    $('#queryCardDetail').form('clear');
                    getReasonList();
                });
                $('#btnSearch').click(function(){
                	getDataByConditiononce();
                });
                $('#btnExprt').click(function(){
                    var reqData = {
                        IFS: 'M000001'
                    }
                    createTable('tbPlantReport','刷卡报表','cardDetail_tab',reqData); 
                });
                $('#save').click(function(){
                    getDataByCondition();
                })

                $('.close').click(function(){
                    $('#queryTab').dialog('close');
                    initGridData();
                })

                $('#save').mouseover(function(){
                    checkDate();
                });
            });
        }
    }
    var card = new cardDetail();
    card.init();
})();