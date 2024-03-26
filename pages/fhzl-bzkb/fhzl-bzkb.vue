<template>
	<view class="container-fluid setfull">
		 <dv-full-screen-container>
			<view class="row align-items-center" style="background-color: #1890FF;color: #ffffff;" v-if="isToastShow == 'noToast'">
				<view class="col row align-items-center align-self-center">
					<image :src="LOGO" mode="aspectFit" style="width: 100px;height: 50px;margin-left: 5%;"></image>
					<text style="margin-left:10%;font-size: .2rem;line-height: 2.5;" v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</text>
			
				</view>
				<view class="col-4 pageTitle row justify-content-center" style="font-size: .4rem;text-align: center;">
					<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
					<!-- <text style="margin: 0 5%;">销售看板</text> -->
				</view>
				<view class="col titltTime row align-items-center">
					<view class="col-6" style="width: 100%;">
						<!-- <dv-border-box-2 style="width:100%;height:50px;" v-show="titleObj.FSYSTEM == '' ? false : true">{{ titleObj.FSYSTEM }}</dv-border-box-2> -->
					</view>
					<view class="col-6">
						<text style="display: block;text-align: center;">{{ nowDay }}</text>
						<text style="display: block;text-align: center;">{{ nowTime }}</text>
					</view>
				</view>
			</view>
			<!-- 有消息的样式 -->
			<view class="row align-items-center" style="background-color: #000000;color: #ffffff;" v-else>
				<view class="col-2 row align-items-center align-self-center justify-content-around">
					<image :src="LOGO" mode="scaleToFill" style="width: 65px;height: 65px;margin-left: 5%;"></image>
				</view> 
				<view class="col-3 pageTitle row justify-content-center" style="font-size: .5rem;text-align: center;">
						<!-- <dv-decoration-8 style="width:70px;height:50px;" /> -->
						<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
						<!-- <dv-decoration-8 :reverse="true" style="width:70px;height:50px;" /> -->
				</view>
				<view class="col titltTime row align-items-center">
					<u-notice-bar class="toastTitle" mode="horizontal" :volume-icon="false" :volume-size="20" :speed="25" :font-size="20" :padding="0" type='none'
						:is-circular="true" :list="newtoaList" bg-color='#000000' color='#ffffff'></u-notice-bar>
				</view>
			</view> 
			<!-- 表格内容区 -->
			<view class="row" style="overflow: hidden;height: 63%;">
				<view class="col-10"  style="width: 100%;overflow: hidden;height: 100%;">
					<dv-scroll-board :config="listtable" />
				</view>	
				<!-- <view class="col-9"  style="width: 100%;overflow: hidden;height: 6%;">
						<u-table style="width: 100%;" bg-color="transparent" color="#FFFFFF" border-color="#052D84"
									:th-style="thStyle">
							 <u-tr>
								 <u-th width="20%" class="charttitle">
									 订单号
								 </u-th>
								 <u-th width="20%" class="charttitle">
									 品名
								 </u-th>
								 <u-th width="25%" class="charttitle">
								 	图号
								 </u-th>
								 <u-th class="charttitle">
									工单数量
								 </u-th>
								 <u-th class="charttitle">
									 完工数
								 </u-th>
								 <u-th class="charttitle">
									 进度%
								 </u-th>
								 <u-th class="charttitle">
								 	交期
								 </u-th>
							 </u-tr>
						</u-table>
				</view> -->
					<!-- <view class="col-9" style="width: 100%;overflow: hidden;height: 96%;">
						<view class="" :animation="GDanimate">
							<u-table class="scrollList" style="width: 100%;overflow: hidden;" bg-color="transparent" color="#FFFFFF" border-color="#052D84">
								 <u-tr v-for="(item,index) in DayPZJKoption.data" :key="item.FID" class="GdTrHeight" :style="{backgroundColor: showBG === index ? 'blue':'inherit'}">
									 <u-td width="20%" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size: .17rem;">
										 {{ item.FCO }}
									 </u-td>
									 <u-td width="20%"  style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size: .2rem;">
										 {{ item.FPRD_NAME }}
									 </u-td>
									 <u-td width="25%" class="charttitle">
										 {{ item.FDRAWINGNO }}
									 </u-td>
									 <u-td class="charttitle">
										 {{ item.NEED_QTY }}
									 </u-td>
									 <u-td class="charttitle">
										 {{ item.FN_QTY }}
									 </u-td>
									 <u-td class="charttitle">
										 {{ item.PROGRESS + '%' }}
									 </u-td>
									 <u-td class="charttitle">
										 {{ item.FDELIVERY_DATE }}
									 </u-td>
								 </u-tr>	
							</u-table>
						</view>
					</view> -->
				
				<!-- <view class="col row no-gutters charttitle" style="font-size: .3rem;text-align: center;height: 100%;">
					<view class="col-12 no-gutters">
						<text style="color: #FFFFFF;font-size: .2rem;">入库总数：{{ zrks }}</text>
						<text style="color: #FFFFFF;font-size: .2rem;margin-left: .3rem;">产品种类：{{ rkzl }}</text>
					</view>
					<view class="col-12" style="height: 46%;">
						<view class="left_right" id="barChart" >
							<u-empty text="暂无数据" mode="data" :icon-size="40" :font-size="14" v-show="isRKshow" ></u-empty>
						</view>
					</view>
					<view class="col-12 no-gutters">
						<text style="color: #FFFFFF;font-size: .2rem;">出库总数：{{ zcks }}</text>
						<text style="color: #FFFFFF;font-size: .2rem;margin-left: .3rem;">产品种类：{{ ckzl }}</text>
					</view>
					<view class="col-12" style="height: 46%;">
						<view class="left_right" id="CKChart" >
							<u-empty text="暂无数据" mode="data" :icon-size="40" :font-size="14" v-show="isCKshow" ></u-empty>
						</view>
					</view>
				</view> -->
			</view>
				
			<!-- <view class="row addpadding no-gutters"  style="height: 29%;">
				<view class="col-10 dele-padding" style="height: 100%;">
					<view style="width: 100%;text-align: center;font-size: .3rem;color:#FFFFFF">
						每日出入库趋势图
					</view>
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts yddiv" @touchstart="touchLineA"></canvas>
				</view>
				<view class="col row no-gutters charttitle" style="font-size: .3rem;text-align: center;height: 100%;">
					<view class="col-12 no-gutters">
						<text style="color: #FFFFFF;font-size: .2rem;">合格率</text>
					</view>
					<view class="col-12" style="height: 90%;">
						<view style="height: 100%;width: 100%;" id="hglChart">
							<u-empty text="暂无数据" mode="data" :icon-size="40" :font-size="14" v-show="ishglshow"></u-empty>
						</view>
					</view>
				</view>
			</view> -->
			</dv-full-screen-container>
	</view>
