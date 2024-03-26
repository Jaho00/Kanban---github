<template>
	<view class="container-fluid setfull dele-padding">
		<!-- <dv-full-screen-container> -->
		<view class="row align-items-center" style="background-color: #1890FF;color: #ffffff;" v-if="isToastShow == 'noToast'">
			<view class="col row align-items-center align-self-center">
				<image :src="LOGO" mode="aspectFit" style="width: 100px;height: 50px;margin-left: 5%;"></image>
				<text style="margin-left:10%;font-size: .2rem;line-height: 2.5;" v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</text>

			</view>
			<view class="col-4 pageTitle row justify-content-center" style="font-size: .4rem;text-align: center;">
				<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
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
				<u-notice-bar class="toastTitle" mode="horizontal" :volume-icon="false" :volume-size="20" :speed="25" :font-size="20"
				 :padding="0" type='none' :is-circular="true" :list="newtoaList" bg-color='#000000' color='#ffffff'></u-notice-bar>
			</view>
		</view>
		<!-- 内容区 -->
		<view class="row no-gutters" style="height: 35%;">
			<view class="col-12" style="height: 100%;">
				<dv-scroll-board :config="listtable" />
			</view>
			
		</view>
		<view class="row no-gutters" style="height: 33%;margin-top: 2%;">
			<view class="col-12" style="height: 100%;">
				<dv-scroll-board :config="todaylisttable" />
			</view>
			
		</view>
		<view class="row no-gutters" style="height: 25%;">
			<view class="col-6 row no-gutters" style="height: 100%;">
				<view class="col-12 addborder" style="height: 100%;">
					<view class="row no-gutters justify-content-center" style="height: 10%;">
						<text style="color: #ffffff;font-size: .25rem;">日返修不良统计</text>
					</view>
					<view class="allsize " id="dayBL">
			
					</view>
				</view>
			</view>
			<view class="col-6 row no-gutters" style="height: 100%;">
				<view class="col-12 addborder" style="height: 100%;">
					<view class="row no-gutters justify-content-center" style="height: 10%;">
						<text style="color: #ffffff;font-size: .25rem;">月返修不良统计</text>
					</view>
					<view class="allsize " id="monthBL">
			
					</view>
				</view>
			</view>
		</view>
		<!-- </dv-full-screen-container> -->
	</view>
</template>

