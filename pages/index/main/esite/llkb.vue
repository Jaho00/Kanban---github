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
		<view class="row no-gutters" style="height: 60%;">
			<view class="col-6 addpadding" style="height: 100%;">
				<view class="borderSize">
					<view class="row no-gutters justify-content-center" style="height: 5%;">
						<text style="color: #ffffff;font-size: .25rem;">来料待检</text>
					</view>
					<view style="height: 95%;">
						<dv-scroll-board :config="lljyList"   style="width:100%;height:100%;font-size: .12rem;"/>
					</view>
				</view>

			</view>
			<view class="col-6 addpadding" style="height: 100%;">
				<view class="borderSize">
					<view class="row no-gutters justify-content-center" style="height: 5%;">
						<text style="color: #ffffff;font-size: .25rem;">待处理清单</text>
					</view>
					<view style="height: 95%;">
						<dv-scroll-board :config="dclList" style="width:100%;height:100%;font-size: .12rem;"/>
					</view>
				</view>
			</view>
		</view>
		<view class="row no-gutters" style="height: 35%;">
			<view class="col-6 row no-gutters" style="height: 100%;">
				<view class="col-12 addborder" style="height: 100%;">
					<view class="row no-gutters justify-content-center" style="height: 10%;">
						<text style="color: #ffffff;font-size: .25rem;">本月交货批次</text>
					</view>
					<view class="allsize " id="dayBL">

					</view>
				</view>
			</view>
			<view class="col-6 row no-gutters" style="height: 100%;">
				<view class="col-12 addborder" style="height: 100%;">
					<view class="row no-gutters justify-content-center" style="height: 10%;">
						<text style="color: #ffffff;font-size: .25rem;">本月检验批次</text>
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
	let dayChart = false;
	let monthChart = false;
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
				lljyList: {}, //来料检验列表
				dclList: {}, //待处理清单
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
			getINFOtimer = setInterval(() => {
				this.getInfo();
				this.getToast();
			}, (this.titleObj.FREFTIME * 1000 || 30000));
			console.log(`刷新时间：${this.titleObj.FREFTIME}`);
		},
		onLoad(option) {
			
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
			//从路径中获取看板标题等信息
			const item = JSON.parse(decodeURIComponent(option.ele));
			this.titleObj = item;
		},
		methods: {
			/**
			 * @return {array}
			 * @description  返回结果依次为来料检验数组，待处理清单，月交货批次，月检验批次
			 */
			getInfo() {
				
				//获取列表数据
				uni.request({
					url: this.basePath + '/APP/kanban!posvInfo.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							//来料检验数组长度大于0，则渲染列表
							if (res.data.Data[0]['来料待检'].length > 0) {
								let newArray = [];
								res.data.Data[0]['来料待检'].forEach((ele, index) => {
									let temp = [];
									temp.push(ele.PONum,ele.URGENT , ele.CMA_TIME, ele.PartNum, ele.PartDesc, ele.RecQty);
									newArray.push(temp);
								});
								this.lljyList = {
									header: ['采购单号','紧急物料', '报检日期', '物料编码', '物料名称', '数量'],
									data: newArray,
									index: false,
									columnWidth: [200,150,270,150,250,90],
									align: ['center', 'center', 'center', 'center', 'center', 'center'],
									rowNum: 10,
									headerBGC: '#1D395F',
									headerHeight: 35,
									oddRowBGC: '#003B51',
									evenRowBGC: 'rgba(10, 29, 50, 0.8)',
									waitTime: 5000
								}
							}
							if (res.data.Data[1]['待处理清单'].length > 0) {
								let newArray = [];
								res.data.Data[1]['待处理清单'].forEach((ele, index) => {
									let temp = [],
										str = "";
									if(ele.METHOD == '退货'){
										str = `<span style="color:#fb7293;">${ele.METHOD}</span>`;
									}else{
										str = ele.METHOD;
									}
									temp.push(ele.CMA_TIME, ele.PartNum, ele.PartDesc, ele.RecQty, ele.STATUS, str);
									newArray.push(temp);
								});
								this.dclList = {
									header: ['报检日期', '物料编码', '物料名称', '数量', '检验结果', '处理方式'],
									data: newArray,
									index: false,
									columnWidth: [270,140,320,90,140,140],
									align: ['center', 'center', 'center', 'center', 'center', 'center'],
									rowNum: 10,
									headerBGC: '#1D395F',
									headerHeight: 35,
									oddRowBGC: '#003B51',
									evenRowBGC: 'rgba(10, 29, 50, 0.8)',
									waitTime: 5000
								}
							}
							this.drawDay('dayBL', res.data.Data[2]['本月交货批次']);
							this.drawMonth('monthBL', res.data.Data[3]['本月检验批次']);
						} else {

						}
					},
				});

			},
			drawDay(dom, chartData) {
				if(dayChart){
					
				}else{
					dayChart = this.$echarts.init(document.getElementById(dom));
				}
				
				
				//处理数据
				let max = chartData.TD_NUM,
					otd = chartData.OTD_NUM;

				var option = {
					grid: {
						top: "200%",
						right: "0%",
						bottom: "6%"
					},
					 zlevel:1,
					 z:2,
					series: [{
						type: 'gauge',
						startAngle: 180,
						endAngle: 0,
						min: 0,
						max: max,
						splitNumber: 5,
						itemStyle: {
							color: '#58D9F9',
							shadowColor: 'rgba(0,138,255,0.45)',
							shadowBlur: 8,
							shadowOffsetX: 2,
							shadowOffsetY: 2
						},
						progress: {
							show: true,
							roundCap: true,
							width: 8
						},
						pointer: {
							icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
							length: '55%',
							width: 8,
							offsetCenter: [0, '5%']
						},
						axisLine: {
							roundCap: true,
							lineStyle: {
								width: 8
							}
						},
						axisTick: {
							splitNumber: 2,
							lineStyle: {
								width: 1,
								color: '#999'
							}
						},
						splitLine: {
							length: 4,
							lineStyle: {
								width: 3,
								color: '#999'
							}
						},
						axisLabel: {
							distance: 15,
							color: '#999',
							fontSize: 12
						},
						title: {
							show: false
						},
						detail: {
							backgroundColor: '#000',
							borderColor: '#000',
							borderWidth: 0,
							width: '60%',
							lineHeight: 20,
							height: 40,
							borderRadius: 8,
							offsetCenter: [0, '55%'],
							valueAnimation: true,
							formatter: function(value) {
								return '{value|' + value.toFixed(0) + '/' + max + '}' + '\n' + '{unit|准交批次/总批次}';
							},
							rich: {
								value: {
									fontSize: 20,
									fontWeight: 'bolder',
									color: '#fff'
								},
								unit: {
									fontSize: 15,
									color: '#fff',
									padding: [0, 0, -20, 10]
								}
							}
						},
						data: [{
							value: otd
						}]
					}]
				};
				dayChart.setOption(option);

			},
			drawMonth(dom, chartData) {
				if(monthChart){
					
				}else{
					monthChart = this.$echarts.init(document.getElementById(dom));
				}
				//处理数据
				let dataArr = [
					{
						value: chartData.OK_NUM, 
						name: '合格'
					},
					{
						value: chartData.NG_NUM, 
						name: '不合格'
					},
					{
						value: chartData.PASS_NUM, 
						name: '放行'
					}
				];
				
				var option = {
					tooltip: {
						trigger: 'item',
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						textStyle:{
							color: "#ffffff"
						},
					},
					series: [{
						name: '来料检验结果',
						type: 'pie',
						radius: '50%',
						data: dataArr,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
						label: { //饼图图形上的文本标签
								show: true,
								position: 'outside', //标签的位置
								fontWeight: 300,
								fontSize: 16 ,//文字的字体大小
								color: "#ffffff",
								formatter: '{b} {c}批 {d}%'
						}
					}]
				};
				monthChart.setOption(option);
			},
			//获取顶部滚动消息
			getToast() {
				uni.request({
					url: this.basePath + '/APP/aBN!getNotice.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						cjcode: uni.getStorageSync('UserInfo').DEPTCODE,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							if (_self.newtoaList[0] == "") {
								_self.toastList = res.data.Data;
							} else {
								_self.newtoaList.forEach((ele, i) => {
									if (ele != _self.toastList[i].NOTICE_TITLE) {
										_self.toastList = res.data.Data;
										return;
									}
								});
							}
						} else {
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
		padding: .5% .5%;
	}

	.addborder {
		border: 1px solid #044c8b;
	}

	.borderSize {
		width: 100%;
		height: 100%;
		border: 1px solid #044c8b;
	}

	@media screen and (max-width: 1000px) {
		.titleDec {
			width: 100px;
			height: 35px;
		}
	}
	.ranking-board {
	  white-space: pre; 
	}
	.ranking-board {
	  white-space: pre; 
	}
</style>
