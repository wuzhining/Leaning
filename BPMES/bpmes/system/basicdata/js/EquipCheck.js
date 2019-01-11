(function () {
    function EquipCheck() {
    pageConfig={
          gridName:'EquipCheck_tab',
          EquipCheckCode:'EquipCheckCode',
          EquipCheckName:'EquipCheckName',
          EquipCheckUse:'EquipCheckUse',
          EquipCheckUr :'EquipCheckUr',
          title:'设备检点管理',
      }
      initGridData=function(){
        var dgrid=$('#'+pageConfig.gridName).datagrid('options');
        if(!dgrid) return;
            var reqData = {
                    IFS: 'H000114',
                    pageIndex:1,
                    pageSize:dgrid.pageSize
            }
         reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
        },
      bindGridData = function (reqData,jsonData) {
        var grid = {
            name: pageConfig.gridName,
            dataType: 'json',
            columns:[[
// {field : "CZ",width : 10,checkbox : true},
               { field: 'CK_CD', title: '点检项目编号' , width: 200 ,align:'center',hidden:'true'},
               { field: 'CK_NM', title: '点检项目名称', width: 200 ,align:'center'},
               { field: 'DICT_IT_NM', title: '设备类别名称', width: 200 ,align:'center'},
               { field: 'CK_TY_NM', title: '点检类别名称', width: 100 ,align:'center'},
               { field: 'CK_SORT', title: '序号', width: 100 ,align:'center'},
               { field: 'CUS_RM', title: '备注', width: 200 ,align:'center'},
               { field: 'USE_YN', title: '是否启用', width: 100 ,align:'center',formatter:function(value,row,index) {
                  if(row.USE_YN=='Y'){
                    return"启用";
                  }else{
                    return"不启用";
                  }
               }},
               { field: 'IS_UR', title: '是否紧急', width: 100 ,align:'center',formatter:function(value,row,index) {
                   if(row.IS_UR=='Y'){
                     return"紧急";
                   }else{
                     return"非紧急";
                   }
                }},
               { field: 'CRT_ID', title: '创建人', width: 100 ,align:'center'},
               { field: 'CRT_DT', title: '创建时间', width: 200 ,align:'center'},
               { field: 'UPT_ID', title: '修改人', width: 100 ,align:'center'},
               { field: 'UPT_DT', title: '修改时间', width: 200 ,align:'center'},
            ]],
            onDblClickRow: function(index,row){	
            	OptType=1;
		    	 $("#enditTab").dialog("open").dialog('setTitle', '查看设备点检信息');
		    	 checkFun();
		    	 $('#EquipCheckCode').textbox('setValue',row.CK_CD==null?'':row.CK_CD);
		           $('#EquipCheckName').textbox('setValue',row.CK_NM==null?'':row.CK_NM);
		           $('#EquipCheckType').textbox('setValue',row.DICT_IT==null?'':row.DICT_IT);
		           $('#EquipCheckType').textbox('setText',row.DICT_IT_NM==null?'':row.DICT_IT_NM);
		           $('#cmbCheckType').textbox('setValue',row.CK_TY==null?'':row.CK_TY);
		           $('#cmbCheckType').textbox('setText',row.CK_TY_NM==null?'':row.CK_TY_NM);
		           $('#EquipCheckSort').textbox('setValue',row.CK_SORT==null?'':row.CK_SORT);
		           $('#EquipCheckNote').textbox('setValue',row.CUS_RM==null?'':row.CUS_RM);
		             if (row.USE_YN == "Y") {
		                 $('#'+pageConfig.EquipCheckUse).prop('checked', 'checked');
		             } else {
		                 $('#'+pageConfig.EquipCheckUse).prop('checked', '');
		             }
		             if (row.IS_UR == "Y") {
		                 $('#'+pageConfig.EquipCheckUr).prop('checked', 'checked');
		             } else {
		                 $('#'+pageConfig.EquipCheckUr).prop('checked', '');
		             }
		     }
        }
        initGridView(reqData,grid);
        $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
      },
      checkFun = function (){
    	  var qx = getUpdateRight();
			if(qx=="Y"){
				$('#EquipCheckCode').textbox('textbox').attr('disabled', true);
		    	 $('#EquipCheckName').textbox('textbox').attr('disabled', false);
		    	 $('#EquipCheckType').textbox('textbox').attr('disabled', false);
		    	 $('#EquipCheckType').textbox('textbox').attr('disabled', false);
		    	 $('#cmbCheckType').textbox('textbox').attr('disabled', false);
		    	 $('#EquipCheckSort').textbox('textbox').attr('disabled', false);
		    	 $('#EquipCheckNote').textbox('textbox').attr('disabled', false);
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				OptType=2;
				$('#EquipCheckCode').textbox('textbox').attr('disabled', true);
		    	 $('#EquipCheckName').textbox('textbox').attr('disabled', true);
		    	 $('#EquipCheckType').textbox('textbox').attr('disabled', true);
		    	 $('#EquipCheckType').textbox('textbox').attr('disabled', true);
		    	 $('#cmbCheckType').textbox('textbox').attr('disabled', true);
		    	 $('#EquipCheckSort').textbox('textbox').attr('disabled', true);
		    	 $('#EquipCheckNote').textbox('textbox').attr('disabled', true);
		    	 $('#saveID').hide();
		    	 $('#cancleID').hide();
			}
			 
      }
      /* 验证是否重复 */
      existEquip=function(equipCode) {
			var rowNum, tpm = $('#EquipCheckCode');
			if (getOptType() == 0) {
				if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#EquipCheckCode').textbox('getText'))){
		        	$.messager.alert('提示', "点检编号不能是中文和非法字符，请重新输入。","",function(){
						$('#EquipCheckCode').textbox('setValue', '');
						
					});
		        	return;
		        }
				if (tpm.val() != undefined && tpm.val() != ''
						&& tpm.val() != null) {
					if (equipCode != undefined && equipCode != ''
							&& equipCode != null) {
						if (tpm.textbox('getValue') != undefined
								&& tpm.textbox('getValue') != ''
								&& tpm.textbox('getValue') != null) {
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'H000114',
									CK_CD : equipCode,
									pageIndex : 1,
									pageSize : 10
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										$.messager
												.alert(
														'提示',
														'您输入的点检编号['
																+ equipCode
																+ ']已有相同,请重新输入!');
										tpm.textbox('setValue', '');
										return false;
									} else {
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
      
      OptType=0,
      getOptType=function(){
        return this.OptType;
      },
      setOptType=function(value){
        this.OptType=value;
      },
      /*
		 * checkDataValid = function () { var EquipCheckCode =
		 * $('#'+pageConfig.EquipCheckCode).val(); var EquipCheckName
		 * =$('#EquipCheckName').textbox('getValue'); if (EquipCheckCode ==
		 * ''||EquipCheckName=='') { return false; } return true; },
		 */
      setDataNull = function () {
       $('#'+pageConfig.EquipCheckCode).textbox({ required: false });
        $("#EquipCheckMes").form("clear");
      },
      addEquipCheck = function () {
    	  setOptType(0);
         
    	 $('#EquipCheckCode').textbox('textbox').attr('readonly', false);
 		 $('#EquipCheckCode').textbox('textbox').attr('disabled', false);
         $("#enditTab").dialog("open").dialog('setTitle', pageConfig.title+'维护');
         $("#EquipCheckMes").form("clear");
      },
      getDCIT =function(DICT){//获取设备类别编号
    	  var DICTS;
    	  var ajaxParam = {
					url : '/iPlant_ajax',
					dataType : 'JSON',
					data : {
						IFS : 'I00011',
						DICT_IT_NM : DICT
					},
					 async:false,
					successCallBack : function(data){
						 var rowCollection=createSourceObj(data);//接收返回数据，数组形式
						 DICTS= rowCollection[0].DICT_IT;
					}
    		  
    	  }
    	  iplantAjaxRequest(ajaxParam);
    	  return DICTS;
      }
      saveUpdateValidate = function() {
			var checkedItems = $('#EquipCheck_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.CK_CD) {
				var isUserYn = 'N';
				if ($('#EquipCheckUse').is(':checked')) {
					isUserYn = "Y";
				} else {
					isUserYn = "N";
				}
				var isUr = 'N';
				if ($('#EquipCheckUr').is(':checked')) {
					isUr = "Y";
				} else {
					isUr = "N";
				}
				if ($('#EquipCheckCode').textbox('getValue') != row.CK_CD
						|| $('#EquipCheckName').textbox('getValue') != row.CK_NM
					//	|| $('#EquipCheckType').textbox('getValue') != row.DICT_IT
						|| $('#EquipCheckType').combobox('getText') != row.DICT_IT_NM
						|| $('#cmbCheckType').textbox('getValue') != row.CK_TY
						|| $('#cmbCheckType').combobox('getText') != row.CK_TY_NM
						|| isUserYn != row.USE_YN
						|| isUr != row.IS_UR
						|| $('#EquipCheckSort').textbox('getValue') != row.CK_SORT
						|| $('#EquipCheckNote').textbox('getValue') != row.CUS_RM) {
					return true;
				} else {
					return false;
				}
			}
		}
      saveEquipCheck = function () {
         /*
			 * if (!checkDataValid()){ $.messager.alert('提示','请输入必选添加信息');
			 * return };
			 */
         if(!checkForm()) return;
         var toSort =$('#EquipCheckSort').val();
         if(toSort != ''){
 			if(!/^\d+$/.test(toSort)){
 				$.messager.alert('提示','序号只能输入数字');
 				return;
 			}
 		}
         var EquipCheckCode =$('#EquipCheckCode').textbox('getValue');
         var EquipCheckName =$('#EquipCheckName').textbox('getValue');
         var EquipCheckType =$('#EquipCheckType').combobox('getValue');
         var EquipCheckType2=getDCIT(EquipCheckType);//调用方法
         var cmbCheckType=$('#cmbCheckType').combobox('getValue');
         var EquipCheckSort =$('#EquipCheckSort').textbox('getValue');
         var EquipCheckNote =$('#EquipCheckNote').textbox('getValue');
         var IFServerNo = '';
         var EquipCheckUse='';
         if($("#EquipCheckUse").is(':checked')) EquipCheckUse='Y';
         else EquipCheckUse='N';
         var EquipCheckUr='';
         if($("#EquipCheckUr").is(':checked')) EquipCheckUr='Y';
         else EquipCheckUr='N';
         var reqData={
          CK_CD: EquipCheckCode,
          CK_NM: EquipCheckName,
          CK_SORT: EquipCheckSort,
          CUS_RM: EquipCheckNote,
          USE_YN: EquipCheckUse,
          IS_UR: EquipCheckUr,
          DICT_IT: EquipCheckType2, 
          CK_TY:cmbCheckType
         }
         var optType=getOptType();
         // 新增
         if (optType == 0) {
             IFServerNo = 'H000115',
             $.extend(reqData, { CRT_ID: '',CRT_IP: '',IFS:IFServerNo}); 
         }
         // 修改
         else if (optType == 1) {
        	 if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
             IFServerNo = 'H000116',
             reqData =$.extend(reqData, { CRT_ID: '',CRT_IP: '',IFS:IFServerNo});
         }
         var susMsg='',errorMsg='';
         if(optType==0){
           susMsg='添加成功';
           errorMsg='添加失败,请联系管理员';
         }
         else{
           susMsg='更新成功';
           errorMsg='更新失败,请联系管理员';
         }
         if(!checkForm()) return;
         var ajaxParam = {
             url: '/iPlant_ajax',
             dataType: 'JSON',
             data: reqData,
             successCallBack:function(data){
                if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
                    if($.messager.alert('提示', susMsg)){
                        $('#enditTab').dialog('close');
                        setDataNull();
                        initGridData();     
                    }
                }else{
                    $.messager.alert('提示', errorMsg);
                    $("#enditTab").dialog("close");
                }
             },
             errorCallBack:function(){
               $.messager.alert('提示', errorMsg);
             }   
         };
         iplantAjaxRequest(ajaxParam);
      },
      validSelectedData = function (gridName,type) {
          var checkedItems = $('#' + gridName).datagrid('getSelections');
          var num = 0;
          $.each(checkedItems, function (index, item) {
             num++;
          });
          if (type == 'Update') {
              if (num != 1) {
                  return false;
              }
          }
          else {
              if (num <= 0) {
                  return false;
              }
          }
          return true;
      },
      updateEquipCheck = function () {
         var isSelectedData = validSelectedData(pageConfig.gridName, 'Update');
         if (!isSelectedData) {
             $.messager.alert('提示', '请选择一条数据进行修改');
             return;
         }
         var row = $("#"+pageConfig.gridName).datagrid("getSelected");
         setOptType(1);
         if (row) {
           $("#enditTab").dialog("open").dialog('setTitle', '编辑'+pageConfig.title+'维护');
           $('#EquipCheckCode').textbox('textbox').attr('readonly', true);
		   $('#EquipCheckCode').textbox('textbox').attr('disabled', true);      
           $('#EquipCheckCode').textbox('setValue',row.CK_CD==null?'':row.CK_CD);
           $('#EquipCheckName').textbox('setValue',row.CK_NM==null?'':row.CK_NM);
          // $('#EquipCheckType').textbox('setValue',row.DICT_IT==null?'':row.DICT_IT);
           $('#EquipCheckType').textbox('setValue',row.DICT_IT_NM==null?'':row.DICT_IT_NM);
           $('#cmbCheckType').combobox('setValue',row.CK_TY==null?'':row.CK_TY);
           $('#cmbCheckType').combobox('setText',row.CK_TY_NM==null?'':row.CK_TY_NM);
           $('#EquipCheckSort').textbox('setValue',row.CK_SORT==null?'':row.CK_SORT);
           $('#EquipCheckNote').textbox('setValue',row.CUS_RM==null?'':row.CUS_RM);
             if (row.USE_YN == "Y") {
                 $('#'+pageConfig.EquipCheckUse).prop('checked', 'checked');
             } else {
                 $('#'+pageConfig.EquipCheckUse).prop('checked', '');
             }
            
             if (row.IS_UR == "Y") {
                 $('#'+pageConfig.EquipCheckUr).prop('checked', 'checked');
             } else {
                 $('#'+pageConfig.EquipCheckUr).prop('checked', '');
             }
         }
         checkFun();
      }
      getDataByCondition = function(){
        var dgrid=$('#'+pageConfig.gridName).datagrid('options');
        var EquipCheckName = $('#queryEquipCheckName').textbox('getValue');
        var reqData ={
            CK_NM: EquipCheckName,
            IFS:'H000114',
            pageIndex:1,
            pageSize:dgrid.pageSize
        }
        /*
		 * if(EquipCheckName==''){ $.messager.alert('提示','请输入选择条件'); }else{
		 */
          reqGridData('/iPlant_ajax','EquipCheck_tab',reqData)
        /* } */
      }
      deleteEquipCheck = function () {
           var isSelectedData = validSelectedData(pageConfig.gridName, 'Delete');
           if (!isSelectedData) {
               $.messager.alert('提示', '请选择一条数据进行删除');
               return;
           }
           var checkedItems = $('#' + pageConfig.gridName).datagrid('getSelections');
           var delCnt=0;
           var exceptionCode='';
           $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
               if(r==true){
                   $.each(checkedItems, function (index, item) {
                     delCnt++;
                     var ajaxParam = {
                         url: '/iPlant_ajax',
                         dataType: 'JSON',
                         data: {
                             CK_CD: item.CK_CD,
                             IFS:'H000117' 
                         },
                         async: false,
                        successCallBack:function(data){
                            if(delCnt==checkedItems.length){
	                            if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
	                              	$.messager.alert('提示', '删除成功!','',function(){
	                                	initGridData();
	                                });	
	                              	}else{
	                              	 	$.messager.alert('提示','删除失败,此数据正在使用!')
	                              	 	}
	                                     
	                            	}
                         		},
                         		errorCallBack:function(data){
                         			if(delCnt==checkedItems.length){
                         				$.messager.alert('提示','删除失败,服务器无响应!');
                         			}
                         		}
                     };
                     iplantAjaxRequest(ajaxParam);
                   });
               }
           });     
      }
      bindComboGridData=function(){
         var ajaxParam={
          url:'/iPlant_ajax',
          data:{
            IFS:'Y000111',
            DICT_CD: 'CEM01',
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
            $('#EquipCheckType').combobox({
                data:rowCollection,
                valueField:'DICT_IT_NM',
                textField:'DICT_IT_NM',
                panelWidth:200,
                panelHeight:200,
            });
            if(OptType == 1){
            	updateEquipCheck();
            }
            }
        }
        iplantAjaxRequest(ajaxParam);
      }
      bindCheckTypeData=function(){
          var ajaxParam={
           url:'/iPlant_ajax',
           data:{
             IFS:'D000008',
             DICT_CD: 'CKB02',
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
             $('#cmbCheckType').combobox({
                 data:rowCollection,
                 valueField:'DICT_IT',
                 textField:'DICT_IT_NM',
                 panelWidth:200,
                 panelHeight:200,
             });
           }
         }
         iplantAjaxRequest(ajaxParam);
       }
      checkedInputType =function(){
        var myEquipCheckSort =$('#EquipCheckSort').textbox('getValue');
        if(parseInt(myEquipCheckSort)>6||parseInt(myEquipCheckSort)<=0){
          $.messager.alert('提示','设备点检序号只可取1-6');
          $('#EquipCheckSort').textbox('setValue','');
          return
        }
      }
    }
    EquipCheck.prototype = {
        init: function () {
            $(function () {
            	$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
                initGridData();
                $('#btnAdd').click(function () {
                    addEquipCheck();
                    bindComboGridData();
                    bindCheckTypeData();
                });
                $('#btnUpdate').click(function () {
                    updateEquipCheck();
                    bindComboGridData();
                    bindCheckTypeData();
                });
                
				 $('.save').click(function () { saveEquipCheck(); });
				 
                $('.close').click(function () {
                   // setDataNull();\
                    $('#enditTab').dialog('close');
                    initGridData();
                });
                $('#btnDelete').click(function(){
                    deleteEquipCheck();
                });
                $('#btnSearch').click(function(){
                    $('#enditTab').dialog('close');
                    getDataByCondition();
                })
                $('#btnFreshen').click(function() {
                	getDataByCondition();
				});
                $("input",$("#EquipCheckSort").next("span")).blur(function(){ 
                  checkedInputType();
                })
                $("input",$('#EquipCheckCode').next("span")).keyup(function(){
                  checkInputLength('EquipCheckCode',20);
                })
                $('input',$('#EquipCheckName').next('span')).keyup(function(){
                  checkInputLength('EquipCheckName',300);  
                })
                $('input',$('#EquipCheckSort').next('span')).keyup(function(){
                  checkInputLength('EquipCheckSort',5);  
                })
                $('#EquipCheckNote').textbox('textbox').bind('keyup',function(){
                  checkInputLength("EquipCheckNote",500);
                })
              // 限制输入英文单引号
				$("input",$("#EquipCheckCode").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
				$("input",$("#EquipCheckName").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
				$("input",$("#EquipCheckSort").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
				$("input",$("#EquipCheckNote").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
            });
        }
    }
    var pCode = new EquipCheck();
    pCode.init();
})();