<script>
	var getINFOtimer = null; //创建一个定时器
	export default {
		data() {
			return {
				titleObj: {},
				LOGO: "",
				nowTime: "",
				nowDay: "",
				toastList: [], // 消息列表
				toastString: "", //消息字符串
				isToastShow: 'noToast',
				listtable: {}, //表格数据
				todaylisttable:{}, //今日表格数据
				monthBL: [], //月不良
				dayBL: [], //日不良
			}
		},
		computed: {
			newtoaList() {
				let arr = [];
				let str = "";
				this.toastList.forEach((ele, index) => {
					str += (index + 1) + '、' + ele.NOTICE_TITLE;
				});
				arr.push(str);
				if (arr.length > 0) {
					this.isToastShow = 'yesToast';
				} else {
					this.isToastShow = 'noToast';
				}
				return arr;
			}
		},
		onHide() {
			clearInterval(getINFOtimer);
		},
		onShow() {  
			getINFOtimer = setInterval(()=>{
				this.getInfo();
				this.getToast();
			},(this.titleObj.FREFTIME * 1000 || 30000));
		},
		onLoad(option) {
			//从路径中获取看板标题等信息
			const item = JSON.parse(decodeURIComponent(option.ele));
			this.titleObj = item;
			try {
				this.LOGO = this.basePath + item.FLOGO.split('*')[0];
			} catch (e) {
				//TODO handle the exception
				this.LOGO = "";
			}
			setInterval(() => {
				var time = new Date();
				var month = time.getMonth() + 1;
				var hours = time.getHours();
				var seconds = time.getSeconds();
				var minutes = time.getMinutes();
				//判断是否在前面加0
				function getNow(s) {
					return s < 10 ? '0' + s : s;
				}
				this.nowDay = time.getFullYear() + '年' + month + '月' + time.getDate() + '日';
				this.nowTime = getNow(hours) + ':' + getNow(minutes) + ":" + getNow(seconds);
			}, 1000);
			this.getInfo();
			this.getToast();
		},
		methods: {
			getInfo() {
				//获取列表数据
				uni.request({
					url: this.basePath + '/APP/kanban!workForYesterdayAndToday.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						dataperm: this.titleObj.FDATAPERMCODE
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							let newArray = [];
							let todayArr = [];
							const today = new Date().setHours(0, 0, 0, 0);
							res.data.Data.forEach((ele, index) => {
								let temp = []; //昨天
								let todayTemp = []; //今天
								const d = new Date(ele.FSHIFT_DATE).setHours(0, 0, 0, 0);
								//如果目标时间减今天时间小于0，则是昨天，等于0则是今天
								if(d - today < 0){
									temp.push(ele.FSHIFT_DATE,ele.FCO, ele.COUNTRY, ele.FPRD_NAME, ele.FSPEC, ele.FWORKNAME, ele.FWORK_QTY, ele.FBAD_QTY,ele.FOPERATORNAME,
									 ele.FOPERATORNUM,ele.FPRODTIME, ele.SMTE, ele.FMTE);
									newArray.push(temp);
								}else{
									todayTemp.push(ele.FSHIFT_DATE,ele.FCO, ele.COUNTRY, ele.FPRD_NAME, ele.FSPEC, ele.FWORKNAME, ele.FWORK_QTY, ele.FBAD_QTY,ele.FOPERATORNAME,
									 ele.FOPERATORNUM,ele.FPRODTIME, ele.SMTE, ele.FMTE);
									todayArr.push(todayTemp);
								}
								
							});
							this.todaylisttable = {
								// header: ['生产日期','订单号','国家', '品名','规格' ,'工序', '生产数', '不良数','作业人员', '人数','生产工时', '标准效率', '实际效率'],
								data: todayArr,
								index: false,
								columnWidth: [95, 110, 80, 150, 150],
								align: ['center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center','center', 'center'],
								rowNum: 10,
								headerBGC: '#1D395F',
								headerHeight: 35,
								oddRowBGC: '#003B51',
								evenRowBGC: 'rgba(10, 29, 50, 0.8)',
								waitTime: 5000
							}
							this.listtable = {
								header: ['生产日期','订单号','国家', '品名','规格' ,'工序', '生产数', '不良数','作业人员', '人数','生产工时', '标准效率', '实际效率'],
								data: newArray,
								index: false,
								columnWidth: [95, 110, 80, 150, 150],
								align: ['center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center','center', 'center'],
								rowNum: 10,
								headerBGC: '#1D395F',
								headerHeight: 35,
								oddRowBGC: '#003B51',
								evenRowBGC: 'rgba(10, 29, 50, 0.8)',
								waitTime: 5000
							}
						} else {

						}
					},
				});

				//获取图表数据
				uni.request({
					url: this.basePath + '/APP/kanban!dailyBadAnaly.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						
						// res.data.Data = [{
						// 		"FID": "efbe2cfc-ad4b-11eb-a6b5-000c2921f9a4",
						// 		"FQTY": 14,
						// 		"FBADREASON_NAME": "元器件不良,焊接不良"
						// 	},
						// 	{
						// 		"FID": "efbe2d10-ad4b-11eb-a6b5-000c2921f9a4",
						// 		"FQTY": 12,
						// 		"FBADREASON_NAME": "焊接不良"
						// 	}
						// ]
						// this.monthBL = res.data.Data;
						// this.drawMonth('monthBL', this.monthBL);
						
						if (res.data.IsSuccess) {
							this.dayBL = res.data.Data;
							console.log(this.dayBL);
							this.drawDay('dayBL', this.dayBL);
						} else {

						}
					},
				});
				this.getMonthData();
			},
			getMonthData(){
				uni.request({
					url: this.basePath + '/APP/kanban!monthlyBadAnaly.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.monthBL = res.data.Data;
							this.drawMonth('monthBL', this.monthBL);
						} else {
				
						}
					},
				});
			},
			drawDay(dom, chartData) {
					let dayChart = this.$echarts.init(document.getElementById(dom));
				
				//处理数据
				let xAxis = []; //横坐标数组
				let yAxis = []; //纵坐标数组
				chartData.forEach((ele, index) => {
					xAxis.push(ele.FBADREASON_NAME);
					yAxis.push(ele.FQTY);
				});

				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
					grid: {
						top:'10%',
						left: '3%',
						right: '4%',
						bottom: '10%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: xAxis,
						axisTick: {
							alignWithLabel: true
						},
						//X轴字体颜色
						axisLabel: {
							formatter: '{value}',
							interval:0 ,  //控制是否全部显示
							textStyle: {
								color: '#fff'
							}
						}
					}],
					yAxis: [{
						type: 'value',
						//Y轴字体颜色
						axisLabel: {
							formatter: '{value}',
							textStyle: {
								color: '#fff'
							}
						}
					}],
					series: [{
						name: '直接访问',
						type: 'bar',
						barWidth: '60%',
						data: yAxis,
						//柱子顶部显示数据
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在右侧显示
									textStyle: { //数值样式
										color: '#ffffff',
										fontSize: 12
									}
								}
							}
						}
					}]
				};
				dayChart.setOption(option);

			},
			drawMonth(dom, chartData) {
					var barChart = this.$echarts.init(document.getElementById(dom));
				//处理数据
				let xAxis = []; //横坐标数组
				let yAxis = []; //纵坐标数组
				chartData.forEach((ele, index) => {
					xAxis.push(ele.FBADREASON_NAME);
					yAxis.push(ele.FQTY);
				});
				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
					grid: {
						top: '10%',
						left: '3%',
						right: '4%',
						bottom: '10%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: xAxis,
						axisTick: {
							alignWithLabel: true
						},
						//X轴字体颜色
						axisLabel: {
							formatter: '{value}',
							interval:0 ,  //控制是否全部显示
							textStyle: {
								color: '#fff'
							}
						}
					}],
					yAxis: [{
						type: 'value',
						
						//Y轴字体颜色
						axisLabel: {
							formatter: '{value}',
							textStyle: {
								color: '#fff'
							}
						}
					}],
					series: [{
						name: '不良数量',
						type: 'bar',
						barWidth: '60%',
						data: yAxis,
						//柱子顶部显示数据
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在右侧显示
									textStyle: { //数值样式
										color: '#ffffff',
										fontSize: 12
									}
								}
							}
						}
					}]
				};
				barChart.setOption(option);
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
		}
	}
</script>

<style>
	.setfull {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-image: url(../../../../components/datav/img/bg.png);
		background-size: 100% 100%;
	}

	.addbg {
		background-image: url(../../../../static/img/titleBG.jpg);
		background-size: 100% 100%;
	}

	.titltTime {
		font-size: .2rem;
		text-align: right;
	}

	.charttitle {
		font-size: .2rem !important;
		color: #FFFFFF;
		overflow: hidden;
	}

	.dele-padding {
		padding: 0;
	}

	.allsize {
		width: 100%;
		height: 90%;
	}

	.addpadding {
		padding: 1% 1%;
	}

	.addborder {
		border: 1px solid #044c8b;
	}

	@media screen and (max-width: 1000px) {
		.titleDec {
			width: 100px;
			height: 35px;
		}
	}
</style>
