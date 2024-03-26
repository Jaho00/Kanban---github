<template>
	<view class="container-fluid setfull">
		 <dv-full-screen-container>
			<view class="row align-items-center" style="background-color: #000000;color: #ffffff;"  v-if="isToastShow == 'noToast'">
				<view class="col row align-items-center align-self-center">
					<image :src="LOGO" mode="scaleToFill" style="width: 150px;height: 50px;"></image>
					<dv-decoration-11 style="width:49%;height:50px;font-size: .2rem;" v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</dv-decoration-11>
				</view> 
				<view class="col-6 pageTitle row justify-content-center" style="font-size: .5rem;text-align: center;">
						<dv-decoration-8 class="titleDec" />
						<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
						<dv-decoration-8 :reverse="true" class="titleDec"/>
				</view>
				<view class="col titltTime row align-items-center">
					<view class="col-6" style="width: 100%;">
						<dv-decoration-11 style="width:100%;height:50px;" v-show="titleObj.FSYSTEM == '' ? false : true">{{ titleObj.FSYSTEM }}</dv-decoration-11>
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
			<view class="row" style="overflow: hidden;">
				<view class="col-5">
						<u-table style="width: 100%;" bg-color="transparent" color="#FFFFFF" border-color="#052D84"
									:th-style="thStyle">
							 <u-tr>
								 <u-th class="charttitle">
									 工单号
								 </u-th>
								 <u-th width="30%" class="charttitle">
									 品名
								 </u-th>
								 <u-th class="charttitle">
									工单数量
								 </u-th>
								 <u-th class="charttitle">
									 报工数
								 </u-th>
								 <u-th class="charttitle">
									 进度%
								 </u-th>
							 </u-tr>
						</u-table>
				</view>
				<view class="col-4 ml-1">
					<u-table style="width: 100%;" bg-color="transparent" color="#FFFFFF" border-color="#052D84"
								:th-style="thStyle" fontSize='36'>
						 <u-tr>
							 <u-th class="charttitle">
								 工序名称
							 </u-th>
							 <u-th class="charttitle">
								 报工数
							 </u-th>
							 <u-th class="charttitle">
								合格数
							 </u-th>
							 <u-th class="charttitle">
								 不良数
							 </u-th>
							 <u-th class="charttitle">
								 工序进度
							 </u-th>
						 </u-tr>
					</u-table>
				</view>
				<view class="col ml-1 charttitle" style="font-size: .3rem;text-align: center;">
					综合良品率
				</view>
			</view>
			<view class="row tableContent tableHeight" style="overflow: hidden;margin-bottom: 1%;">
				<view class="col-5" style="width: 100%;overflow: hidden;height: 100%;border: 1px solid #052D84;">
					<view class="" :animation="GDanimate">
						<u-table class="scrollList" style="width: 100%;" bg-color="transparent" color="#FFFFFF" border-color="#052D84">
							 <u-tr v-for="(item,index) in DayPZJKoption.data" :key="item.FID" class="GdTrHeight" :style="{backgroundColor: showBG === index ? 'blue':'inherit'}">
								 <u-td style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size: .2rem;">
									 {{ item.FMO }}
								 </u-td>
								 <u-td width="30%"  style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size: .2rem;">
									 {{ item.FPRD_NAME }}
								 </u-td>
								 <u-td class="charttitle">
									 {{ item.NEED_QTY }}
								 </u-td>
								 <u-td class="charttitle">
									 {{ item.FN_QTY }}
								 </u-td>
								 <u-td class="charttitle">
									 <!-- {{ ((item.FN_QTY / item.NEED_QTY)*100).toFixed(2)+'%' }} -->
									 {{ item.PROGRESS + '%' }}
								 </u-td>
							 </u-tr>	
						</u-table>
					</view>
				</view>
				<view class="col-4 ml-1" style="width: 100%;overflow: hidden;height: 100%;border: 1px solid #052D84;">
					<view class="" :animation="animationData">
						<u-table class="scrollList GXtableHeight" style="width: 100%;" bg-color="transparent" color="#FFFFFF" border-color="#052D84">
							 <u-tr v-for="(item,index) in GXList" :key="item.FID" class="GxTrHeight">
								 <u-td style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" class="charttitle">
									 {{ item.FWORKNAME }}
								 </u-td>
								<u-td class="charttitle">
									 {{ item.WORK_QTY }}
								</u-td>
								 <u-td class="charttitle">
									 {{ item.QUA_QTY }}
								 </u-td>
								 <u-td class="charttitle">
									 {{ item.BAD_QTY }}
								 </u-td>
								 <u-td class="charttitle">
									 {{ ((item.WORK_QTY / item.TASK_QTY)*100).toFixed(2)+'%' }}
								 </u-td>
							 </u-tr>	
						</u-table>
					</view>
				</view>
				<view class="row" style="height: 100%;width: 23%;">
					<view class="col-12" style="height: 45%;">
						<canvas canvas-id="canvasRing" style="width: 100%;height: 100%;" id="canvasRing" class="charts zhlplDiv"></canvas>
					</view>
					<view class="col-12 charttitle ml-1" style="height: 10%;font-size: .3rem;text-align: center;">
						不良原因分析
					</view>
					<view class="col-12" style="height: 45%;margin-left: 7%;">
						<canvas canvas-id="canvasPie" style="width: 100%;height: 100%;" id="canvasPie" class="charts"></canvas>
					</view>
				</view>
			</view>
				
			<view class="row"  style="height: 29%;">
				<view class="col-12 dele-padding" style="height: 100%;">
					<view style="width: 100%;text-align: center;font-size: .3rem;color:#FFFFFF">
						月度计划及产出趋势图
					</view>
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts yddiv" @touchstart="touchLineA"></canvas>
					<!-- <div class="chart" id="barChart" style="height: 80%;"></div> -->
				</view>
				<!-- <view class="col-3 dele-padding" style="height: 100%;">
					<view style="width: 100%;text-align: center;font-size: .3rem;color:#FFFFFF">
						实时监控
					</view>
					<video id="myPlayer" controls playsInline webkit-playsinline autoplay>
					    <source src="rtsp://admin:banyue@192.168.8.242:554" type="" />
					</video>
				</view> -->
			</view>
			</dv-full-screen-container>
	</view>
