/* 启动时加载 */
/*
 */
(function() {
	function materialMaintenance() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			/*物料类型下拉框*/
			dataPi=[],dataSer=[];
    		var pi = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {
                    IFS: "MB00038"
                },
                successCallBack: function(a) {
                	dataPi = [];
                	dataSer.push({"value":"", "text":"全部"});
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataPi.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
                    	dataSer.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
				    });  
                    $("#searchITEM_TYPE").combobox("loadData", dataSer);
                    $("#searchITEM_TYPE").combobox('select', dataSer[0].value);
                },
                errorCallBack: function() {
                    $.messager.alert("提示","请联系管理员，查询失败！");
                }
            };
    		iplantAjaxRequest(pi);
    		/*工厂名称下拉框*/
    		var Factory = {
                    url: "/iPlant_ajax",
                    dataType: "JSON",
                    data: {IFS: "B000021"},
                    successCallBack: function(a) {
                    	dataFactory = [];
                    	var op = a.RESPONSE[0].RESPONSE_DATA;
                        $.each(op,function(n,obj) {
                        	dataFactory.push({'value':obj.FT_CD,'text':obj.FT_NM});
    				    });  
                    },
                    errorCallBack: function() {
                        $.messager.alert("提示", '请联系管理员，查询失败！')
                    }
                };
    		iplantAjaxRequest(Factory);
            var Unit = {
                    url: "/iPlant_ajax",
                    dataType: "JSON",
                    data: {IFS: "MB00040"},
                    successCallBack: function(a) {
                    	dataUnit = [];
                    	var op = a.RESPONSE[0].RESPONSE_DATA;
                        $.each(op,function(n,obj) {
                        	dataUnit.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
    				    });  
                    },
                    errorCallBack: function() {
                        $.messager.alert("提示", '请联系管理员，查询失败！')
                    }
                };
    		iplantAjaxRequest(Unit);    
                
    		var WHS = {									
                    url: "/iPlant_ajax",
                    dataType: "JSON",
                    data: {IFS: "Z000052"},
                    successCallBack: function(a) {
                    	dataWHS = [];
                    	var op = a.RESPONSE[0].RESPONSE_DATA;
                        $.each(op,function(n,obj) {
                        	dataWHS.push({'value':obj.WAREHOUSE_ID,'text':obj.WAREHOUSE_NAME});
    				    });  
                    },
                    errorCallBack: function() {
                        $.messager.alert("提示", '请联系管理员，查询失败！');
                    }
                };
    		iplantAjaxRequest(WHS);
    		var Attr = {
                    url: "/iPlant_ajax",
                    dataType: "JSON",
                    data: {IFS: "Z000014"},
                    successCallBack: function(a) {
                    	dataAttr = [];
                    	var op = a.RESPONSE[0].RESPONSE_DATA;
                        $.each(op,function(n,obj) {
                        	dataAttr.push({'text':obj.ITEM_ATTR,'value':obj.ITEM_ATTR_NM});
    				    });  
                    },
                    errorCallBack: function() {
                        $.messager.alert("提示", '请联系管理员，查询失败！');
                    }
                };
    		iplantAjaxRequest(Attr)
    		
    		var bom = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS:'Z000007'},
	                successCallBack: function(a) {
	                	dataBOM = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataBOM.push({'text':obj.ITEM_CD+"("+obj.ITEM_NM+")",'value':obj.ITEM_CD});
	                    	BOM[a.RESPONSE[0].RESPONSE_DATA[n].ITEM_CD]=a.RESPONSE[0].RESPONSE_DATA[n].ITEM_NM;
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(bom);	
    		
			searchDataGrid(dgrid);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'material_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FCT_NM || value)+ "</span>";},
				    	   editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataFactory,required:true,editable:false}}},
					{field: 'ITEM_CD',title: '物料编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
			        {field: 'ITEM_NM',title: '物料名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
			        {field: 'ITEM_TYPE',title: '物料类型',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.ITEM_TYPE_NM || value)+ "</span>";},
						   editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataPi,required:true,editable:false}}},
				    {field: 'ITEM_SIZE',title: '物料规格',width:200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					       options:{validType:['length[1,200]','specialTextCharacter']}}},
		           {field: 'UOM',title: '单位',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.UOM_NM || value)+ "</span>";},
        	    		 editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataUnit,editable:false}}},		       
					{field: 'ITEM_VES',title: '批次版本号',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[0,25]','specialCharacterTextArea']}}},
				    {field: 'PROD_FLOG',title: '是否是成品',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
					{field: 'MODEL_CD',title: '机型代码',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							options:{validType:['length[0,30]','specialTextCharacter']}}},
					{field: 'MODEL_NM',title: '机型名称',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        options:{validType:['length[0,25]','specialTextCharacter']}}}, 
					{field: 'ITEM_GRP_CD',title: '物料组',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        options:{validType:['length[1,100]','specialTextCharacter']}}}, 
					{field: 'ITEM_GRP_NM',title: '物料组名',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						    options:{validType:['length[1,100]','specialTextCharacter']}}}, 
					{field: 'WHS_CD',title: '物料库存地',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.WAREHOUSE_NAME || value)+ "</span>";},
						     editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataWHS,editable:false}}},
					{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
			        {field: 'MO',title: 'MO',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'img1',title: 'MSD设置',width: 80,align: 'center',formatter:function(){
		        		   return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='openDialogFrame(1)'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
		            {field: 'img2',title: '替代料设置',width: 80,align: 'center',formatter:function(){
			        	   return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='openDialogFrame(2)'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
			        {field: 'img3',title: '物料属性',width: 80,align: 'center',formatter:function(){
				           return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='openDialogFrame(3)'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
				    {field: 'img4',title: '物料位置',width: 80,align: 'center',formatter:function(){
					       return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='openDialogFrame(4)'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
			        {field: 'img5',title: '产品图片',width: 80,align: 'center',formatter:function(){
				       return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='openDialogFrame(4)'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
			        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
					]],
					/**结束编辑模式的操作*/
				 onEndEdit:function(index,row){
					 var ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    	 row.FCT_CD = $(ed.target).combobox('getValue');
			    	 row.FCT_NM = $(ed.target).combobox('getText');
			    	 
			    	 var eddi = $(this).datagrid('getEditor', {index: index,field: 'ITEM_TYPE'});
			    	 row.ITEM_TYPE = $(eddi.target).combobox('getValue');
			    	 row.ITEM_TYPE_NM = $(eddi.target).combobox('getText');
			    	 
			    	 var edd3 = $(this).datagrid('getEditor', {index: index,field: 'WHS_CD'});
			    	 row.WHS_CD = $(edd3.target).combobox('getValue');
			    	 row.WAREHOUSE_NAME = $(edd3.target).combobox('getText');
			    	 
			    	 var edd2 = $(this).datagrid('getEditor', {index: index,field: 'UOM'});
			    	 row.UOM = $(edd2.target).combobox('getValue');
			    	 row.UOM_NM = $(edd2.target).combobox('getText');
			    	 
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
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	/**判断是否为可编辑字段*/
		        	if(clickSign==true){
		        		if(field=='img1'){
			        		endEditingAll(dataGrid);
							titleName = 'MSD设置',
							dialogName = 'editTabMSD',
							tabName = 'materialMSD_tab',
							$("#MSDtitle").html("<label>物料编码："+row.ITEM_CD+"</label><label>&nbsp;&nbsp;物料名称："+row.ITEM_NM+"</label>"),
							dgrid = $('#materialMSD_tab').datagrid('options'),
							dgrid.ITEM_CD = row.ITEM_CD,
							dgrid.ITEM_NM = row.ITEM_NM,
							dgrid.FCT_CD = row.FCT_CD,
							itemCD = row.ITEM_CD,
							reqData = {IFS: 'Z000022',ITEM_CD:row.ITEM_CD,pageIndex: 1,pageSize: dgrid.pageSize};
							openDialogFrame(tabName,dialogName,titleName,reqData);
			        	}else if(field=='img2'){
			        		endEditingAll(dataGrid);
							titleName = '替代料设置',
							dialogName = 'editTabSubstitute',
							$("#Subtitle").html("<label>物料编码："+row.ITEM_CD+"</label><label>&nbsp;&nbsp;物料名称："+row.ITEM_NM+"</label>"),
							tabName = 'materialSubstitute_tab',
							dgrid = $('#materialSubstitute_tab').datagrid('options'),
							dgrid.ITEM_CD = row.ITEM_CD,
							dgrid.FCT_CD = row.FCT_CD,
							reqData = {IFS: 'Z000035',ITEM_CD:row.ITEM_CD,pageIndex: 1,pageSize: dgrid.pageSize};
							openDialogFrame(tabName,dialogName,titleName,reqData);
			        	}else if(field=='img3'){
			        		endEditingAll(dataGrid);
			        		dgrid = $('#material_tab').datagrid('options'),
			        		tabName = 'MaterialView',
			        		dialogName = 'editTabSet',
			        		$("#Settitle").html("<label>物料编码："+row.ITEM_CD+"</label><label>&nbsp;&nbsp;物料名称："+row.ITEM_NM+"</label>"),
			        	    titleName  = '物料属性',
			        	    dgrid.ITEM_CD = row.ITEM_CD,
							dgrid.FCT_CD = row.FCT_CD,
							setRow = row.ITEM_CD,
							reqData = {IFS: 'Z000014',pageIndex: 1,pageSize: dgrid.pageSize};
			        		openDialogFrame(tabName,dialogName,titleName,reqData);
			        		
			        		
			        	}else if(field=='img4'){
			        		endEditingAll(dataGrid);
							titleName = '物料位置',
							dialogName = 'editTabPosition',
							tabName = 'materialPosition_tab',
							$("#Positiontitle").html("<label>物料编码："+row.ITEM_CD+"</label><label>&nbsp;&nbsp;物料名称："+row.ITEM_NM+"</label>"),
							dgrid = $('#materialPosition_tab').datagrid('options'),
							dgrid.ITEM_CD = row.ITEM_CD,
							dgrid.FCT_CD = row.FCT_CD,
							reqData = {IFS: 'Z000039',ITEM_CD:row.ITEM_CD,pageIndex: 1,pageSize: dgrid.pageSize};
							openDialogFrame(tabName,dialogName,titleName,reqData);
			        	}else if(field=='img5'){
			        		endEditingAll(dataGrid);
							titleName = '产品图片',
							dialogName = 'editTab',
							tabName = 'materialPosition_tab',
							itemCD = row.ITEM_CD,
							itemNM = row.ITEM_NM,
							$("#editTab").dialog("open").dialog('setTitle', '产品图片导入');
							$('#txtFileNO').textbox('setValue',itemCD);
						    $('#txtFileBelong').textbox('setValue',itemNM);
			        	}else{
			        		if (editIndex != index){
			    	    		var ed,fc,editorFt;
			    	    		if(editIndex!=undefined){
			    					/**判断是否为新增行，并验证新增工厂编码重复*/
			    	    			rowEdit = dataGrid.datagrid('getRows')[editIndex],editem = $(this).datagrid('getEditor', {index: editIndex,field: 'ITEM_CD'}),editorFt = editem.target,itemCd = editorFt.val();
			    	    			if(checkNotEmpty(rowEdit.editType)){
			    	    				if(rowEdit.editType=='add'){
			    	    					if(checkNotEmpty(itemCd)){
			    			    				var ajaxParam = {
			    									url : '/iPlant_ajax',
			    									dataType : 'JSON',
			    									data : {
			    										IFS : 'Z000007',
			    										ITEM_CD : itemCd,
			    										pageIndex : 1,
			    										pageSize : 10
			    									},
			    									successCallBack : function(data) {
			    										rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
			    										if (rowNum > 0) {
			    											dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
			    								       		showmessage.html('<font color=red>您输入的物料编码['+ itemCd + ']已有相同,请重新输入!</font>');
			    								       		return false;
			    										} else {
			    											addDatagridEditor(dataGrid,index);
			    										}
			    									}
			    								};
			    								iplantAjaxRequest(ajaxParam);
			    			    			}else{
			    				        	   addDatagridEditor(dataGrid,index);
			    			    			}
			    	    				}else{
			    	    					addDatagridEditor(dataGrid,index);
			    	    					if(!checkNotEmpty(row.editType)){/*如果是修改的情况，ft_cd字段为只读模式*/
			    					    		ed = $(this).datagrid('getEditor', {index: index,field: 'ITEM_CD'});
			    					    		fc = ed.target;
			    					    		fc.prop('readonly',true);
			    				    		}
			    	    				}
			    	    			}else{
			    			    		 addDatagridEditor(dataGrid,index);
			    			    		 if(!checkNotEmpty(row.editType)){
			    					    		ed = $(this).datagrid('getEditor', {index: index,field: 'ITEM_CD'});
			    					    		fc = ed.target;
			    					    		fc.prop('readonly',true);
			    				    		}
			    	    			}
			    	    		}else{
			    	    			addDatagridEditor(dataGrid,index);
			    	    			if(!checkNotEmpty(row.editType)){
			    			    		ed = $(this).datagrid('getEditor', {index: index,field: 'ITEM_CD'});
			    			    		fc = ed.target;
			    			    		fc.prop('readonly',true);
			    		    		}
			    	    		}
			    	    	}
			        	}
		        	}
		        	
		        },
		        /**单击进入编辑模式*/
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		searchDataGrid=function(dgrid){
			var dgrid=$("#material_tab").datagrid("options"),searchITEM_CD = $('#searchITEM_CD').textbox('getValue'),searchITEM_NM = $('#searchITEM_NM').textbox('getValue'),searchITEM_TYPE = $('#searchITEM_TYPE').combobox('getValue');
			var reqData = {
				IFS: 'Z000007',
				ITEM_CD:searchITEM_CD,
				ITEM_TYPE:searchITEM_TYPE,
				ITEM_NM:searchITEM_NM,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'material_tab', reqData);
		},
		
		openDialogFrame =function(tabName,dialogName,titleName,reqData){
			$("#"+dialogName).dialog("open").dialog('setTitle', titleName);
			if(checkNotEmpty(reqData)){
				dialogDataGrid('/iPlant_ajax', tabName, reqData);
			}
			
			$(function(){
	        	$("#tt").tabs({
	        		onSelect:function(data){
	        			var tab=$("#tt").tabs("getSelected");
	        			var index=$("#tt").tabs("getTabIndex",tab);
	        			if(index==1&&data=='设置'){
	        				endEditingAll(dataGrid);
	    	        		dgrid = $('#material_tab').datagrid('options'),
	    	        		tabName = 'MaterialSetiing',
	    	        		dialogName = 'editTabSet',
	    	        	    titleName  = '物料属性',
	    	        	    dgrid.ITEM_CD = setRow,
	    					reqData = {IFS: 'Z000018',ITEM_CD:setRow,pageIndex: 1,pageSize: dgrid.pageSize};
	    					openDialogFrame(tabName,dialogName,titleName,reqData);
	        			}
	        		}
	        	});
	        });
			
		},
		dialogEditorDataGrid = function(tabName,reqData, jsonData) {
			/*根据tabName判断哪个列表*/
			var columnsTab,edDataGrid,messageInfo;
			if(tabName=='materialMSD_tab'){
				columnsTab=[{field: 'ITEM_MSD_CD',title: 'MSD编号',width: 10,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
						{field: 'ITEM_CD',title: '物料编码',width: 10,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
						{field: 'ITEM_NM',title: '物料名称',width: 10,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
						{field: 'FCT_CD',title: '工厂编码',width: 10,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
						{field: 'ALARM_DT',title: '报警时间',width: 120,align: 'center',formatter:function(value,row,index){if(row.ALARM_DT){return row.ALARM_DT;}},
		            		   editor:{type:'datebox',options:{editable:false}}},
					    {field: 'OVERDUE_DT',title: '过期时间',width: 120,align: 'center',formatter:function(value,row,index){if(row.OVERDUE_DT){return row.OVERDUE_DT;}},
			            		   editor:{type:'datebox',options:{
			            			   		editable:false,
			            			   		onSelect : function(date){
				            			    	var target = $('#materialMSD_tab').datagrid('getEditor', {'index':ccIndex,'field':'ALARM_DT'}).target;
				            			    	var target2 = $('#materialMSD_tab').datagrid('getEditor', {'index':ccIndex,'field':'OVERDUE_DT'}).target;
		 										var startTime = target.datebox('getValue')
		 														.split("-");
		 										var endTime = (date.getFullYear()+":"+(date.getMonth()+1)+":"+date.getDate())
													.split(":");
		 										
		 										var starttime = new Date(startTime[0], startTime[1], startTime[2]);
		 										var starttimes = starttime.getTime();
		 										
		 										var endtime = new Date(endTime[0], endTime[1], endTime[2]);
		 										var endtimes = endtime.getTime();
		 										if(starttimes > endtimes){
		 											$.messager.alert("提示", '报警时间不能大于过期时间！');
		 											target.datebox('setValue','');
		 											target2.datebox('setValue','');
		 										}
					            		    }
			            			   
			            		   }}},
						{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
						{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
		        	    {field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
						{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}];
				edDataGrid = $('#'+tabName);
				messageInfo = $('#showMSDInfo');
			}else if(tabName=='MaterialSetiing'){
				columnsTab=[
							
							{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FCT_NM || value)+ "</span>";},
						    		editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataFactory,required:true,editable:false}}},						    
							{field: 'ITEM_CD',title: '物料编码',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
					   	    {field: 'ITEM_ATTR',title: '物料属性',width: 130,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";},
					    		    editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataAttr,required:true,editable:false}}},  	 
						    {field: 'ITEM_ATTR_NM',title: '物料属性名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'ITEM_ATTR_VAL',title: '物料属性值',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							    	options:{validType:['length[1,25]','specialTextCharacter']}}}, 
							{field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
									options:{validType:['length[1,100]','specialTextCharacter']}}},
							{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
							{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 160,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 160,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
						];
						edDataGrid = $('#'+tabName);
						messageInfo = $('#showSetInfo');
			}else if(tabName=="MaterialView"){
				columnsTab=[
				            {field: 'ITEM_CD',title: '物料编码',width: 10,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
						    {field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FCT_NM || value)+ "</span>";},
						    		editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataFactory,required:true,editable:false}}},
						   	{field: 'ITEM_ATTR',title: '物料属性',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						    	options:{required:true,validType:['length[1,25]','specialTextCharacter']}}},
						    {field: 'ITEM_ATTR_NM',title: '物料属性名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						    	options:{required:true,validType:['length[1,50]','specialTextCharacter']}}},
							{field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						    	options:{validType:['length[1,50]','specialTextCharacter']}}},
							{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
							{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 160,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 160,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}

						];
				edDataGrid = $('#'+tabName);
				messageInfo = $('#showViewInfo');
			}else if(tabName=="materialPosition_tab"){
				columnsTab=[
						    {field: 'FCT_CD',title: '工厂编码',width: 10,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
						    {field: 'ITEM_CD',title: '物料编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								   	options:{required:true, validType:['length[1,30]','specialTextCharacter'],editable:false}}},
						   	{field: 'ITEM_POST',title: '物料位号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							   	    options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						    {field: 'ITEM_STATUS',title: '物料状态',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							    	options:{validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'PRNT_ITEM_CD',title: '父物料号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							    	options:{validType:['length[1,25]','specialTextCharacter']}}}, 
							{field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
									options:{validType:['length[1,100]','specialTextCharacter']}}},
							{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
							{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
						];
						edDataGrid = $('#'+tabName);
						messageInfo = $('#showPositionInfo');
			}else if(tabName="materialSubstitute_tab"){
				columnsTab=[
							{field: 'ITEM_CD',title: '原物料号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'textbox',
							   	options:{required:true,editable:false}}},
						    {field: 'FCT_CD',title: '工厂编码',width: 10,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
						   	
						    {field:'REPL_ITEM_CD',title: '替代料物料编码', width:250,align:'center',
	 	                        editor:{  
	 	                            type:'combobox',
	 	                            options:{
	 	                            	required:true,
	 	                            	valueField:'value',
	 	                                textField:'text',
	 	                                panelWidth:250,
	 	                                panelHeight:250,
	 	                                editable:false,
	 	                                data:dataBOM,
	 	                                onSelect:function(data){
	 	                                	var item= $('#materialSubstitute_tab').datagrid('getEditor', {'index':ccIndex,'field':'ITEM_CD'}).target;
	 	                                	var itemCD= item.textbox('getValue');
	 	                                	var combo = $('#materialSubstitute_tab').datagrid('getEditor', {'index':ccIndex,'field':'REPL_ITEM_CD'}).target;
	 	                                	var text = $('#materialSubstitute_tab').datagrid('getEditor', {'index':ccIndex,'field':'REPL_ITEM_NM'}).target;
	 	                                	if(data.value == itemCD){
	 	                                		$.messager.alert("提示", '替代料物料不能与原物料号相同！');
	 	                                		//$(this).combobox('setValue','');
	 	                                	}else{
	 	                                		text.textbox('setValue', BOM[data.value]);
	 	                                	}
	 									}
	 	                            }    
	 	                        }
	 	                      },
	 	                    {field:'REPL_ITEM_NM', title: '替代料物料名称', width:120,align:'center',editor:{type:'textbox',options:{editable:false}}}, 
						    
						    /*{field: 'REPL_ITEM_CD',title: '替代料物料编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							   	    options:{validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'REPL_ITEM_NM',title: '替代料物料名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								   	 options:{validType:['length[1,30]','specialTextCharacter']}}},*/
						    {field: 'STAFF',title: '员工',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							    	options:{validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'LATEST_DT',title: '最新时间',width: 110,align: 'center',formatter:function(value,row,index){if(row.LATEST_DT){return row.LATEST_DT;}},
					                editor:{type:'datebox',options:{required:true,editable:false}}},
							{field: 'OVERDUE_DT',title: '过期时间',width: 110,align: 'center',formatter:function(value,row,index){if(row.OVERDUE_DT){return row.OVERDUE_DT;}},
						            editor:{type:'datebox',options:{
						            		required:true,
						            		editable:false,
						            		onSelect : function(date){
				            			    	var target = $('#materialSubstitute_tab').datagrid('getEditor', {'index':ccIndex,'field':'LATEST_DT'}).target;
				            			    	var target2 = $('#materialSubstitute_tab').datagrid('getEditor', {'index':ccIndex,'field':'OVERDUE_DT'}).target;
		 										var startTime = target.datebox('getValue')
		 														.split("-");
		 										var endTime = (date.getFullYear()+":"+(date.getMonth()+1)+":"+date.getDate())
													.split(":");
		 										
		 										var starttime = new Date(startTime[0], startTime[1], startTime[2]);
		 										var starttimes = starttime.getTime();
		 										
		 										var endtime = new Date(endTime[0], endTime[1], endTime[2]);
		 										var endtimes = endtime.getTime();
		 										if(starttimes > endtimes){
		 											$.messager.alert("提示", '最新时间不能大于过期时间！');
		 											target.datebox('setValue','');
		 											target2.datebox('setValue','');
		 										}
					            		    }
						            }}},
							{field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
									options:{validType:['length[1,100]','specialTextCharacter']}}},
							{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
							{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
						];
						edDataGrid = $('#'+tabName);
						messageInfo = $('#showSubstituteInfo');
			}
			
			var gridList = {
				name: tabName,
				dataType: 'json',
				pagination:false,
				rownumbers:true,
				loadMsg: '数据加载中...',
				columns: [columnsTab],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 clickSign=true;
			    	 if(tabName=='materialMSD_tab'){
			    		 var ed = $(this).datagrid('getEditor', {index: index,field: 'ALARM_DT'});
			    		 row.ALARM_DT = $(ed.target).datebox('getValue');
			    	 }else if(tabName=="MaterialSetiing"){
			    		 var Setfct = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
				    	 row.FCT_CD = $(Setfct.target).combobox('getValue');
				    	 row.FCT_NM = $(Setfct.target).combobox('getText');
				    	 var Setattr = $(this).datagrid('getEditor', {index: index,field: 'ITEM_ATTR'});
				    	 row.ITEM_ATTR_NM = $(Setattr.target).combobox('getValue');
				    	 row.ITEM_ATTR = $(Setattr.target).combobox('getText');
			    	 }else if(tabName=="MaterialView"){
			    		 var Viewed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
				    	 row.FCT_CD = $(Viewed.target).combobox('getValue');
				    	 row.FCT_NM = $(Viewed.target).combobox('getText');
			    	 }
			     },
			     /**进入编辑模式的操作*/
			     onBeforeEdit:function(index,row){
			    	 messageInfo.html('');
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
			    onClickRow: function (index, row) {
			    	if (editIndex != index){
			    		var ed,fc,editorFt;
			    		if(editIndex!=undefined){
			    			if(tabName=='materialMSD_tab'){
			    				addDatagridEditor(edDataGrid,index);
			    			}else if(tabName=="materialPosition_tab"){
			    				addDatagridEditor(edDataGrid,index);
			    			}else if(tabName=="MaterialView"){
			    				addDatagridEditor(edDataGrid,index);
			    			}else if(tabName=="MaterialSetiing"){
			    				addDatagridEditor(edDataGrid,index);
			    			}else if(tabName=="materialSubstitute_tab"){
			    				addDatagridEditor(edDataGrid,index);
			    			}
			    		}else{
			    			addDatagridEditor(edDataGrid,index);
			    		}
			    	}
	            }
			}
			initGridView(reqData, gridList);
			$('#'+tabName).datagrid('loadData', jsonData);
		},
		checkSetRow =function(){	
			var edDataGrid = $('#MaterialView'); 
			var indexs = datagridEditorRows(edDataGrid),del = [],row,itemValue,delData;
						for(var j=0;j<indexs.length;j++){
							row = edDataGrid.datagrid('getRows')[indexs[j]];
							$.each(row,function(name,value) {
								if('ID'==name){
									itemValue = value;
								}
							});
							delData = {IFS: 'Z000018'},delData['ID']=itemValue;
							if(checkNotEmpty(itemValue)){
								var e = {
			                        url: "/iPlant_ajax",
			                        dataType: "JSON",
			                        data: delData,
			                        successCallBack: function(data) {
			                        	rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
										if (rowNum > 0) {
											checkDelete=false;
											edDataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
											$('#showViewInfo').html('<font color=red>你选中的数据存在子数据！</font>');
										} else {
											deleteDataGrid('MaterialView','ID','Z000017','showViewInfo');
											addDatagridEditor(edDataGrid,editIndex);
										}
			                        }
			                    };
								iplantAjaxRequest(e);
								edDataGrid.datagrid('selectRow', indexs[j]);
			                    
							}
						}
						
						
		}
		setDataNull=function(){
			 $('#showFileName').html('');
		}
	}
	
	eeEndEdit = function(str){
		var rows = $('#'+str).datagrid('getRows');
		if(rows.length>0){
			for(var i=0; i<rows.length; i++){
				$('#'+str).datagrid('endEdit',i);
			}
		}
	},
	
	/*显示图片*/
    showPic = function (){
 	   var img = document.getElementById('imgPicture'),pic = document.getElementById('txtFJ'),file,strSrc;      
 	   var pic = $('input[type="file"]')[1];
 	   getPicPath(img,pic,img);
 	   if(pic.files.length>0){
 		   file = pic.files[0],fileName = file.name,fileType=file.type,filePath=file.path;
 		   var temp = [];
 		   if(fileName.indexOf('.')>0){
 			   temp=fileName.split('.');
 			   strSrc = temp[temp.length-1];
 			   if(strSrc.localeCompare('jpg')===0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0 || strSrc.localeCompare('pdf') === 0 || strSrc.localeCompare('xlsx') === 0){
 				   $('#showFileName2').html(fileName);
 			   }
 		   }
 	   }
    },
    
    /* SYNCHRONIZATION_W_DATA
     * 同步仓库物料信息
     * */
    synchronizationData = function(){
    	var synData = {
            url: "/iPlant_ajax",
            dataType: "JSON",
            async: false,
            data: {
            	IFS: 'W0000045'
            },
            successCallBack: function(data) {
            	var result = data.RESPONSE[0].RESPONSE_DATA[0].STATUS;
    			if(result='1'){
    				$.messager.alert("提示", data.RESPONSE[0].RESPONSE_DATA[0].MESSAGE);
    				initGridData();
    			}else{
    				$.messager.alert("提示", data.RESPONSE[0].RESPONSE_DATA[0].MESSAGE);
    			}
            }
        };
		iplantAjaxRequest(synData);
    },
	
    /*保存产品图片路径*/
    savaStation = function() {
		var IFServerNo = '',reqData = [],susMsg = '',errorMsg = '',ajaxParam,photoURL;
			susMsg = '添加成功',errorMsg = '添加失败,请联系管理员';
			/*判断是否上传图片*/
			if(fileName!=undefined && fileName!='' && fileName!=null){
				$('.FILE_CLS2').val($('#txtFileNO').textbox('getValue'));//标识字段
				$('.FILE_BELONG2').val($('#txtFileBelong').textbox('getValue'));//图片表和引用表关联字段
				$('#showFileName2').val(fileName);//文件名称
				$('.FILE_TYPE2').val(fileType);//文件类型
				$('.importType2').val('0');//上传文件方式，0是一般文件，1是excel表格上传
				$('#fmEquipmentFile').submit();
				$("#file_upload_return").load(function(){//获取iframe中的内容
					var body = $(window.frames['file_upload_return'].document.body);
					var url = body[0].textContent ;
					url = url.replace(/\\/g,"/");
					var photopash = JSON.parse(url);
					photoURL = photopash[0].data[0].图片保存地址 ;
					ajaxParam = {
		           				url: '/iPlant_ajax',
		           				dataType: 'JSON',
		           				data: {
		           					ITEM_PIC: photoURL,
		    						ITEM_CD: itemCD,
		                            IFS: 'Z000090'
		           				},
		           				 successCallBack: function(data) {
		           					$.messager.alert('提示', susMsg);
		           				},
		           				errorCallBack: function() {
		           					$.messager.alert('提示', errorMsg);
		           				}
		           			};
		           			iplantAjaxRequest(ajaxParam);
		           			$("#editTab").dialog("close");
				});
			}
    };
    
    
	materialMaintenance.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#material_tab'),dataBOM=[],dataPi=[],dataFactory=[],dataWHS=[],dataUnit=[],dataAttr=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				/*获取工厂类别下拉*/
				$('#btnSearch').click(function() {					
					searchDataGrid();
				});
				$('#btnAdd').click(function() {		
					clickSign=false;
					var initData = {};
					if(dataFactory.length>0  && dataPi.length>0 && dataWHS.length>0 && dataUnit.length>0){	
						initData={FCT_CD:dataFactory[0].value,ITEM_TYPE:dataPi[0].value,WHS_CD:dataWHS[0].value,UOM:dataUnit[0].value,USE_YN:"Y",PROD_FLOG:"Y"}
					}
					insertDataGrid('material_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid('material_tab','ITEM_CD','Z000010','showMessageInfo');
					clickSign=true;
	            });

				$('#btnSave').click(function() {
					saveDataGrid('material_tab','Z000008','Z000009','showMessageInfo');
					clickSign=true;
				});
				
				/*物料msd设置*/
				$('#btnMSDAdd').click(function() {	
					ccIndex=0;
               	 	eeEndEdit('materialMSD_tab');
					var dgrid = $('#materialMSD_tab').datagrid('options');
					insertDataGrid('materialMSD_tab',{ITEM_MSD_CD:autoCreateCode('MES'),FCT_CD:dgrid.FCT_CD,ITEM_CD:dgrid.ITEM_CD,ITEM_NM:dgrid.ITEM_NM,USE_YN:"Y"});//初始化默认数据
				});
				
				$('#btnMSDDelete').click(function(){
					deleteDataGrid('materialMSD_tab','ITEM_MSD_CD','Z000034','showMSDInfo');
	            });

				$('#btnMSDSave').click(function() {
					saveDataGrid('materialMSD_tab','Z000023','Z000024','showMSDInfo');
					$("#materialMSD_tab").datagrid('reload');
				});
				
				
				/*物料属性*/
				$('#btnViewAdd').click(function() {		
					var dgrid = $('#material_tab').datagrid('options');
					insertDataGrid('MaterialView',{FCT_CD:dataFactory[0].value,USE_YN:"Y"/*,ID:autoCreateCode('MES')*/,ITEM_CD:dgrid.ITEM_CD});/*初始化默认数据*/
				});
				$('#btnViewDelete').click(function(){
					checkSetRow();
					if(checkDelete==true){
						deleteDataGrid('MaterialView','ID','Z000017','showViewInfo');
					}
	            });

				$('#btnViewSave').click(function() {
					saveDataGrid('MaterialView','Z000015','Z000016','showViewInfo');
				});
				
				$('#editTabSet').dialog({
				    onClose:function(){
				    var tab=$("#tt").tabs("getSelected");
				    var index=$("#tt").tabs("getTabIndex",tab);
				    if(index==1){
				    	$('#tt').tabs({
				    		selected:0
				    	});
				    }
				    }
				});
				
			   /*物料属性值设置*/
				$('#btnSetAdd').click(function() {		
					var dgrid = $('#material_tab').datagrid('options');
					insertDataGrid('MaterialSetiing',{FCT_CD:dataFactory[0].value,USE_YN:"Y"/*,ID:autoCreateCode('MES')*/,ITEM_CD:dgrid.ITEM_CD});//初始化默认数据
				});
				$('#btnSetDelete').click(function(){
					deleteDataGrid('MaterialSetiing','ID','Z000021','showSetInfo');
	            });
				$('#btnSetSave').click(function() {
					saveDataGrid('MaterialSetiing','Z000019','Z000020','showSetInfo');
				});
				
				/*物料位置*/
				$('#btnPositionAdd').click(function() {		
					var dgrid = $('#materialPosition_tab').datagrid('options');
					insertDataGrid('materialPosition_tab',{FCT_CD:dgrid.FCT_CD,ITEM_CD:dgrid.ITEM_CD,USE_YN:"Y"});/*初始化默认数据*/
				});
				
				$('#btnPositionDelete').click(function(){
					deleteDataGrid('materialPosition_tab','ID','Z000042','showPositionInfo');
	            });

				$('#btnPositionSave').click(function() {
					saveDataGrid('materialPosition_tab','Z000040','Z000041','showPositionInfo');
				});
				/*替代料设置*/
				$('#btnSubstituteAdd').click(function() {	
					ccIndex=0;
               	 	eeEndEdit('materialSubstitute_tab');
					var dgrid = $('#materialSubstitute_tab').datagrid('options');
					insertDataGrid('materialSubstitute_tab',{FCT_CD:dgrid.FCT_CD,ITEM_CD:dgrid.ITEM_CD,USE_YN:"Y"});/*初始化默认数据*/
				});
				
				$('#btnSubstituteDelete').click(function(){
					deleteDataGrid('materialSubstitute_tab','REPL_ITEM_CD','Z000038','showSubstituteInfo');
	            });

				$('#btnSubstituteSave').click(function() {
					var item= $('#materialSubstitute_tab').datagrid('getEditor', {'index':ccIndex,'field':'ITEM_CD'}).target;
                 	var itemCD= item.textbox('getValue');
                 	var combo = $('#materialSubstitute_tab').datagrid('getEditor', {'index':ccIndex,'field':'REPL_ITEM_CD'}).target;
                 	var value = combo.combobox('getValue');
                 	var text = $('#materialSubstitute_tab').datagrid('getEditor', {'index':ccIndex,'field':'REPL_ITEM_NM'}).target;
                 	if(value == itemCD){
                 		$.messager.alert("提示", '替代料物料不能与原物料号相同！');
                 		combo.combobox('setValue','');
                 		text.textbox('setValue','');
                 	}else{
                 		saveDataGrid('materialSubstitute_tab','Z000036','Z000037','showSubstituteInfo');
                 	}
				});
				/*导入*/
				$('#import').click(function() {
					$("#materialImportDialog").dialog("open").dialog('setTitle', '物料导入');
				});
				$('#btnExprt').click(function(){
                	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                		IFS:'Z000007P'
                	}
                	createTable('tbIMESReport','物料信息导出','material_tab',reqData);
                });
				$('.panel-tool-close').click(function() {
					editIndex = undefined;
					$('#showMessageInfo').html('');
					$('#showMSDInfo').html('');
					$('#showPositionInfo').html('');
					$('#showSubstituteInfo').html('');
					$('#showSetInfo').html('');
					$('#showViewInfo').html('');
				});
				
				/*
				 * btnExprt2 同步仓库物料信息
				 * */
				$('#btnExprt2').click(function(){
					synchronizationData();
				});
				
			});
		}
	}
	var clickSign=true;var setRow;var checkDelete,itemCD,filePath,itemNM;
	var fcfo = new materialMaintenance();var ccIndex= 0;/*全局索引;*/
	var BOM={};
	fcfo.init();
})();