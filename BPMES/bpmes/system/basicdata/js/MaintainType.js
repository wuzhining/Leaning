var MaintainTypeOpttype;  //0：新增   1:编辑
$("#ulnav").tree({
        url: 'datasource/menu.json',
        method: 'get',
       
    });
$(function () {
    var reqData={
/*		IFS:'B000037'*/
    }
	reqGridData('/iPlant_ajax',reqData);
	
});


function bindGridData(jsonData){
	var grid={
			name:'MaintainType_tab',
			title:'维修类型信息',
			dataType: 'json', 
			columns: [[
	/*		           { field: 'BR_CD', title: '不良代码', width: 100 ,align:'center'},
		               { field: 'BR_NM', title: '不良名称', width: 200,align:'center'}*/
		     ]]
	}
	initGridView(grid);
	$('#MaintainType_tab').datagrid('loadData',jsonData);
	$('#nav').text(grid.CP_NM);
}

/*添加不良类型信息 */
function addMaintainType() {
    $("#enditTab").dialog("open").dialog('setTitle', '维修类型信息维护');
    $("#MaintainType").form("clear");
    MaintainTypeOpttype=0;
}