</template>
<script>
	import uCharts from '@/components/u-charts/u-charts.js'; //引入ucharts图表组件
	// import EZUIPlayer from '../../static/js/EZUIKit-JavaScript-npm/ezuikit.js'
	import globalData from '../../util/golbalData.js'; 
	
	var _self = null;
	var timer = null ; //创建一个定时器
	var getINFOtimer = null; 
	var canvaLineA = null;
	var canvaPie = null;
	var canvaRing = null;
	export default {
		data() {
			return {
				thStyle:{'backgroundColor':'transparent',color:"#ffffff",fontSize:'24px'},
				DayPZJKoption: {
					data:[
					]
				},
				DayBLYYFXoption:{
				},
				Monthoption:{
				},
				animationData:{},  //工序的动画对象
				GDanimate:{},		//	工单的动画对象
				animation: null,	 //工序的动画
				GDanimation: null,  //	工单的动画
				isTop0: 0,
				ListLength:0,
				titleObj:{},
				LOGO:"",
				nowTime:"",
				nowDay:"",
				GxTrHeight:0,   //工序列表每行高度
				GdTrHeight:0,		//工单列表每行高度
				tableHeight:0,   //工单表格总高度
				GXtableHeight: 0, //工序表格总高度
				showBG: 0,
				GXList: []  ,//工序列表
				gdTop:0,
				zhlplData:"",
				zhlplDiv:""  ,//综合良品率宽高
				blyyDiv:"",
				RingSize:"",
				ydDIV: "",
				toastList: [] ,// 消息列表
				toastString:"", //消息字符串
				isToastShow: 'noToast',
				isfirst: true,
				chartFontSize:"",
				listtable:{},
				crkObj:{}, //出入库对象
				isRKshow: false, //入库图表没有时，显示无数据
				zrks: 0, //入库总量
				rkzl: 0, //入库种类数量
				zcks: 0, //总出库数
				ckzl:0, //出库种类
				isCKshow: false,
				ishglshow: false,
			}
		},
		computed:{
			newtoaList(){
				let arr = [];
				let str = "";
				this.toastList.forEach((ele, index)=>{
					str += (index+1) +'、' +ele.NOTICE_TITLE;
				});
				arr.push(str);
				if(arr.length > 0){
					this.isToastShow = 'yesToast';
				}else{
					this.isToastShow = 'noToast';
				}
				return arr;
			}
		},
		onLoad(option) {
			_self = this;
			//获取设备信息
			const res = uni.getSystemInfoSync();
			 this.sb = res.windowWidth;
			 
			//从路径中获取看板标题等信息
			const item = JSON.parse(decodeURIComponent(option.ele));
			this.titleObj = item;
			try{
				this.LOGO =this.basePath +  item.FLOGO.split('*')[0];
			}catch(e){
				//TODO handle the exception
				this.LOGO = "";
			}
			
			setInterval(()=>{
				 var time = new Date();
				 var month = time.getMonth() + 1;
				 var hours = time.getHours();
				 var seconds = time.getSeconds();
				 var minutes =time.getMinutes();
				 //判断是否在前面加0
				function getNow(s) {
					return s < 10 ? '0' + s: s;
				}
				this.nowDay = time.getFullYear() + '年' + month + '月' + time.getDate() + '日';
				this.nowTime = getNow(hours)+':'+getNow(minutes)+":"+getNow(seconds);
			},1000);
			this.getInfo();
			this.getToast();
			
			// this.DayPZJKoption.data = this.DayPZJKoption.data.concat(this.DayPZJKoption.data.slice(0,10));
		},
		onHide() {
			clearInterval(timer);
			clearInterval(getINFOtimer);
		},
		created() {  
			getINFOtimer = setInterval(()=>{
				this.getInfo();
				this.getToast();
			},(this.titleObj.FREFTIME * 1000 || 30000));
		},
		mounted() {
			// 创建直播推流控件
			// console.log(EZUIPlayer)
			//  var player = new EZUIPlayer.EZUIKitPlayer('myPlayer');
		},
		methods: {
			// 数据请求后,需要手动刷新
			updateHandler (config) {
			  _self[config] = { ..._self[config] }
			},
			getHGL() {
				uni.request({
					url: this.basePath + '/APP/kanban!curMonthPassRate.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							let bhg = 100 - res.data.Data[0].PASSERATE;
							let data = [{
									value: 100,
									name: '合格'
								},
								{
									value: 0,
									name: '不合格'
								},
							]
							this.drawHGL('hglChart', data);
						} else {
							this.ishglshow = true;
						}
					},
				});
			},
			drawHGL(dom, chartData) {
				let hglDom = this.$echarts.init(document.getElementById(dom));
				let option = {
					legend: {
						orient: 'vertical',
						 x: '30%',  //图例距离左的距离
						  y: '80%',  //图例上下居中
						data: ['合格',''],
						formatter: function (name) {
						    return `${name}:${chartData[0].value}%`;
						},
						 textStyle: {
						      color: "#ffffff"
						    }
					},
					series: [{
						name: '合格率',
						type: 'pie',
						radius: '70%',
						 center: ['50%', '40%'],
						data: chartData,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						},
						 itemStyle : {
							normal : {
								label : {
									show : false   //隐藏标示文字
								},
								labelLine : {
									show : false   //隐藏标示线
								}
							}
						}
					}]
				};
				hglDom.setOption(option);
			},
			rkcharts(dom, chartData){
				console.log(chartData);
				if(chartData.length == 0){
					this.isRKshow = true;
				}else{
					var barChart = this.$echarts.init(document.getElementById(dom));
					this.isRKshow = false;
					//处理数据
					let xAxis = []; 	//横坐标数组
					let yAxis = [];		//纵坐标数组
					this.zrks = 0;
					this.rkzl = chartData.length;
					chartData.forEach((ele, index) =>{
						if(index < 6){
							//图表内只显示6个数据
							xAxis.push(ele.PRD_NAME.slice(0,4));
							yAxis.push(ele.TRAN_QTY);
						}
						this.zrks += ele.TRAN_QTY;
					});
					
					var option = {
							 grid: {
							        x: 55,
									x2: 10,
									y: 5,
									y2: 25
							    },
							    xAxis: {
							        type: 'value',
							        // boundaryGap: [0, 0.01],
									axisLabel : {
										formatter: '{value}',
										textStyle: {
											color: '#fff'
										}
									}
							    },
							    yAxis: {
							        type: 'category',
							        data: xAxis,
									axisLabel : {
										textStyle: {
											color: '#fff',
											fontSize: 10,
										},
									},
									"splitLine": {
									          "show": false
									        }
								},
							    series: [{
							            name: '入库数量',
							            type: 'bar',
							            data: yAxis,
										barWidth : 20,//柱图宽度
										itemStyle: {
											normal: {
											   label: {
												   show: true,		//开启显示
												   position: 'right',	//在右侧显示
												   textStyle: {	    //数值样式
													   color: '#ffffff',
													   fontSize: 12
												   }
											   }
											}
									   }
							        }]
							        
						};
					barChart.setOption(option);
				}
				
			},
			ckcharts(dom, chartData){
				
				console.log(chartData);
				if(chartData.length == 0){
					this.isCKshow = true;
				}else{
					var barChart = this.$echarts.init(document.getElementById(dom));
					this.isCKshow = false;
					//处理数据
					let xAxis = []; 	//横坐标数组
					let yAxis = [];		//纵坐标数组
					this.zcks = 0;
					this.ckzl = chartData.length;
					chartData.forEach((ele, index) =>{
						if(index < 6){
							//图表内只显示6个数据
							xAxis.push(ele.PRD_NAME.slice(0,4));
							yAxis.push(ele.TRAN_QTY);
						}
						this.zcks += ele.TRAN_QTY;
					});
					
					var option = {
							 grid: {
							        x: 55,
									x2: 10,
									y: 5,
									y2: 25
							    },
							    xAxis: {
							        type: 'value',
							        // boundaryGap: [0, 0.01],
									axisLabel : {
										formatter: '{value}',
										textStyle: {
											color: '#fff'
										}
									}
							    },
							    yAxis: {
							        type: 'category',
							        data: xAxis,
									axisLabel : {
										textStyle: {
											color: '#fff',
											fontSize: 10,
										},
									},
									"splitLine": {
									          "show": false
									        }
								},
							    series: [{
							            name: '入库数量',
							            type: 'bar',
							            data: yAxis,
										itemStyle: {
											normal: {
											   label: {
												   show: true,		//开启显示
												   position: 'right',	//在右侧显示
												   textStyle: {	    //数值样式
													   color: '#ffffff',
													   fontSize: 12
												   }
											   }
											}
									   }
							        }]
							        
						};
					barChart.setOption(option);
				}
				
			},
			//获取顶部滚动消息
			getToast(){
				uni.request({
					url: this.basePath +'/APP/aBN!getNotice.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						cjcode: uni.getStorageSync('UserInfo').DEPTCODE,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success:(res)=>{
						if(res.data.IsSuccess){
							if(_self.newtoaList[0] == ""){
								_self.toastList = res.data.Data;
							}else{
								_self.newtoaList.forEach((ele, i)=>{
									if(ele != _self.toastList[i].NOTICE_TITLE){
										_self.toastList = res.data.Data;
										return;
									}	
								});
							}
						}else{
							this.isToastShow = 'noToast';
						}
					},
				});
			},
			getInfo(){
				clearInterval(timer);
				this.getGD(); //获取工单监控
				this.getMonFX();//获取月计划分析
				this.getCRK(); //获取当天出入库数量
				this.getHGL(); //获取合格率
			},
			getCRK(){
				//获取入库数据
				uni.request({
					url: this.basePath + '/APP/kanban!curDayBein.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.rkcharts('barChart', res.data.Data);
						} else {
							this.rkcharts('barChart', []);
						}
					},
				});
				
				//获取出库数据
				uni.request({
					url: this.basePath + '/APP/kanban!curDayBeout.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.ckcharts('CKChart', res.data.Data);
						} else {
							this.ckcharts('CKChart', []);
						}
					},
				});
			},
			// //工单列表运动函数
			// setGDAnimation(detaY, time){
			//   const animation = uni.createAnimation({
			//   	duration: time,
			//   	timingFunction: 'ease',
			//    })
			//   this.GDanimation = animation
			//   _self.GDanimation.translateY(detaY).step();  
			//   _self.GDanimate = _self.GDanimation.export(); 
			// },
			// //工序列表运动函数
			// setAnimation(detaY, time){
			//   const animation = uni.createAnimation({
			//   	duration: time,
			//   	timingFunction: 'ease',
			//    })
			//   this.animation = animation
			//   _self.animation.translateY(detaY).step();  
			//   _self.animationData = _self.animation.export(); 
			// },
			// //渲染综合良品圆环
			// showRing(canvasId,chartData){
			// 	setTimeout(()=>{
			// 		if(this.GxTrHeight == "" && this.GXList.length > 0){
			// 			//工序单元格高度
			// 			let menuItem = uni.createSelectorQuery().in(this).select(".GxTrHeight");
			// 			menuItem.fields({  
			// 				size: true,  
			// 				scrollOffset: true  
			// 			}, data => {  
			// 				this.GxTrHeight = data.height; 
			// 			}).exec(); 
			// 		}
			// 		let zhDIV = uni.createSelectorQuery().in(this).select(".zhlplDiv");
			// 		zhDIV.fields({  
			// 			size: true,  
			// 			scrollOffset: true  
			// 		}, data => {  
			// 			this.zhlplDiv = {height:data.height, width:data.width};
			// 			const currentWidth = screen.width;
			// 			if(currentWidth >= 1920){
			// 				this.RingSize = 40;
			// 			}else if(currentWidth >= 1280){
			// 				this.RingSize = 20;
			// 			}
			// 			canvaRing=new uCharts({
			// 				$this:_self,
			// 				canvasId: canvasId,
			// 				type: 'ring',
			// 				fontSize:11,
			// 				legend:{show:false,fontColor:'#FFFFFF',float:'right',position:'right',lineHeight:18},
			// 				title: {
			// 					name: _self.zhlplData[0].YieldRate + '%',
			// 					color: '#ffffff',
			// 					fontSize: 20,
			// 					offsetY:0,
			// 				},
			// 				subtitle: {
			// 					name: '良品率',
			// 					color: '#ffffff',
			// 					fontSize: 15,
			// 					offsetY:0,
			// 				},
			// 				extra: {
			// 					pie: {
			// 					  offsetAngle: -45,
			// 					  ringWidth: _self.RingSize,
			// 					  labelWidth:15
			// 					}
			// 				},
			// 				background:'#000000',
			// 				pixelRatio:1,
			// 				series: chartData.series,
			// 				animation: true,
			// 				width: _self.zhlplDiv.width,
			// 				height: _self.zhlplDiv.height,
			// 				disablePieStroke: true,
			// 				dataLabel: false,
			// 			});
			// 		}).exec(); 
			// 	},300);
			// },
			// //渲染饼图
			// showPie(canvasId,chartData){
			// 	setTimeout(()=>{
			// 		let blyyDiv = uni.createSelectorQuery().in(this).select(".blyyDiv");
			// 		blyyDiv.fields({  
			// 			size: true,  
			// 			scrollOffset: true  
			// 		}, data => {  
			// 			this.blyyDiv = {height:data.height, width:data.width};
			// 			canvaPie=new uCharts({
			// 				$this:_self,
			// 				canvasId: canvasId,
			// 				// padding:[0,0,0,40],
			// 				type: 'pie',
			// 				fontSize:11,
			// 				legend:{show:true,fontColor:'#FFFFFF',float:'right',position:'right',lineHeight:18},
			// 				background:'#FFFFFF',
			// 				pixelRatio:1,
			// 				series: chartData.series,
			// 				animation: true,
			// 				width: _self.blyyDiv.width,
			// 				height: _self.blyyDiv.height,
			// 				dataLabel: false,
			// 				extra: {
			// 					pie: {
			// 					  lableWidth:15,
			// 					  offsetAngle: -45,
			// 					},
								 
			// 				},
			// 			});
			// 			}).exec(); 
			// 	},300);
				
			// },
			// touchPie(e){
			// 	canvaPie.showToolTip(e, {
			// 		format: function (item) {
			// 			return item.name + ':' + item.data 
			// 		}
			// 	});
			// },
			// //渲染折线图
			showLineA(canvasId,chartData){
				if(_self.ydDIV.height){
					canvaLineA=new uCharts({
						$this:_self,
						canvasId: canvasId,
						type: 'line',
						fontSize:11,
						legend:{show:true,fontColor:'#ffffff'},
						dataLabel:false,
						dataPointShape:true,
						background:'#FFFFFF',
						pixelRatio:1,
						categories: chartData.categories,
						series: chartData.series,
						animation: true,
						xAxis: {
							type:'grid',
							gridColor:'#ffffff',
							gridType:'dash',
							dashLength:8,
							fontColor: '#ffffff',
							disableGrid: true
						},
						yAxis: {
							gridType:'solid',
							gridColor:'#cccccc',
							splitNumber:5,
							data:[
								{
									fontColor:'#FFFFFF',
									disabled:false,	
								}
							],
								
							// min:10,
							// max:180,
							// format:(val)=>{return val.toFixed(0)+'元'}
						},
						width: _self.ydDIV.width,
						height:  _self.ydDIV.height,
						extra: {
							line:{
								type: 'straight'
							}
						}
					});
				}else{
					setTimeout(()=>{
						let ydDIV = uni.createSelectorQuery().in(this).select(".yddiv");
						ydDIV.fields({  
							size: true,  
							scrollOffset: true  
						}, data => {  
							_self.ydDIV = {height: data.height, width:data.width};
								canvaLineA=new uCharts({
									$this:_self,
									canvasId: canvasId,
									type: 'line',
									fontSize:11,
									legend:{show:true,fontColor:'#ffffff'},
									dataLabel:false,
									dataPointShape:true,
									background:'#FFFFFF',
									pixelRatio:1,
									categories: chartData.categories,
									series: chartData.series,
									animation: true,
									xAxis: {
										type:'grid',
										gridColor:'#ffffff',
										gridType:'dash',
										dashLength:8,
										fontColor: '#ffffff',
										disableGrid: true
									},
									yAxis: {
										gridType:'solid',
										gridColor:'#cccccc',
										splitNumber:5,
										data:[
											{
												fontColor:'#FFFFFF',
												disabled:false,	
											}
										],
											
										// min:10,
										// max:180,
										// format:(val)=>{return val.toFixed(0)+'元'}
									},
									width: _self.ydDIV.width,
									height:  _self.ydDIV.height,
									extra: {
										line:{
											type: 'straight'
										}
									}
								});
							}).exec(); 
					},300);
				}
				
			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			//获取工单生产进度列表
			async getGD() {
				const res = await this.$myRequest({
					url: '/APP/kanban!progressWoTrack.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						dataperm:this.titleObj.FDATAPERMCODE,
						fwscode: this.titleObj.FWSCODE,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
					},
				});
				if (res.data.IsSuccess) {
					this.DayPZJKoption.data = [];
					this.DayPZJKoption.data = res.data.Data;
					let newArray = [];
					res.data.Data.forEach((ele, index) => {
						let temp = [];
						const yjdate =  ele.PACKAGE_DATE.split('-');
						ele.PACKAGE_DATE = `${yjdate[1]}-${yjdate[2]}`;
						const jqdate =  ele.FDELIVERY_DATE.split('-');
						ele.FDELIVERY_DATE = `${jqdate[1]}-${jqdate[2]}`;
						if(ele.SHIP_DATE){
							const fhdate =  ele.SHIP_DATE.split('-');
							ele.SHIP_DATE = `${fhdate[1]}-${fhdate[2]}`;
						}
						
						temp.push(ele.FCO, ele.FPRD_NAME, ele.FDRAWINGNO, ele.NEED_QTY, ele.FN_QTY, ele.PROGRESS, ele.PACKAGE_DATE, ele.FDELIVERY_DATE, ele.SHIP_DATE, ele.SHIP_QTY);
						newArray.push(temp);
					});
					this.listtable = {
						header: ['订单号','品名', '图号','工单数量','完工数', '进度%','预计包装', '交期', '实际发货', '发货数量'],
						data: newArray,
						index: false,
						columnWidth: [100,150,200],
						align: ['center','center','center','center','center','center','center','center','center','center'],
						rowNum: 15,
						headerBGC: '#1D395F',
						headerHeight: 35,
						oddRowBGC: 'rgba(10, 29, 50, 0.8)',
						evenRowBGC: 'rgba(10, 29, 50, 0.8)',
						waitTime: 5000
					}
				} else {
				
				}
			},
			//综合良品
			//  getGood() {
			// 	uni.request({
			// 		url: this.basePath +'/APP/kanban!overallYieldForWo.action',
			// 		data: {
			// 			zhid: uni.getStorageSync('UserInfo').ZHID,
			// 			fmo: this.DayPZJKoption.data[this.showBG].FMO,
			// 			dataperm: this.titleObj.FDATAPERMCODE
			// 		},
			// 		method: 'POST',
			// 		header: {
			// 			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			// 		},
			// 		success:(res)=>{
			// 			if (res.data.IsSuccess) {
			// 				let Ring={series:[]};
			// 				res.data.Data.forEach((ele, index)=>{
			// 					Ring.series.push({name:"合格数",data:ele.QUA_QTY || 0},{name:"不良数",data:ele.BAD_QTY || 0});
			// 					ele.YieldRate = (ele.QUA_QTY + ele.BAD_QTY) == 0 ? 0 : (ele.QUA_QTY / (ele.QUA_QTY + ele.BAD_QTY)*100).toFixed(2);
			// 				});
			// 				this.zhlplData = res.data.Data;
			// 				_self.showRing("canvasRing",Ring);
			// 			} else {
							
			// 			}
			// 		},
			// 	});
			// },
			//日不良
			// async getDayBLFX() {
			// 	const res = await this.$myRequest({
			// 		url: '/APP/kanban!badAnalyForWo.action',
			// 		data: {
			// 			zhid: uni.getStorageSync('UserInfo').ZHID,
			// 			fmo: this.DayPZJKoption.data[this.showBG].FMO,
			// 		},
			// 		method: 'POST',
			// 		header: {
			// 			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			// 		},
			// 	});
			// 	if (res.data.IsSuccess) {
			// 		let Pie={series:[]};
			// 		res.data.Data.forEach((ele, index)=>{
			// 			Pie.series.push({name:ele.FBADITEM_NAME,data:ele.FQTY});
			// 		});
			// 		_self.showPie("canvasPie",Pie);
			// 	} else {
					
			// 	}
			// },
			//月计划
			async getMonFX() {
				const res = await this.$myRequest({
					url: '/APP/kanban!dailyBeInandout.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
				});
				if (res.data.IsSuccess) {
					let LineA={categories:['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12', '13', '14','15', '16', '17', '18', '19', '20', '21','22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
								,series:[{name:'出库', data:[],},{name:'入库', data:[],}],
							};
					res.data.Data.forEach((ele, index)=>{
						LineA.series[0].data.push(ele.SHIP_QTY);
						LineA.series[1].data.push(ele.MORV_QTY);
					});
					_self.showLineA("canvasLineA",LineA);
				} else {
					
				}
			},
		}
	}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
	}
	.setfull{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-image: url(../../components/datav/img/bg.png);
		background-size: 100% 100%;
	}
	.addbg{
		background-image: url(../../static/img/titleBG.jpg);
		background-size: 100% 100%;
	}
	.tableContent{
		width: 100%;
		height: 30%;
	}
	.dele-padding{
		padding: 0;
	}
	.titltTime{
		font-size: .2rem;
		text-align: right;
	}
	.charttitle{
		font-size: .2rem!important;
		color: #FFFFFF;
		overflow: hidden;
	}
	.tdSize{
		font-size: .3rem;
	}
	.yddiv{
		width: 100%;
		height: 88%;
	}
	.toastTitle{
		font-size: .3rem;
		width: 100%;
	}
	.titleDec{
		width:150px;
		height:50px;
	}
	.addpadding{
		padding: 0 1%;
	}
	.left_right{
		position: absolute;
		/* right: 15%;
		top: 15%; */
		width: 100%;
		height: 100%;
	}
	.lpl {
	    width: 150px;
	    height: 150px;
	    text-align: center;
	    padding: 10px 0 0;
	    border-radius: 100%;
	    border: 18px solid rgba(17, 173, 108, 0.8);
	    margin-bottom: 10px;
		font-size: .4rem;
		color: #FFFFFF;
	}
	.tjsc {
	    width: 150px;
	    height: 150px;
	    text-align: center;
	    padding: 10px 0 0;
	    border-radius: 100%;
	    border: 18px solid rgba(158, 158, 158, 0.8);
		font-size: .4rem;
		color: #FFFFFF;
	}
	@media screen and (max-width: 1000px)  {
		.titleDec{
			width:100px;
			height:35px;
		}
	}
	
</style>
