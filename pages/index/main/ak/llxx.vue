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
		<view class="row no-gutters" style="height: 50%;">
			<view class="col-6 addpadding" style="height: 100%;">
				<view class="borderSize">
					<view class="row no-gutters justify-content-center" style="height: 5%;">
						<text style="color: #ffffff;font-size: .25rem;">捡料完成进度</text>
					</view>
					<view style="height: 100%;">
						<view class="allsize"  id="JLWCJD">
							
						</view>
					</view>
				</view>

			</view>
			<view class="col-6 addpadding" style="height: 100%;">
				<view class="borderSize">
					<view class="row no-gutters justify-content-center" style="height: 5%;">
						<text style="color: #ffffff;font-size: .25rem;">捡料总达成率</text>
					</view>
					<view style="height: 95%;">
						<view class="allsize" id="JLZDCL">
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="row no-gutters" style="height: 45%;">
			<view class="col-12 row no-gutters" style="height: 100%;">
				<view class="col-12 addborder" style="height: 100%;">
					<view class="row no-gutters justify-content-center" style="height: 10%;">
						<text style="color: #ffffff;font-size: .25rem;">领料明细</text>
					</view>
					<view class="allsize ">
						<dv-scroll-board :config="lljyList"  style="width:100%;height:100%;font-size: .12rem;"/>
					</view>
				</view>
			</view>
		</view>
		<!-- </dv-full-screen-container> -->
	</view>
</template>

<script>
	var getINFOtimer = null; //创建一个定时器
	let JLWCJDChart = false;
	let JLZDCLChart = false;
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
			/**
			 * @return {array}
			 * @description  返回结果依次为来料检验数组，待处理清单，月交货批次，月检验批次
			 */
			getInfo() {
				//获取列表数据
				uni.request({
					url: this.basePath + '/APP/kanban!pickInfo.action',
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
							if (res.data.Data[0]['领料明细'].length > 0) {
								let newArray = [];
								res.data.Data[0]['领料明细'].forEach((ele, index) => {
									let temp = [];
									temp.push((index + 1),ele.FMO, ele.TRAN_DATE, ele.PICKING_TIME, ele.ITEM_CODE, ele.ITEM_NAME, ele.TRAN_QTY, ele.STBIN, ele.STATUS, ele.TAG_NO, ele.OWE_QTY);
									newArray.push(temp);
								});
								this.lljyList = {
									header: ['序号','工单号', '下发时间', '捡料时间', '料号', '物料名称', '数量', '库位', '捡料状态', '位置号', '欠料'],
									data: newArray,
									index: false,
									columnWidth: [90,200,200,270,140,350,90,230,150,120,90],
									align: ['center', 'center', 'center', 'center', 'center','center', 'center', 'center', 'center', 'center', 'center'],
									rowNum: 10,
									headerBGC: '#1D395F',
									headerHeight: 35,
									oddRowBGC: '#003B51',
									evenRowBGC: 'rgba(10, 29, 50, 0.8)',
									waitTime: 5000
								}
							}
							this.drawDay('JLWCJD', res.data.Data[0]['捡料完成进度']);
							this.drawMonth('JLZDCL', res.data.Data[0]['捡料总达成率']);
						} else {

						}
					},
				});

			},
			drawDay(dom, chartData) {
				
				if(JLWCJDChart){
					
				}else{
					JLWCJDChart = this.$echarts.init(document.getElementById(dom));
				}
				//处理数据
				let TranArr= [];
				let OweArr = [];
				let xArr = [];
				chartData.forEach((ele) =>{
					TranArr.push(+ele.PICKING_RATE);
					OweArr.push(+ele.HAS_RATE);
					xArr.push(ele.TRAN_NUM);
				});
				
				var option = {
					grid: {
						x: 85,
						x2: 20,
						y: 45,
						y2: 35
					},
					tooltip: {
						trigger: 'axis',
					},
					legend: {
						x: '40%', //图例距离左的距离
						y: '1%', //图例上下居中
						textStyle:{
							color: "#ffffff"
						},
					},
					xAxis: [
					    {
					       type: 'category',
							data: xArr,
							axisLabel: {
								textStyle: {
									color: '#fff',
									// fontSize: 16,
								}
							}
					    }
					  ],
					  yAxis: [
					    {
					      type: 'value',
						  axisLabel: {
						  	textStyle: {
						  		color: '#fff',
								fontSize: 12,
						  	}
						  }
					    }
					  ],
					series: [
						{
						  name: '已领数量',
						  type: 'bar',
						  stack: 'Ad',
						  emphasis: {
							focus: 'series'
						  },
						  data: TranArr
						},
						{
						  name: '欠料数量',
						  type: 'bar',
						  stack: 'Ad',
						  emphasis: {
							focus: 'series'
						  },
						  data: OweArr
						},
					]
				};
				
				JLWCJDChart.setOption(option);

			},
			drawMonth(dom, chartData) {
				if(JLZDCLChart){
					
				}else{
					JLZDCLChart = this.$echarts.init(document.getElementById(dom));
				}
				//处理数据
				let dataArr = [
					{
						value: +chartData.PICKING_RATE, 
						name: '已领数量'
					},
					{
						value: +chartData.HAS_RATE, 
						name: '欠料数量'
					}
				];
				
				var option = {
					tooltip: {
						trigger: 'item',
					},
					legend: {
						x: '40%', //图例距离左的距离
						y: '1%', //图例上下居中
						textStyle:{
							color: "#ffffff"
						},
					},
					series: [{
						name: '捡料总达成率',
						type: 'pie',
						radius: '60%',
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
								fontWeight: 500,
								fontSize: 18 ,//文字的字体大小
								color: "#ffffff",
								formatter: '{c}件，占比{d}%'
						}
					}]
				};
				JLZDCLChart.setOption(option);
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
