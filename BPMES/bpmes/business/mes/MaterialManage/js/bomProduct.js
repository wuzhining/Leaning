/* 启动时加载 */
/*
 */
(function() {
	function sysRuleInfo() {
		initTreeGridData = function() {
			var dgrid = dataGrid.treegrid('options');
			if(!dgrid) return;
			/*searchITEM_CD = $('#search_MaterialType').textbox('getValue');*/
			searchPrtBom=  $("#search_prtbom").textbox('getValue');
			searchBomcd = $("#searchBomcd").textbox('getValue');
			var reqData = {
				IFS: 'Z000033',
				/*FCT_CD:searchITEM_CD,*/
				MOMCD:searchBomcd,
				BOM_CDPAGE: searchPrtBom,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqTreeGridData('/iPlant_ajax', 'bomProduct_tab', reqData);
		}
		
		bindTreeGridData = function(reqData,jsonData) {
			var gridList = {
				name: 'bomProduct_tab',
		        parentField: "_parentId",
		        textFiled: "ST_C_NM",
		        idField: "ST_C_CD",
		        treeField:"BOM_CD",
		        state: "closed",
		        pagination: true,
	            pageSize: 5,
	            pageList: [5,10,15],
				dataType: 'json',
				columns: [[
					{field: 'BOM_CD',title: 'BOM编码',width: 250,align: 'left',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						  options:{required:true, validType:['length[1,50]','specialVersionTextArea']}}},
					{field: 'ST_C_CD',hidden:true,title: 'BOM编码-版本',width: 170,align: 'left',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						  options:{required:true, validType:['length[1,50]','specialVersionTextArea']}}},	  
				    {field: 'ST_C_NM',title: 'BOM名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		        	      options:{validType:'length[1,400]'}}},
        	        {field: 'PRNT_BOM_CD',title: '母BOM编码',width:130 ,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
        	        	  options:{ validType:['length[1,50]']}}},  
		            {field: 'ST_P_CD',title: '树形父节点字段',hidden:true,width:130 ,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						  options:{ validType:['length[1,50]']}}},
				    {field: 'ST_P_NM',title: '母BOM名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		 	    	      options:{ validType:'length[1,400]'}}},
	 	    	    {field: 'VERSION',title: '版本',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		 	    	      options:{ validType:['length[1,400]','specialVersionTextArea']}}},
				    {field: 'FT_NM',title: '工厂名称',width: 120,align: 'center'},	  
		    		{field: 'UNIT_QTY',title: '单机用量',width: 60,align: 'right',editor:{type:'numberbox', options:{precision:2}}},	 		
	    		    /*{field: 'VALID_STAT_DT',title: '有效开始日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.VALID_STAT_DT){return row.VALID_STAT_DT;}},
            		     editor:{type:'datebox',}}, 
    	    		{field: 'VALID_END_DT',title: '有效结束日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.VALID_END_DT){return row.VALID_END_DT;}},
	            		   editor:{type:'datebox',}}, */
    	    		{field: 'MD_CL',title: '成型周期',width:60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{precision:0}}, 
		            	      formatter:function(value,row,index){return formatNumber(value,0);}},
    	    		{field: 'USE_YN',title: '是否启用',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},
					      editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
			        {field: 'MO',title: '说明',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
        	    		  options:{validType:['length[0,500]','specialTextCharacter']}}},	
	    		    {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				]],
				
				/**下拉框结束编辑模式的操作*/
			     onEndEdit:function(row){
			    	 /*var edd2 = $(this).treegrid('getEditor', {index: row.ST_C_CD,field: 'UOM'});
			    	 row.UOM = $(edd2.target).combobox('getValue');
			    	 row.UOM_NM = $(edd2.target).combobox('getText');
			    	 
			    	 var edd = $(this).treegrid('getEditor', {index: row.ST_C_CD,field: 'PRF_CD'});
			    	 row.PRF_CD = $(edd.target).combobox('getValue');
			    	 row.PRF_NM = $(edd.target).combobox('getText');
			    	 */
			     },
			     /**进入编辑模式的操作*/
			     onBeforeEdit:function(row){
			    	 showmessage.html('');
			    	 row.editing = true;
			    	 row.edited = false;
			    	 oldRow = JSON.stringify(row).replace(reg,'\"\"');
			    	 $(this).treegrid('refreshRow', row.ST_C_CD);
			     },
			     /**编辑模式进入之后的操作*/
			     onAfterEdit:function(row,changes){
			    	 /**判断是否进行数据变更*/
			    	 var temp = JSON.stringify(row).replace(reg,'\"\"');
			    	 if(temp!=oldRow){
			    		 row.edited = true;
			    	 }
			    	 row.editing = false;
			    	 $(this).treegrid('refreshRow', row.ST_C_CD);
			     },
			     onCancelEdit:function(row){
		            row.editing = false;
		            $(this).treegrid('refreshRow', row.ST_C_CD);
		        },
		        /**单击进入编辑模式*/
		        onClickRow: function (row) {
		        	var index = row.ST_C_CD;
			    	if (editIndex != index){
			    		var ed,fc,editorFt;
			    		var rowEdit = dataGrid.treegrid('getSelected');
			    		if(editIndex!=undefined){
		    				/**判断是否为新增行，并验证新增工厂编码重复*/
			    			var rowEdit = dataGrid.treegrid('getSelected');
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					addTreeGridEditor(dataGrid,index);
			    					if(!checkNotEmpty(rowEdit.editType)){	/*如果是修改的情况，ST_C_CD字段为只读模式*/
			    						if(row.ST_P_CD == 'N/A'){
				    		        		var ed = $(this).treegrid('getEditor', {index: index,field: 'UNIT_QTY'});
				    			    		var fc = ed.target;
				    			    		fc.numberbox('disable');
				    		        	}else{
				    		        		var ed = $(this).treegrid('getEditor', {index: index,field: 'UNIT_QTY'});
				    			    		var fc = ed.target;
				    			    		fc.numberbox('enable');
				    		        	}
							    		ed = $(this).treegrid('getEditor', {index: index,field: 'ST_C_CD'});
							    		fc = ed.target;
	    					    		fc.prop('readonly',true);
	    					    		
	    					    		ed4 = $(this).treegrid('getEditor', {index: index,field: 'ST_C_NM'});
							    		fc4 = ed4.target;
	    					    		fc4.prop('readonly',true);
	    					    		
	    					    		ed2 = $(this).treegrid('getEditor', {index: index,field: 'ST_P_CD'});
							    		fc2 = ed2.target;
	    					    		fc2.prop('readonly',true);
	    					    		
	    					    		ed5 = $(this).treegrid('getEditor', {index: index,field: 'ST_P_NM'});
							    		fc5 = ed5.target;
	    					    		fc5.prop('readonly',true);
	    					    		
	    					    		ed3 = $(this).treegrid('getEditor', {index: index,field: 'VERSION'});
							    		fc3 = ed3.target;
	    					    		fc3.prop('readonly',true);	
	    					    		
	    					    		ed6 = $(this).treegrid('getEditor', {index: index,field: 'BOM_CD'});
							    		fc6 = ed6.target;
	    					    		fc6.prop('readonly',true);	
						    		}
			    				}else{
			    					addDatagridEditor(dataGrid,index);
			    					if(!checkNotEmpty(row.editType)){
		    						 	if(row.ST_P_CD == 'N/A'){
				    		        		var ed = $(this).treegrid('getEditor', {index: index,field: 'UNIT_QTY'});
				    			    		var fc = ed.target;
				    			    		fc.numberbox('disable');
				    		        	}else{
				    		        		var ed = $(this).treegrid('getEditor', {index: index,field: 'UNIT_QTY'});
				    			    		var fc = ed.target;
				    			    		fc.numberbox('enable');
				    		        	}
		    						    ed = $(this).treegrid('getEditor', {index: index,field: 'ST_C_CD'});
							    		fc = ed.target;
	    					    		fc.prop('readonly',true);
	    					    		
	    					    		ed4 = $(this).treegrid('getEditor', {index: index,field: 'ST_C_NM'});
							    		fc4 = ed4.target;
	    					    		fc4.prop('readonly',true);
	    					    		
	    					    		ed2 = $(this).treegrid('getEditor', {index: index,field: 'ST_P_CD'});
							    		fc2 = ed2.target;
	    					    		fc2.prop('readonly',true);
	    					    		
	    					    		ed5 = $(this).treegrid('getEditor', {index: index,field: 'ST_P_NM'});
							    		fc5 = ed5.target;
	    					    		fc5.prop('readonly',true);
	    					    		
	    					    		ed3 = $(this).treegrid('getEditor', {index: index,field: 'VERSION'});
							    		fc3 = ed3.target;
	    					    		fc3.prop('readonly',true);	
	    					    		
	    					    		ed6 = $(this).treegrid('getEditor', {index: index,field: 'BOM_CD'});
							    		fc6 = ed6.target;
	    					    		fc6.prop('readonly',true);	
	    					    		
	    					    		ed7 = $(this).treegrid('getEditor', {index: index,field: 'PRNT_BOM_CD'});
							    		fc7 = ed7.target;
	    					    		fc7.prop('readonly',true);
		    				    	}
			    				}
			    			}else{
			    				addTreeGridEditor(dataGrid,index);
					    		if(!checkNotEmpty(rowEdit.editType)){
				    			 	if(row.ST_P_CD == 'N/A'){
			    		        		var ed = $(this).treegrid('getEditor', {index: index,field: 'UNIT_QTY'});
			    			    		var fc = ed.target;
			    			    		fc.numberbox('disable');
			    		        	}else{
			    		        		var ed = $(this).treegrid('getEditor', {index: index,field: 'UNIT_QTY'});
			    			    		var fc = ed.target;
			    			    		fc.numberbox('enable');
			    		        	}
				    			    ed = $(this).treegrid('getEditor', {index: index,field: 'ST_C_CD'});
						    		fc = ed.target;
    					    		fc.prop('readonly',true);
    					    		
    					    		ed4 = $(this).treegrid('getEditor', {index: index,field: 'ST_C_NM'});
						    		fc4 = ed4.target;
    					    		fc4.prop('readonly',true);
    					    		
    					    		ed2 = $(this).treegrid('getEditor', {index: index,field: 'ST_P_CD'});
						    		fc2 = ed2.target;
    					    		fc2.prop('readonly',true);
    					    		
    					    		ed5 = $(this).treegrid('getEditor', {index: index,field: 'ST_P_NM'});
						    		fc5 = ed5.target;
    					    		fc5.prop('readonly',true);
    					    		
    					    		ed3 = $(this).treegrid('getEditor', {index: index,field: 'VERSION'});
						    		fc3 = ed3.target;
    					    		fc3.prop('readonly',true);	
    					    		
    					    		ed6 = $(this).treegrid('getEditor', {index: index,field: 'BOM_CD'});
						    		fc6 = ed6.target;
    					    		fc6.prop('readonly',true);
    					    		
    					    		ed7 = $(this).treegrid('getEditor', {index: index,field: 'PRNT_BOM_CD'});
						    		fc7 = ed7.target;
    					    		fc7.prop('readonly',true);
						    	}
			    			}
			    		}else{
			    			addTreeGridEditor(dataGrid,index);
			    			if(!checkNotEmpty(rowEdit.editType)){
		    				 	if(row.ST_P_CD == 'N/A'){
		    		        		var ed = $(this).treegrid('getEditor', {index: index,field: 'UNIT_QTY'});
		    			    		var fc = ed.target;
		    			    		fc.numberbox('disable');
		    		        	}else{
		    		        		var ed = $(this).treegrid('getEditor', {index: index,field: 'UNIT_QTY'});
		    			    		var fc = ed.target;
		    			    		fc.numberbox('enable');
		    		        	};
			    				ed = $(this).treegrid('getEditor', {index: index,field: 'ST_C_CD'});
			    				fc = ed.target;
 					    		fc.prop('readonly',true);
 					    		
 					    		ed4 = $(this).treegrid('getEditor', {index: index,field: 'ST_C_NM'});
						    	fc4 = ed4.target;
 					    		fc4.prop('readonly',true);
 					    		
 					    		ed2 = $(this).treegrid('getEditor', {index: index,field: 'ST_P_CD'});
						    	fc2 = ed2.target;
 					    		fc2.prop('readonly',true);
 					    		
 					    		ed5 = $(this).treegrid('getEditor', {index: index,field: 'ST_P_NM'});
						    	fc5 = ed5.target;
 					    		fc5.prop('readonly',true);
 					    		
 					    		ed3 = $(this).treegrid('getEditor', {index: index,field: 'VERSION'});
						    	fc3 = ed3.target;
 					    		fc3.prop('readonly',true);	
 					    		
 					    		ed6 = $(this).treegrid('getEditor', {index: index,field: 'BOM_CD'});
					    		fc6 = ed6.target;
					    		fc6.prop('readonly',true);	
					    		
					    		ed7 = $(this).treegrid('getEditor', {index: index,field: 'PRNT_BOM_CD'});
					    		fc7 = ed7.target;
					    		fc7.prop('readonly',true);
					    	};
			    		};
			    	}
	            }
			}
			initTreeGrid(reqData, gridList);
			dataGrid.treegrid('loadData', jsonData);
		},
		
		openDialogFrame =function(tabName,dialogName,titleName,reqData){
			$("#"+dialogName).dialog("open").dialog('setTitle', titleName);
			if(checkNotEmpty(reqData)){
				dialogDataGrid('/iPlant_ajax', tabName, reqData);
			}
		},
		
		dialogEditorDataGrid = function(tabName,reqData, jsonData) {		
			/*根据tabName判断哪个列表*/
			var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
						{field: 'ITEM_CD',title: '产品条码',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return value;}},
						{field: 'ITEM_NM',title: '产品名称',width: 250,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return value;}},
			        	];
				edDataGrid = $('#'+tabName);
				messageInfo = $('#showMSDInfo');
			
			var gridList = {
				name: tabName,
				dataType: 'json',
				pagination:false,
				rownumbers:true,
				loadMsg: '数据加载中...',
				columns: [columnsTab],
				
		        /**单击进入编辑模式*/
			     onClickRow: function (index, row) {
			    	 $('#BOMCoding').searchbox('setValue',row.ITEM_CD);
			    	 $('#BOMName').textbox('setValue',row.ITEM_NM);
			    	 $("#MaterialDetail_open").dialog("close");
	            },
			}
			initGridView(reqData, gridList);
			$('#'+tabName).datagrid('loadData', jsonData);
		},
		
		/**批量新增和修改的保存*/
		saveTreeDataGrid=function(){
            if (endTreeGridEditing(dataGrid)){
            	/*判断后变更数据*/
            	if (dataGrid.treegrid('getChanges').length) {
                    var updated = dataGrid.treegrid('getChanges', "updated");
                    /**装载数据*/
                    var arrInsert = new Array(),arrUpdate = new Array(),strInsert = new Array(),strUpdate = new Array();
                    if(updated.length>0){
                    	for(var m=0;m<updated.length;m++){
                    		/*从当前选中行获取的母BOM编码是编码-版本，需切分字符串得到母BOM编码：prt_bom_cd*/
                    		var prt_bom_cd;
                    		var bomCd_version = updated[m].ST_P_CD;
                    		if(bomCd_version == 'N/A'){
                    			prt_bom_cd = 'N/A'
                    		}else{
                    			var index = updated[m].ST_P_CD.lastIndexOf('-');
                    			prt_bom_cd = updated[m].ST_P_CD.substring(0,index);
                    		}
                    		/*END*/
                    		if(updated[m].editType=='add'){
                    			arrInsert.push({ 
                    				UOM: updated[m].UOM,
                        			FCT_CD: updated[m].FCT_CD,
                        			BOM_ST: updated[m].BOM_ST,
                        			UNIT_QTY: updated[m].UNIT_QTY,
                        			CRT_ID: updated[m].CRT_ID,
                        			CRT_DT: updated[m].CRT_DT,
                        			USE_YN: updated[m].USE_YN,
                        			BOM_CD: updated[m].BOM_CD,
                        			PRF_CD: updated[m].PRF_CD,
                        			VALID_STAT_DT: updated[m].VALID_STAT_DT,
                        			VALID_END_DT: updated[m].VALID_END_DT,
                        			MD_CL: updated[m].MD_CL,
                        			MO: updated[m].MO,
                        			PRNT_BOM_CD: prt_bom_cd,
                        			VERSION: updated[m].VERSION,
                        		});
	                    	}else{
	                    		if(updated[m].edited){
	                    			arrUpdate.push({ 
	                    				UOM: updated[m].UOM,
	                        			FCT_CD: updated[m].FCT_CD,
	                        			BOM_ST: updated[m].BOM_ST,
	                        			UNIT_QTY: updated[m].UNIT_QTY,
	                        			CRT_ID: updated[m].CRT_ID,
	                        			CRT_DT: updated[m].CRT_DT,
	                        			USE_YN: updated[m].USE_YN,
	                        			BOM_CD: updated[m].BOM_CD,
	                        			PRF_CD: updated[m].PRF_CD,
	                        			VALID_STAT_DT: updated[m].VALID_STAT_DT,
	                        			VALID_END_DT: updated[m].VALID_END_DT,
	                        			MD_CL: updated[m].MD_CL,
	                        			MO: updated[m].MO,
	                        			PRNT_BOM_CD: prt_bom_cd,
	                        			VERSION: updated[m].VERSION,
	                    			});
	                    		}
	                    	}
                    	}
                        if(arrInsert.length>0){
                        	iplantAjaxRequest(ajaxInsert);
                    	}
                    	/*批量修改*/
                        var ajaxUpdate = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrUpdate,
                                IFS: 'Z000031'
                            },
                            successCallBack: function (data) {
                            	initTreeGridData();
                            	dataGrid.treegrid('acceptChanges');
                            	showmessage.html('<font color=red>保存成功！</font>');
                                return;
                            	 
                            },
                            errorCallBack: function (data) {
                            	showmessage.html('<font color=red>保存失败！</font>');
                                return;
                            }
                        };
                        if(arrUpdate.length>0){
                        	iplantAjaxRequest(ajaxUpdate);
                    	}
                    }
                }else{
                	showmessage.html('<font color=red>没有进行变更！</font>');
                }
			}else{
				showmessage.html('<font color=red>请输入必填项！</font>');
			}
		},
		/**删除行*/
		deleteTreeDataGrid=function (){
			/**删除行有2中情况，一种新增的还没有保存，一种是原来就有的直接删除*/
			var indexs = treegridEditorRows(),del = [],row;
			var CheckDel;
			if(indexs.length>0){
				$.messager.confirm("确认框", "您确定要删除您所选择的数据?",function(a) {
					if(a){
						var selectRow = dataGrid.datagrid('getSelected');
                    	var str = {
		                        url: "/iPlant_ajax",
		                        dataType: "JSON",
		                        data: {
		                            IFS: "Z000032",
		                            BOM_SEQ: selectRow.ST_C_CD
		                        },
		                        successCallBack: function(data) {
		                        	var callBackCode = data.RESPONSE[0].RESPONSE_HDR.MSG_CODE;
		                        	if(callBackCode == '0'){
		                        		showmessage.html('<font color=red>删除成功！</font>');
			                        	initTreeGridData();
		                        	}else{
		                        		showmessage.html('<font color=red>删除失败，请联系管理员！</font>');
		                        	}
		                        }
                    	  };
		               iplantAjaxRequest(str);
					}
	            })
			}else{
				showmessage.html('<font color=red>请选中要删除的数据！</font>');
			}
		};
		/**插入一个新的空白行*/		
		insertTreeDataGrid=function (){
			var id,parentId,SYS = '0';
			var row = dataGrid.treegrid('getSelected');
			if(row){
				 rowId = row.ST_C_CD;
				 parentId = row.ST_C_CD;
				 parentNM= row.ST_C_NM;
			}else{
				 rowId = '';
				 parentId = '';
				 parentNM = ''
			}
			id = autoCreateCode(SYS);
			dataGrid.treegrid('append', {
				parent: rowId,
				data: [{
					gridId:'bomProduct_tab',
					ST_C_CD:id,
					ST_P_CD:parentId,
					ST_C_NM:"",
					editType:'add',
					ST_P_NM:parentNM
				}]

			});
			
			/**新增一个字段判断是否为新增*/
			var rowEdit = dataGrid.treegrid('getSelected');
			dataGrid.treegrid('beginEdit',id);
			if (editIndex != id){
				if (endTreeGridEditing(dataGrid)){
					editIndex = id;
				} else {
				}
			}else{
				endTreeGridEditing(dataGrid);
			}
		}
		
		/*新增判断重复的父级BOM*/
		addCheck =function(){
			var isNa = $("#parentBOMCoding").combobox('getValue');
			if(isNa == 'N/A'){
				var bomCD = $("#BOMCoding").searchbox('getValue'),flag=0;
				if(bomCD == '' || bomCD==null){
					$.messager.alert('提示','请选择BOM编码')
				}else{
					var ajaxdew={	/*重复*/
		                    url:'/iPlant_ajax',
		                    async:false,
		                    data:{
		                        IFS:'Z000052',
		                        BOM_CD:bomCD
		                    },
		                    successCallBack:function(data){
		                    	var rowCollection=createSourceObj(data); 
		                    	var inputVersion = $("#text_version").textbox('getValue');
		                    	$.each(rowCollection,function(index,obj){
		                    		if(inputVersion == obj.VERSION){
		                    			flag+=1;
		                    		}
		                    	});
		                    }
		                }
		            iplantAjaxRequest(ajaxdew);
				};
				if(flag!=0){
	        		return false;
	        	}else{
	        		return true;
	        	}
			}else{
				return true;
			}
		}
		
		 /*请求列表数据并绑定到列表控件，并解析后台返回Json格式*/
	    reqGridData = function (url, gridId, reqData) {
	    	if("pageSize" in reqData){
	    		if(gridId=='Product_tab'){
	    		}else{
	    			//存在
	    			reqData.pageSize=initHeight();
	    		}
	    	}
	        var ajaxParam = {
	            url: url,
	            data: reqData,
	            successCallBack: function (data) {
	                if (data) {
	                    if(data.RESPONSE.length>0){
	                    	var rowNum = 0
	                        if(!data.RESPONSE["0"].RESPONSE_HDR) rowNum=0;
	                        else if (data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
	                            rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
	                        }
	                    }
	                    $('#' + btnConfig.btnDeleteId).linkbutton('enable');
	                    $('#' + btnConfig.btnUpdateId).linkbutton('enable');
	                    if (rowNum == 0) {
	                       	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE==='SESSION过期或是不存在'){
	                    		$.messager.confirm('确认框', '长时间未操作，请重新登陆', function (r) {
									if(r==true){
	                     	   			window.top.location.href="/iTaurus/Login.html";
	                     	  		}
									return false;
								})
	                     	}else{
	                     		//$.messager.alert('提示', '没有相关记录');
	                     	}
	                        
	                        $('#' + btnConfig.btnDeleteId).linkbutton('disable');
	                        $('#' + btnConfig.btnUpdateId).linkbutton('disable');
	                    }
	                    var rowCollection = createSourceObj(data);
	                    var jsonData = {
	                        total: rowNum,
	                        rows: rowCollection,
	                        IFS: reqData.IFS,
	                        gridId: gridId
	                    }
	                    for(var p in reqData){
	                    	var name=p;//属性名称 
	                    	if(name=="pageIndex" || name =="pageSize" || name=="rows" || name=="total" ||name=="originalRows"){
	                    		continue;
	                    	}
	                    	var value=reqData[p];//属性对应的值 
	                    	jsonData[name]=reqData[p]; 
	                    }
	                    if(gridId=='materialMSD_tab'){
	                    	dialogEditorDataGrid('materialMSD_tab',reqData, jsonData);
	                    }else{
	                    	bindGridData(reqData, jsonData);
	                    }
	                }
	            }
	        }
	        iplantAjaxRequest(ajaxParam);
	    };
		
		/*加载上级bom下拉框数据*/
	    loadSupBomData = function(parentBomCD){
	    	/*上级BOM编码*/
  			var ajaxSupBom={
                      url:'/iPlant_ajax',
                      data:{
                          IFS:'Z000033',
                          SUP_BOM: parentBomCD,
                          VERSION: $('#text_version').textbox('getValue')
                      },
                      successCallBack:function(data){
                      	  var obj = {};
                          var rowCollection=createSourceObj(data); 
                          var arr = [];
                          for(var i=0; i< rowCollection.length; i++){
                          	arr.push({"id":rowCollection[i].ST_C_CD, "text":rowCollection[i].BOM_CD});
                          	obj[rowCollection[i].ST_C_CD] = rowCollection[i].ST_C_NM;
                          };
                          $('#supBomCD').combobox({
                              data:arr,
                              valueField:'id',
                              textField:'text',
                              panelWidth:200,
                              onChange:function(n,o){  
  	           	            	$("#supBomNM").textbox('setValue',obj[n]);
  	           	            	$("#prt_seq").val(n);
                              }
                          });
                      }
                  }
              iplantAjaxRequest(ajaxSupBom);
	  		  /*上级BOM编码			END*/
	    }
	    /*加载上级bom下拉框数据		END*/
	    
	    /*初始化bom编码搜索框*/
	    initBomCDCombo = function(){
	    	$('#BOMCoding').searchbox({
                onChange:function(n,o){ 
   	            	var selectedBomCD =  n;
   	            	$("#parentBOMCoding").combobox("setValue",'');
   	            	/*选中的bom编码如果是顶层bom，在顶层bom下拉框数据源中删除他本身*/
               		loadParentBomCD(selectedBomCD).then(function(prtArr,obj){initPrtBomCDCombo(prtArr,obj)});
   	            	if(selectedBomCD == ''){
   	            		$("#BOMName").textbox('setValue','');
   	            		$('#parentBOMCoding').combobox({ disabled: true});
       	            	$('#parentBOMname').textbox({ disabled: true});
   	            	}else{
       	            	$('#parentBOMCoding').combobox({ disabled: false});
       	            	$('#parentBOMname').textbox({ disabled: false});
       	            	/*查询选中的bom编码是否是最顶层bom，如果是，版本栏变为选择框，数据为此bom编码的顶层BOM编码版本号*/
       	            	var InquireNA={
       	                     url:'/iPlant_ajax',
       	                     data:{
       	                         IFS:'Z000033',
       	                         CHECK_BOM_CD: selectedBomCD
       	                     },
       	                     successCallBack:function(data){
       	                    	 var callData = data.RESPONSE[0].RESPONSE_DATA;
       	                    	 if(callData.length>0){		//有返回值隐藏版本文本框，加载版本下拉框数据
       	                    		 $("#text_version").next().hide();
       	                    		 $("#combo_version").next().show();
       	                    		 comboFlag = true;
       	                    		 var versionData = [];
       	                    		 $.each(callData,function(o,op){
       	                    			 versionData.push({'id':op.VERSION,'text':op.VERSION});
       	                    		 });
       	                    		 $("#combo_version").combobox({
       	                    			 data:versionData,
       	                    			 valueField:'id',
       	                    			 textField:'text',
       	                    			 panelWidth:200,
       	                    			 onLoadSuccess: function () { //加载完成后,val[0]写死设置选中第一项
               				                var val = $(this).combobox("getData");
               				                for (var item in val[0]) {
               				                    if (item == "id") {
               				                        $(this).combobox("select", val[0][item]);
               				                    }
               				                }
               				             }
       	                    		 });	
       	                    	 }else{						//无返回值显示版本文本框，隐藏版本下拉框
       	                    		$("#text_version").next().show();
       	                    		$("#text_version").textbox('setValue','').textbox({disabled: true});
       	                    		$("#combo_version").next('.combo').hide();
       	                    		comboFlag = false;
       	                    	 }
       	                     }
       	            	}
       	            	iplantAjaxRequest(InquireNA);
   	            	}
                }
            });
	    }
	    /*初始化bom编码下拉框			END*/
	    
	    /*初始化顶层bom编码下拉框*/
	    initPrtBomCDCombo = function(prtArr,obj){
	    	$('#parentBOMCoding').combobox({
                data:prtArr,
                valueField:'id',
                textField:'text',
                panelWidth:200,
                onChange:function(n,o){
                	var flag_one = $("#parentBOMCoding").combobox('getValue').lastIndexOf('-');
        			var parentBomCD = n.substring(0,flag_one);
                	
                	$("#parentBOMname").textbox('setValue',obj[parentBomCD]);	//给顶层BOM名称赋值
                	/*警告重复*/
   	            	if(n == '') {
   	            		$('#supBomCD').combobox({disabled: true});
       	            	$('#supBomNM').textbox({disabled: true});
       	            	$('#supBomCD').combobox('setValue','');
       	            	$('#supBomNM').textbox('setValue','');
       	            	$("#text_version").textbox('setValue','');
   	            		return;
   	            	}
   	            	if(n=="N/A"){												/*子父情况不同*/	
   	            		/*如顶层节点为N/A，版本输入框为必输项文本框*/
   	            		$('#text_version').next().show();
   	            		$('#combo_version').next().hide();
   	            		comboFlag = false;
   	            		$('#text_version').textbox({							//为顶层父节点版本栏可输入
   	            			 disabled : false,
   		            		 required: true,
   		            		 prompt:'',
   		            		 missingMessage:'该选项为必填信息' 
   		            	 });
   	            		 $("#text_version").textbox('setValue','');
   	            		 $('#Singledosage').numberbox({
   	            			 disabled : true,
   	            			 prompt:'无需输入'
   	            		 });
   	            		 $('#Singledosage').numberbox('setValue','');
   	            		 $("#parentBOMname").textbox('setValue','顶层父节点');		//给顶层BOM名称赋值
   	            		 
   	            		 $('#supBomCD').combobox({disabled: true});
       	            	 $('#supBomNM').textbox({disabled: true});
       	            	 $('#supBomCD').combobox('setValue','');
       	            	 $('#supBomNM').textbox('setValue','');
   	            	 }else{
   	            		 /*父节点不为N/A的需要选择上级BOM*/
   	            		 $('#supBomCD').combobox({disabled: false});
       	            	 $('#supBomNM').textbox({disabled: false});
   	            		 
   	            		 var selectPrnCd = $("#parentBOMCoding").combobox('getText');
   	            		 var index = selectPrnCd.lastIndexOf('-');
   	            		 var PrnBomCd = selectPrnCd.substring(0,index);
   	            		 var version = selectPrnCd.substring(index+1);
   	            		 
   	            		 /*添加子节点查重*/
   	            		 var ajaxParam4={
	                             url:'/iPlant_ajax',
	                             data:{
	                                 IFS:'Z000033',
	                                 PRNT_BOM_CD: PrnBomCd,
	                                 VERSION: version,
	                                 BOM_CD: $("#BOMCoding").searchbox('getText')
	                             },
	                             successCallBack:function(data){
	                             	if(data.RESPONSE[0].RESPONSE_DATA.length == 0){
	                             		 var arr = $("#parentBOMCoding").combobox('getText').split('-');
		           	            		 var thisVersion = arr[arr.length-1];
		           	            		 $("#text_version").textbox({
		           	            			 disabled:true,
		           	            			 required:false
		           	            		 });
		           	            		 $("#text_version").textbox('setValue',thisVersion);	//非顶层父节点禁用版本输入框并置空
		           	            		 
		           	            		$('#Singledosage').numberbox({
		           	            			 disabled : false,
		           		            		 required: true,
		           		            		 prompt:'',
		           		            		 missingMessage:'该选项为必填信息' 
		           		            	});
		           	            		loadSupBomData(parentBomCD);				//顶层BOM编码非N/A非空时加载上级BOM编码下拉框数据
	                             	}else{
	                             		$.messager.alert('提示','母BOM下已有重复子BOM，请重新选择。');
	                             		$("#BOMCoding").searchbox('setValue','');
	                             		$("#parentBOMCoding").combobox('setValue','');
	                             		$("#BOMName").textbox('setValue','');
	                             		$("#parentBOMname").textbox('setValue','');
	                             	}
	                             }
	                         }
   	            		 iplantAjaxRequest(ajaxParam4);
   	            	 };
	             }
            });
	    }
	    /*初始化顶层bom编码下拉框			END*/
	    
	    loadParentBomCD = function(selectedBomCD){
	    	var Defer = $.Deferred();          //声明一个Defer对象
	    	/*顶层BOM编码*/
			var ajaxParam4={
                    url:'/iPlant_ajax',
                    data:{
                        IFS:'Z000053',
                        BOM_CD:selectedBomCD
                    },
                    successCallBack:function(data){
                    	var obj = {};
                    	var bomCode = $("#BOMCoding").searchbox('getValue');
                    	$('#parentBOMCoding').combobox('clear');
                        var rowCollection=createSourceObj(data); 
                        var prtArr = [];
                        prtArr.push({"text":"N/A", "id":"N/A"});
                        for(var i=0; i< rowCollection.length; i++){
                        	prtArr.push({
                        		"text":rowCollection[i].BOM_CD + '-' + rowCollection[i].VERSION, 
                        		"id":rowCollection[i].BOM_CD + '-' + rowCollection[i].VERSION
                        	});
                        	obj[rowCollection[i].BOM_CD] = rowCollection[i].BOM_NM;
                        };
                        Defer.resolve(prtArr,obj);               //在Defer对象的resolve状态中把combobox对象传出去
                    }
                }
            iplantAjaxRequest(ajaxParam4);
			/*顶层BOM编码		END*/
			return Defer.promise();                                   //返回一个promise对象
	    }
	    
	    
		/* 添加编码弹出框 */
		addCustom=function() {
			$("#enditTabBOM").dialog("open").dialog('setTitle', '产品BOM增加');
			clearallinput();
			/*弹出新增弹框时隐藏版本下拉框，只显示版本文本框*/
			$('#combo_version').next().hide();				
			$("#text_version").next().show();	
            /*时间默认*/
           formatterDate = function(date) {
				var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
				var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"+ (date.getMonth() + 1);
				return date.getFullYear() + '-' + month + '-' + day;
			};
			$('#startdate').datebox('setValue', formatterDate(new Date()));
			$('#enddate').datebox('setValue', formatterDate(new Date()));
			initBomCDCombo();
			/*工厂*/
			var ajaxParam2={
                    url:'/iPlant_ajax',
                    data:{
                        IFS:'B000021',
                    },
                    successCallBack:function(data){
                    	$('#plantName').combobox('clear');
                        var rowCollection=createSourceObj(data); 
                        var arr = [];
                        for(var i=0; i< rowCollection.length; i++){
                        	arr.push({"id":rowCollection[i].FT_CD, "text":rowCollection[i].FT_NM});
                        }
                        $('#plantName').combobox({
                            data:arr,
                            valueField:'id',
                            textField:'text',
                            panelWidth:200
                        });
                    }
                }
            iplantAjaxRequest(ajaxParam2);
		}
		/*弹出验证*/
		checkDataValid = function() {
			var a = $("#BOMCoding").searchbox('getValue'),		/*bom编码*/
			b = $("#Singledosage").numberbox('getValue'),		/*单机用量*/
			c = $('#parentBOMCoding').combobox('getValue'),		/*母bom编码*/
			d = $('#plantName').combobox('getValue'),			/*工厂名称*/
			g = $('#text_version').textbox('getValue');
			if (c=="N/A"){
				if (a=='' || c=='' || d==''  || g=='')
					return false;
				return true;
			}else{
				if ("" == a || "" == b || "" ==c || ""==d )
					return false;
				return true;
			};
			
         },
         /*清空弹出框输入值*/
         clearallinput = function(){
        	 $('#fmCustom').form('clear');
        	 $("#BOMCoding").searchbox('setValue','');
        	 /*两个单选框默认选中*/
        	 $("#available").prop('checked','checked');		
        	 $("#txtBOM_ST").prop('checked','checked');
        	 /*两个单选框默认选中		END*/
         }
         
		/* 页面保存按钮通用*/
		savaStation = function() {
        	if (!checkDataValid()) return void $.messager.alert("提示", "请添加必选信息");
        	if(!addCheck()){
        		$('#text_version').textbox('setValue',''); 
        		$('#BOMCoding').searchbox('setValue',''); 
        		$('#parentBOMCoding').combobox('setValue',''); 
        		return void $.messager.alert("提示", "此BOM编码的版本号已有相同，请重新输入。");
        	};
			var arrInsert = new Array();
			var index = $("#parentBOMCoding").combobox('getText').lastIndexOf('-');
			var parent = $("#parentBOMCoding").combobox('getValue');
			var supCD = $('#supBomCD').combobox('getText');				//上级bom编码
			if(parent == 'N/A'){
				var parentBomCD = $("#parentBOMCoding").combobox('getValue').substring(0,index);
				supCD = 'N/A';
			}else{
				var parentBomCD = $("#parentBOMCoding").combobox('getValue').substring(0,index);
			}
			var check1 = $("#available").prop('checked');
			var check2 = $("#txtBOM_ST").prop('checked');
			
			var thisVersion;
			if(comboFlag == true){
				thisVersion = $('#combo_version').combobox('getValue');
			}else{
				thisVersion = $('#text_version').textbox('getValue');
			}
			
			if(comboFlag != true && parent != 'N/A'){
				thisVersion = '';
			}
			var prtSeq = $("#prt_seq").val();
			if(prtSeq == undefined || prtSeq == ''){
				prtSeq = 'N/A';
			};
			arrInsert.push({ 
    			BOM_NM: $('#BOMName').textbox('getValue'),
    			PRNT_BOM_NM: $("#parentBOMname").textbox('getValue'),
    			FCT_CD: $('#plantName').combobox('getValue'),
    			BOM_ST: check2?'Y':'N',
    			UNIT_QTY: $('#Singledosage').val(),
    			USE_YN: check1?'Y':'N',
    			BOM_CD: $('#BOMCoding').searchbox('getText'),
    			MD_CL: $('#moldingcycle').val(),
    			VALID_STAT_DT: $('#startdate').datebox('getValue'),
    			VALID_END_DT: $('#enddate').datebox('getValue'),
    			SUP_BOM: supCD,								//新增时的SUP_BOM字段为最顶级BOM值
    			MO: $('#txtNote').val(),		
    			VERSION:thisVersion,
    			PRNT_BOM_CD: parentBomCD,									//新增时的PRNT_BOM_CD字段为上一级BOM值
    			PRT_BOM_SEQ:prtSeq
    		});
			var ajaxParam = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					list: arrInsert,
                    IFS: 'Z000030'
				},
				successCallBack: function(data) {
					if($.messager.alert('提示', '新增成功！')) {
						$('#enditTabBOM').dialog('close');
						initTreeGridData();
					}
				},
				errorCallBack: function() {
					$.messager.alert('提示', '新增失败！');
				}
			};
			iplantAjaxRequest(ajaxParam);
			$("#enditTabBOM").dialog("close");
		}
         
		/*查询*/
		searchDataGrid=function(dgrid){
			initTreeGridData();
		}
		/*导入*/
		OpenImprotFramedr = function(){
			$("#materialImportDialog").dialog("open").dialog('setTitle', '产品BOM导入');
		}
	     setDataNull=function(){
			 $('#showFileName').html('');
		}
	     
	     /*点击bom编码seachbox查询bom信息*/
	     doSearch = function(){
	    	$("#search_itemCD").textbox('setValue','');		//置空搜索框
	    	var titleName = 'BOM明细信息';
			var dialogName = 'MaterialDetail_open';
			var tabName = 'materialMSD_tab';
			var dgrid = $('#materialMSD_tab').datagrid('options');
			var reqData = {
					IFS: 'Z000007',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
			openDialogFrame(tabName,dialogName,titleName,reqData);
	     }
	}

	sysRuleInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#bomProduct_tab'),
				dataCompany = [],dataFactory=[],dataTmp=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initTreeGridData();
				/*获取工厂类别下拉*/
				$('#btnSearch').click(function() {					
					searchDataGrid();
				});
				$('.add').click(function() {	
					addCustom();
				});
				
				$('.delete').click(function(){
					deleteTreeDataGrid();
	            });

				$('#btnSave').click(function() {
					saveTreeDataGrid();
				});
				$('#btnImport').click(function() {						/*导入*/
					OpenImprotFramedr();
				});
				
				$('#btnSearchDetail').click(function(){
					var titleName = 'BOM明细信息';
					var dialogName = 'MaterialDetail_open';
					var tabName = 'materialMSD_tab';
					var search_itemCD = $('#search_itemCD').textbox('getValue');
					var reqData = {
						IFS: 'Z000007',
						ITEM_CD:search_itemCD,
						/*pageIndex: 1,
						pageSize: dgrid.pageSize*/
					}
					openDialogFrame(tabName,dialogName,titleName,reqData);
				});
				
				/*验证版本号不能输入非法字符*/
			    $("input",$("#text_version").next("span")).blur(function(){
				    var workOrderNo=$("#text_version").textbox('getText');
				    if(workOrderNo != ""){
				    	var reg=/^([A-Za-z0-9_-.])*$/;
				 	   	var result=!reg.test(workOrderNo);
			        	 if(result){
							 $.messager.alert('提示','请输入正确的版本号');
							 $('#text_version').textbox('setValue', '');
							 return;
						}	
			        }
			     });
				
				 $('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'Z000033'
	                	}
	                	createTable('tbIMESReport','产品BOM导出','bomProduct_tab',reqData);
	                });
			});
		}
	}
	var sysRule = new sysRuleInfo(),bomObj={},bomArr=[],comboFlag,prtSeq={},supVersion={};//版本是否为下拉框的flag;
	sysRule.init();
})();