</template>
<script>
	import uCharts from '@/components/u-charts/u-charts.js'; //引入ucharts图表组件
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
				RingSize:"",
				ydDIV: "",
				toastList: [] ,// 消息列表
				toastString:"", //消息字符串
				isToastShow: 'noToast',
				isfirst: true,
				chartFontSize:""
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
				setTimeout(()=>{
						if(this.GXList.length > 0){
							//工序单元格高度
							let menuItem = uni.createSelectorQuery().in(this).select(".GxTrHeight");
							menuItem.fields({  
								size: true,  
								scrollOffset: true  
							}, data => {  
								this.GxTrHeight = data.height; 
							}).exec(); 
							//工序表格总高度
							let GXtableHeight = uni.createSelectorQuery().in(this).select(".GXtableHeight");
							GXtableHeight.fields({  
								size: true,  
								scrollOffset: true  
							}, data => {  
								this.GXtableHeight = data.height; 
							}).exec(); 
						}else{
							let menuItem = 0;
							let GXtableHeight =0;
						}
						if(this.DayPZJKoption.data.length > 0){
							//工单单元格高度
							let gdItem = uni.createSelectorQuery().in(this).select(".GdTrHeight");
							gdItem.fields({  
								size: true,  
								scrollOffset: true  
							}, data => {  
								this.GdTrHeight = data.height; 
							}).exec(); 
							//工单表格总高度
							let tableHeight = uni.createSelectorQuery().in(this).select(".tableHeight");
							tableHeight.fields({  
								size: true,  
								scrollOffset: true  
							}, data => {  
								this.tableHeight = data.height; 
							}).exec(); 
						}else{
							let gdItem = 0;
							let tableHeight = 0;
						}
				},300); 
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
				timer = setInterval(function() { 
					let gxindex;
					if(_self.GxTrHeight == 0){
						gxindex = 0;
					}else{
						gxindex = Math.floor(_self.tableHeight / _self.GxTrHeight) + 1;
					}
					this.ListLength = (this.GXList.length - gxindex) > 0 ? (this.GXList.length - gxindex) : 0;
					let length = 0 - Number(this.ListLength) * this.GxTrHeight; //所有未显示的表格总高度
					const little = _self.tableHeight - gxindex * this.GxTrHeight;
					const isfirstScrool = this.GXList.length >= gxindex;
					if(this.isfirst && this.ListLength >= 0 && little < 0){
						this.isfirst = false
						if(!isfirstScrool){
							return;
						}
						this.isTop0 = little;
						this.setAnimation(little ,0);
						return;
					}
					if(this.isfirst == false && this.isTop0 - (length + little) < this.GxTrHeight){
						this.isTop0 = 0;
						this.isfirst = true;
						this.setAnimation(this.isTop0 ,0);  
						this.scrollGD();  //工序滚动完，就到下一条工单
					}else{
						this.isTop0 = this.isTop0 - this.GxTrHeight;
					}
					if(Number(this.ListLength) === 0){
						return;
					}
                    this.setAnimation(this.isTop0 ,1000);  
                }.bind(this), 5000);  
			},
			scrollGD(){
				setTimeout(()=>{
					if(_self.showBG < _self.DayPZJKoption.data.length - 1){
						_self.showBG ++;
						this.getGX();  //获取工序列表
						this.getDayBLFX();//获取日不良监控	
						this.getGood(); //获取综合良品数据
					}else{
						_self.showBG = 0;
						this.getGX();  //获取工序列表
						this.getDayBLFX();//获取日不良监控	
						this.getGood(); //获取综合良品数据
					}
					let allindex = Math.floor(_self.tableHeight / _self.GdTrHeight) + 1;
					let GDlength = (_self.DayPZJKoption.data.length - allindex) > 0 ? (_self.DayPZJKoption.data.length - allindex) : 0;
					let length = 0 - Number(GDlength) * _self.GdTrHeight;
					if(Number(GDlength) === 0){
						return;
					}
					if( length == _self.gdTop){
						_self.gdTop = 0;
						_self.setGDAnimation(_self.gdTop ,0);  
					}else{
						_self.gdTop = _self.gdTop - _self.GdTrHeight;
					}
					_self.setGDAnimation(_self.gdTop ,1000);
				},3000);
			},
			//工单列表运动函数
			setGDAnimation(detaY, time){
			  const animation = uni.createAnimation({
			  	duration: time,
			  	timingFunction: 'ease',
			   })
			  this.GDanimation = animation
			  _self.GDanimation.translateY(detaY).step();  
			  _self.GDanimate = _self.GDanimation.export(); 
			},
			//工序列表运动函数
			setAnimation(detaY, time){
			  const animation = uni.createAnimation({
			  	duration: time,
			  	timingFunction: 'ease',
			   })
			  this.animation = animation
			  _self.animation.translateY(detaY).step();  
			  _self.animationData = _self.animation.export(); 
			},
			//渲染综合良品圆环
			showRing(canvasId,chartData){
				setTimeout(()=>{
					if(this.GxTrHeight == "" && this.GXList.length > 0){
						//工序单元格高度
						let menuItem = uni.createSelectorQuery().in(this).select(".GxTrHeight");
						menuItem.fields({  
							size: true,  
							scrollOffset: true  
						}, data => {  
							this.GxTrHeight = data.height; 
						}).exec(); 
					}
					let zhDIV = uni.createSelectorQuery().in(this).select(".zhlplDiv");
					zhDIV.fields({  
						size: true,  
						scrollOffset: true  
					}, data => {  
						this.zhlplDiv = {height:data.height, width:data.width};
						const currentWidth = screen.width;
						if(currentWidth >= 1920){
							this.RingSize = 40;
						}else if(currentWidth >= 1280){
							this.RingSize = 20;
						}
						canvaRing=new uCharts({
							$this:_self,
							canvasId: canvasId,
							type: 'ring',
							fontSize:11,
							legend:{show:true,fontColor:'#FFFFFF',float:'right',position:'right',lineHeight:18},
							title: {
								name: _self.zhlplData[0].YieldRate + '%',
								color: '#ffffff',
								fontSize: 25,
								offsetY:0,
							},
							subtitle: {
								name: '良品率',
								color: '#ffffff',
								fontSize: 15,
								offsetY:0,
							},
							extra: {
								pie: {
								  offsetAngle: -45,
								  ringWidth: _self.RingSize,
								  labelWidth:15
								}
							},
							background:'#000000',
							pixelRatio:1,
							series: chartData.series,
							animation: true,
							width: _self.zhlplDiv.width,
							height: _self.zhlplDiv.height,
							disablePieStroke: true,
							dataLabel: false,
						});
					}).exec(); 
				},300);
			},
			//渲染饼图
			showPie(canvasId,chartData){
				setTimeout(()=>{
					let zhDIV = uni.createSelectorQuery().in(this).select(".zhlplDiv");
					zhDIV.fields({  
						size: true,  
						scrollOffset: true  
					}, data => {  
						this.zhlplDiv = {height:data.height, width:data.width};
						canvaPie=new uCharts({
							$this:_self,
							canvasId: canvasId,
							// padding:[0,0,0,40],
							type: 'pie',
							fontSize:11,
							legend:{show:true,fontColor:'#FFFFFF',float:'right',position:'right',lineHeight:18},
							background:'#FFFFFF',
							pixelRatio:1,
							series: chartData.series,
							animation: true,
							width: _self.zhlplDiv.width,
							height: _self.zhlplDiv.height,
							dataLabel: false,
							extra: {
								pie: {
								  lableWidth:15
								},
								 offsetAngle: -45,
							},
						});
						}).exec(); 
				},300);
				
			},
			touchPie(e){
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
			//渲染折线图
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
								uni.showToast({
								    title: '高度：' + data.height +'宽度'+data.width,
								    duration: 2000
								});
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
				
						
						
						//这是用echarts画的柱状图
						// var byId = function(id) {
						// 	return document.getElementById(id);
						// };
						// var option = {
						// 		legend: {
						// 			data: ['蒸发量', '降水量']
						// 		},
						// 		grid: {
						// 			x: 35,
						// 			x2: 10,
						// 			y: 30,
						// 			y2: 25
						// 		},
						// 		toolbox: {
						// 			show: false,
						// 			feature: {
						// 				mark: {
						// 					show: true
						// 				},
						// 				dataView: {
						// 					show: true,
						// 					readOnly: false
						// 				},
						// 				magicType: {
						// 					show: true,
						// 					type: ['line', 'bar']
						// 				},
						// 				restore: {
						// 					show: true
						// 				},
						// 				saveAsImage: {
						// 					show: true
						// 				}
						// 			}
						// 		},
						// 		calculable: false,
						// 		xAxis: [{
						// 			type: 'category',
						// 			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
						// 		}],
						// 		yAxis: [{
						// 			type: 'value',
						// 			splitArea: {
						// 				show: true
						// 			}
						// 		}],
						// 		series: [{
						// 			name: '蒸发量',
						// 			type: "bar",
						// 			data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
						// 		}, {
						// 			name: '降水量',
						// 			type: "bar",
						// 			data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
						// 		}]
						// 	};
						
						// var barChart = echarts.init(byId('barChart'));
						// barChart.setOption(option);
			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			//根据工单号获取所有工序
			getGX(){
				this.GXList = [];
				uni.request({
					url: this.basePath +'/APP/kanban!progressProcTrack.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						fmo: this.DayPZJKoption.data[this.showBG].FMO,
						dataperm: this.titleObj.FDATAPERMCODE,
						dwscode: this.titleObj.DWSCODE,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success:(res)=>{
						if(res.data.IsSuccess){
							this.GXList = res.data.Data;
						}
					},
				});
			},
			//日品质
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
					if(this.showBG === 0){
						this.getGX();  //获取工序列表
						this.getDayBLFX();//获取日不良监控	
						this.getGood(); //获取综合良品数据
					}
					
				} else {
				
				}
			},
			//综合良品
			 getGood() {
				uni.request({
					url: this.basePath +'/APP/kanban!overallYieldForWo.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						fmo: this.DayPZJKoption.data[this.showBG].FMO,
						dataperm: this.titleObj.FDATAPERMCODE
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success:(res)=>{
						if (res.data.IsSuccess) {
							let Ring={series:[]};
							res.data.Data.forEach((ele, index)=>{
								Ring.series.push({name:"合格数",data:ele.QUA_QTY || 0},{name:"不良数",data:ele.BAD_QTY || 0});
								ele.YieldRate = (ele.QUA_QTY + ele.BAD_QTY) == 0 ? 0 : (ele.QUA_QTY / (ele.QUA_QTY + ele.BAD_QTY)*100).toFixed(2);
							});
							this.zhlplData = res.data.Data;
							_self.showRing("canvasRing",Ring);
						} else {
							
						}
					},
				});
			},
			//日不良
			async getDayBLFX() {
				const res = await this.$myRequest({
					url: '/APP/kanban!badAnalyForWo.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						fmo: this.DayPZJKoption.data[this.showBG].FMO,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
				});
				if (res.data.IsSuccess) {
					let Pie={series:[]};
					res.data.Data.forEach((ele, index)=>{
						Pie.series.push({name:ele.FBADITEM_NAME,data:ele.FQTY});
					});
					_self.showPie("canvasPie",Pie);
				} else {
					
				}
			},
			//月计划
			async getMonFX() {
				const res = await this.$myRequest({
					url: '/APP/kanban!curMonthPlanAndOut.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID || 'SYSTEM',
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
				});
				if (res.data.IsSuccess) {
					let LineA={categories:['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12', '13', '14','15', '16', '17', '18', '19', '20', '21','22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
								,series:[{name:'计划', data:[],},{name:'产量', data:[],}],
							};
					res.data.Data.forEach((ele, index)=>{
						LineA.series[0].data.push(ele.FNEED_QTY);
						LineA.series[1].data.push(ele.FWORK_QTY);
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
		height: 57%;
	}
	.dele-padding{
		padding: 0;
	}
	.titltTime{
		font-size: .2rem;
		text-align: right;
	}
	.charttitle{
		font-size: .3rem!important;
		color: #FFFFFF;
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
	@media screen and (max-width: 1000px)  {
		.titleDec{
			width:100px;
			height:35px;
		}
	}
	
</style>
