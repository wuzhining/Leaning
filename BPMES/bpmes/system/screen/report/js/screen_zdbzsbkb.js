
(function(){
	function csbkbInfo(){
		ccfunc = function (){
			/*工单*/
	       iplantAjaxRequest({
	           url: '/iPlant_ajax',
	           data: {
	               IFS: 'MES_R0003',
	               LINE_CD:lx,
	               REQ_TIME:dtime,
	               ET_CD:sbbm
	           },
	           successCallBack: function (data) {
	        	   if(data.RESPONSE[0].length != 0){
	        		   var rowCollection = createSourceObj(data);
	        		   if(rowCollection.length>0){
	        			   $("#txtgdh").text(rowCollection[0].MO_NO); 						/*工单号*/
		        		   $("#txtjhsl").text(rowCollection[0].PLAN_WO_QTY+"PCS"); 			/*计划数量*/
		        		   $("#txtbzcn").text(rowCollection[0].CAPA+"PCS/H"); 				/*标准产能*/
		        		   $("#txtsjcc").text(rowCollection[0].PROD_QTY+"PCS"); 			/*实际产出*/
		        		   $("#txtyxz").text(rowCollection[0].DICT_IT_NM);					/*设备状态*/
		        		   if(rowCollection[0].DICT_IT_NM=="正在生产" ){
		        			   $("#txtdqscsc").text(getZHsj(rowCollection[0].DEF_A));		/*当前生产时长*/
		        			   $("#txtdqtjsc").text(0);										/*当前停机时长*/
		        		   }else{
		        			   var str = getZHsj(rowCollection[0].DEF_A);
		        			   $("#txtdqscsc").text(0);										/*当前生产时长*/
		        			   $("#txtdqtjsc").text(str);									/*当前停机时长*/
		        		   }
		        		   $("#txtzcsc").text('0分钟');										/*转产时长*/
	        			   for(var i=0; i<rowCollection.length; i++ ){
	        				   //总 生产时长
	        				   if(rowCollection[i].DICT_IT_01=="RDI01.01"){
	        					   var str =getZHsj(rowCollection[i].TOT_TINGJI);
	        					   $("#txtzscsc").text(str);
	        				   }
	        				   //总停机时长
	        				   if(rowCollection[i].DICT_IT_01=="RDI01.04"){
	        					   var str =getZHsj(rowCollection[i].TOT_TINGJI);
	        					   $("#txtztjsc").text(str);
	        				   }
	        				   //总故障时长
	        				   if(rowCollection[i].DICT_IT_01=="RDI01.05"){
	        					   var str =getZHsj(rowCollection[i].TOT_TINGJI);
	        					   $("#txtpjwgzsc").text(str);
	        				   }
	        				   //转产
	        				   if(rowCollection[i].DICT_IT_01=="E"){
	        					   var str =getZHsj(rowCollection[i].TOT_TINGJI);
	        					   $("#txtzcsc").text(str);
	        				   }
	        			   }
	        		   }
	        	   }
	           }
	       });
	       /*设备产能*/
	       iplantAjaxRequest({
	           url: '/iPlant_ajax',
	           data: {
	               IFS: 'MES_R0028',
	               LINE_CD:lx,
	               REQ_TIME:dtime,
	               ET_CD:sbbm
	           },
	           successCallBack: function (data) {
	        	   var tm = [];
	        	   var Aarr = [];
	        	   if(data.RESPONSE[0].length != 0){
	        		   var rowCollection = createSourceObj(data);
	        		   if(rowCollection.length>0){
	        			   for(var i=0; i<rowCollection.length; i++){
	        				   tm.push(rowCollection[i].TM.substring(5,rowCollection[i].TM.length));
		        			   Aarr.push(parseInt(rowCollection[i].TODAY_QTY));
		        		   }
	        		   }else{
	        			   tm.push(0);
	        			   Aarr.push(0); 
	        		   }
	        		   
	        		   Highcharts.chart('container1', {
						    chart: {
						        type: 'column',
						        options3d: {
						            enabled: true,
						            alpha: 2,
						            beta: 3,
						            depth: 45
						        }
						    },
						    title: {
						        text: '<span style="color:#1771B3;font-size:14px">设备产能</span>'
						    },
						    plotOptions: {
	       			        column: {
	       			            depth: 25,
	       			         dataLabels:{
	                              enabled:true, // dataLabels设为true
	                              style:{
	                                  color:'#D7DEE9'
	                              }
	                          }
	       			        },
		       			     series: {
			       		            animation: {
			       		                duration: 5000,
			       		                easing: 'easeOutBounce'
			       		            }
			       			     }
	       			    },
						    xAxis: {
						    	categories: tm,
						    	min : 0,
						    	max: tm.length - 1
						    },
						    yAxis: {
						        title: {
						            text: null
						        },
						        min:0,
		       			        minRange: 1
						    },
						    series: [{
						        name: '<span style="color:#1771B3">完成数</span>',
						        data: Aarr
						    }],
						    credits: {
						          enabled:false
						},exporting: {
				            enabled:false
						}
						});	
	        	   }
	           }
	       });
	       
	       /* 异常信息*/
	       iplantAjaxRequest({
	           url: '/iPlant_ajax',
	           data: {
	               IFS: 'MES_R0096',
	               ET_CD:sbbm
	           },
	           successCallBack: function (data) {
	        	   if(data.RESPONSE[0].RESPONSE_DATA.length >0){
	        		   $("#abnormalInfo_title").css('display','block');
	        		   var abnormalInfo = data.RESPONSE[0].RESPONSE_DATA[0].EXPCE_NM;
	        	   	   $('#abnormalInfo').html(abnormalInfo);
	        	   }else{
	        		   $("#abnormalInfo_title").css('display','none');
	        		   $('#abnormalInfo').html('');
	        	   };
	           	}
	        });
	       /* 异常信息		END*/
	       
	       /*机器状态*/
	       iplantAjaxRequest({
	           url: '/iPlant_ajax',
	           data: {
	               IFS: 'MES_R0005',
	               LINE_CD:lx,
	               REQ_TIME:dtime,
	               ET_CD:sbbm
	           },
	           successCallBack: function (data) {
	        	   var tm = [];
	        	   var keys = [];
	        	   var Aarr = new Array();
	        	   var Barr = new Array();
	        	   var Carr = new Array();
	        	   if(data.RESPONSE[0].length != 0){
	        		   var rowCollection = createSourceObj(data);
	        		   for(var o in cctm){
	        			   keys.push(o);
	        		   }
	        		   $.each(rowCollection,function(b,op){
	        			   tm.push(op.TM);
	        		   });
	        		   $.each(keys,function(k,objs){
	        			   if($.inArray(objs,tm)<0){
        					   Aarr.push('');
        					   Barr.push('');
        					   Carr.push('');
        				   }else{
        					   for(var i=0; i<rowCollection.length; i++){
		        				   if(objs == rowCollection[i].TM){
		        					   if(rowCollection[i].DICT_IT_01=='RDI01.01'){
				        				   Aarr.push(parseInt(rowCollection[i].RATE.split('%')[0]));
				        			   }
				        			   if(rowCollection[i].DICT_IT_01=='RDI01.04'){
				        				   Barr.push(parseInt(rowCollection[i].RATE.split('%')[0]));
				        			   }
				        			   if(rowCollection[i].DICT_IT_01=='RDI01.05'){
				        				   Carr.push(parseInt(rowCollection[i].RATE.split('%')[0]));
				        			   }
		        				   }
		        			   };
		        			   var index = keys.indexOf(objs)+1;
		        			   if(Aarr.length < index){
		        				   var num_A = index - Aarr.length;
		        				   for(var a=0;a<num_A;a++){
		        					   Aarr.push('');
		        				   }
		        			   };
		        			   if(Barr.length < index){
		        				   var num_B = index - Barr.length;
		        				   for(var b=0;b<num_B;b++){
		        					   Barr.push('');
		        				   }
		        			   };
		        			   if(Carr.length < index){
		        				   var num_C = index - Carr.length;
		        				   for(var c=0;c<num_C;c++){
		        					   Carr.push('');
		        				   }
		        			   };
        				   }
	        		   });
	        		   Highcharts.chart('container2', {
	       			    chart: {
	       			        type: 'column',
	       			        options3d: {
	       			            enabled: true,
	       			            alpha: 5,
	       			            beta: 5,
	       			            viewDistance: 25,
	       			            depth: 50
	       			        }
	       			    },

	       			    title: {
	       			        text: '<span style="color:#1771B3;font-size:14px">机器状态示意图（'+'白班'+'）</span>'
	       			    },

	       			    xAxis: {
	       			    	categories: ['08-10', '10-12', '12-14', '14-16', '16-18','18-20'],
	       			        min : 0,
					    	max: 5
	       			    },

	       			    yAxis: {
	       			        allowDecimals: false,
	       			        min: 0,
	       			        max:100,
	       			        title: {
	       			            text: null
	       			        },
	       		            labels:{
	       		                formatter:function() {//在labels里可以配置formatter属性可以对y轴设置单位之类的个性化东西
	       		                    return this.value+'%';//可以对照上面图表 +"L"
	       		                }
	       		            }
	       			    },
	       			 plotOptions: {
	       			        column: {
	       			            stacking: 'normal',
	       			            depth: 40
	       			        },
		       			     series: {
			       		            animation: {
			       		                duration: 5000,
			       		                easing: 'easeOutBounce'
			       		            }
			       			     }
	       			    },

	       			 series: [{
	       			        name: '<span style="color:#1771B3">待机空闲</span>',
	       			        data: Barr,//[3, 4, 4, 2, 5],
	       			        stack: 'male',
	       			        color: '#2B908F'
	       			    },{
	       			    	name: '<span style="color:#1771B3">故障</span>',
	       			        data: Carr,//[2, 5, 6, 2, 1],
	       			        stack: 'male',
	       			        color: '#F45B5B'
	       			    }, {
	       			    	name: '<span style="color:#1771B3">生产</span>',
	       			        data: Aarr,//[5, 3, 4, 7, 2],
	       			        stack: 'male',
	       			        color: '#90EE7E'
	       			    }],
	       			    credits: {
	       			          enabled:false
	       			},exporting: {
	       	            enabled:false
	       			}
	       			});
	        	   }
	           }
	       });
	       iplantAjaxRequest({
	           url: '/iPlant_ajax',
	           data: {
	               IFS: 'MES_R0006',
	               REQ_TIME:dtime,
	               LINE_CD:lx,
	               ET_CD:sbbm
	           },
	           successCallBack: function (data) {
	        	   var keys = [];
	        	   var tm = [];
	        	   var Aarr = [];
	        	   var Barr = [];
	        	   var Carr = [];
	        	   var Darr = [];
	        	   if(data.RESPONSE[0].length != 0){
	        		   var rowCollection = createSourceObj(data);
	        		   for(var o in cctm){
	        			   keys.push(o);
	        		   }
	        		   $.each(rowCollection,function(b,op){
	        			   tm.push(op.TM);
	        		   });
	        		   $.each(keys,function(k,objs){
	        			   for(var i=0; i<rowCollection.length; i++){
	        				   if($.inArray(objs,tm)<0){
	        					   Aarr.push('');
	        					   Barr.push('');
	        					   Carr.push('');
	        					   Darr.push('');
	        					   return
	        				   }
	        				   if(objs == rowCollection[i].TM){
	        					   Aarr.push(parseInt(rowCollection[i].RUN_RATE.split('%')[0]));
			        			   Barr.push(parseInt(rowCollection[i].GRAN_RATE.split('%')[0]));
			        			   Carr.push(parseInt(rowCollection[i].RTY.split('%')[0]));
			        			   Darr.push(parseInt(rowCollection[i].OEE.split('%')[0]));
	        				   }
	        			   }
	        		   });
	        		   

	       			Highcharts.chart('container3', {
	       			    chart: {
	       			        type: 'column'
	       			    },
	       			    title: {
	       			        text: '<span style="color:#1771B3;font-size:14px">设备综合状况（'+'白班'+'）</span>'
	       			    },
	       			    xAxis: {
	       			        crosshair: true,
	       			        categories: ['08-10', '10-12', '12-14', '14-16', '16-18','18-20'],
	       			        min : 0,
					    	max: 5
	       			    },
	       			 yAxis: {
	       			        min: 0,
	       			        max:100,
	       			        title: {
	       			            text: null
	       			        },
		       			     labels:{
		       		                formatter:function() {//在labels里可以配置formatter属性可以对y轴设置单位之类的个性化东西
		       		                    return this.value+'%';//可以对照上面图表 +"L"
		       		                }
		       		            }
	       			    },
	       			    tooltip: {
	       			        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	       			        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	       			            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
	       			        footerFormat: '</table>',
	       			        shared: true,
	       			        useHTML: true
	       			    },
	       			 plotOptions: {
	       			        column: {
	       			            pointPadding: 0.2,
	       			            borderWidth: 0
	       			        },
	       			     series: {
		       		            animation: {
		       		                duration: 5000,
		       		                easing: 'easeOutBounce'
		       		            }
		       			     }
	       			    },
	       			    series: [{
	       			        name: '<span style="color:#1771B3">运动稼动率</span>',
	       			        data: Aarr

	       			    }, {
	       			        name: '<span style="color:#1771B3">性能稼动率</span>',
	       			        data:Barr

	       			    }, {
	       			        name: '<span style="color:#1771B3">直通率</span>',
	       			        data: Carr

	       			    }, {
	       			        name: '<span style="color:#1771B3">OEE</span>',
	       			        data:Darr

	       			    }],
	       			    credits: {
	       			          enabled:false
	       			},exporting: {
	       	            enabled:false
	       			}
	       			});
	        	   }
	           }
	       });
		}
	}
		csbkbInfo.prototype={
				init: function () {
					
						$(function () {
							iplantAjaxRequest({
						           url: '/iPlant_ajax',
						           data: {
						               IFS: 'S0000021',
						           },
						           async: false,
						           successCallBack: function (data) {
						        	   if(data.RESPONSE[0].RESPONSE_DATA.length>0){
						        		   oldTime = data.RESPONSE[0].RESPONSE_DATA[0].SYS_TIME;
						        		   var year = parseInt(oldTime.slice(0,4));
							        		 //判断小于10，前面补0
							       			if (year < 10) {
							       				year = "0" + year;
							       			}
							       			
						        		   var month = parseInt(oldTime.slice(5,7));
							        		 //判断小于10，前面补0
							       			if (month < 10) {
							       				month = "0" + month;
							       			}
							       			
						        		   var day = parseInt(oldTime.slice(8,10));
							        		 //判断小于10，前面补0
							       			if (day < 10) {
							       				day = "0" + day;
							       			}
						        		   
						        		   var hours = parseInt(oldTime.slice(11,13));
							        		if (hours < 10) {
							       				hours = "0" + hours;
							       			}
							        		
						        		  var minutes = parseInt(oldTime.slice(14,16));
							        		//判断小于10，前面补0
							      			if (minutes < 10) {
							      				minutes = "0" + minutes;
							      			}
							      			
						        		   var seconds = parseInt(oldTime.slice(17));
							        		 //判断小于10，前面补0
							       			if (seconds < 10) {
							       				seconds = "0" + seconds;
							       			}
							       			
							       			var date_str ="";
							    			if(parseInt(hours)>=8 && parseInt(hours)<20){
							    				dtime = year + "-" + month + "-" + day + " " + "08" + ":" + "00" ;
							    			}else{
							    				if(parseInt(hours)<8){
							    					var year1 = parseInt(oldTime.slice(0,4));
							    					//判断小于10，前面补0
							    					if (year1 < 10) {
							    						year1 = "0" + year;
							    					}
							    			
							    					//月
							    					var month1 = parseInt(oldTime.slice(5,7));
							    					//判断小于10，前面补0
							    					if (month1 < 10) {
							    						month1 = "0" + month1;
							    					}
							    			
							    					//日
							    					var day1 = parseInt(oldTime.slice(8,10))-1;
							    					//判断小于10，前面补0
							    					if (day1 < 10) {
							    						day1 = "0" + day1;
							    					}
							    					//拼接年月日时分秒
							    					dtime = year1 + "-" + month1 + "-" + day1 + " " + "20" + ":" + "00" ;
							    				}else{
							    					//拼接年月日时分秒
							    					dtime = year + "-" + month + "-" + day + " " + "20" + ":" + "00" ;
							    				}
							    			}
						        	   }
						           }
						       });
							lx = getQueryString("line");
							sbbm = getQueryString("shebei");
							ccfunc();
							var t=setInterval(function  () {
								ccfunc();
							},30000);
							
						});						  							
					}
				}
				
		var csbkb = new csbkbInfo();
		var ccINdext = 0;
		var sbbm = "";
		var lx ="";
		var cctm  = {A:'08-10', B:'10-12', C:'12-14', D:'14-16', E:'16-18',F:'18-20'};
		var dtime  = "";
		csbkb.init();
})();
