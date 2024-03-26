<template>
	<view class="container-fluid setfull no-gutters">
		<dv-full-screen-container>
			<view class="row align-items-center" style="color: #ffffff;" v-if="isToastShow == 'noToast'">
				<view class="col row align-items-center align-self-center">
					<image :src="LOGO" mode="aspectFit" style="width: 100px;height: 50px;margin-left: 5%;"></image>
					<text style="margin-left:10%;height:50px;font-size: .2rem;line-height: 2.5;" v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</text>

				</view>
				<view class="col-4 pageTitle row justify-content-center" style="font-size: .4rem;text-align: center;">
					<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
					<!-- <text style="margin: 0 5%;">注塑车间看板</text> -->
				</view>
				<view class="col-5 titltTime row align-items-center">
					<view class="col-7 deletepadding row no-gutters align-content-around" style="width: 100%;">

					</view>
					<view class="col-5">
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
					<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
				</view>
				<view class="col titltTime row align-items-center">
					<u-notice-bar class="toastTitle" mode="horizontal" :volume-icon="false" :volume-size="20" :speed="25" :font-size="20"
					 :padding="0" type='none' :is-circular="true" :list="newtoaList" bg-color='#000000' color='#ffffff'></u-notice-bar>
				</view>
			</view>
			<!-- 内容区 -->
			<view class="row addpadding tableContent no-gutters" style="overflow: hidden;margin-top: .5%;">
				<!-- 概览部分 -->
				<view class="col-3 wrap-line no-gutters">
					<view class="row no-gutters col-12 time-text justify-content-center" style="height: 5%;">
						<text>设备概览</text>
					</view>
					<view class="col-12 no-gutters rate-content">
						<!-- <view class="col-12 row no-gutters">
							<view class="col-6 small-text justify-content-center no-gutters row">
								<text>当前时间：{{ week }}</text>
							</view>
							<view class="col-6 small-text justify-content-center no-gutters row">
								<text>班次：04-15 早班</text>
							</view>
						</view> -->
						<view class="col-12 row no-gutters ybp-content">
							<view class="col-6 small-text justify-content-center no-gutters row" id="kjl">
								
							</view>
							<view class="col-6 small-text justify-content-center no-gutters row" id="Wzhxl">
								
							</view>
						</view>
						<view class="col-12 row no-gutters">
							<view class="col-3 right-border">
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#FFFFFF">{{ workNum + waitNum + stopNum }}</text>
								</view>
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#02A7F0">设备总数</text>
								</view>
							</view>
							<view class="col-3 right-border">
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#FFFFFF">{{workNum}}</text>
								</view>
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#28CC7B">运行</text>
								</view>
							</view>

							<view class="col-3 right-border">
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#FFFFFF">{{ waitNum }}</text>
								</view>
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#FFB538">待机</text>
								</view>
							</view>
							<view class="col-3 right-border">
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#FFFFFF">{{ stopNum }}</text>
								</view>
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#AEB8C3">离线</text>
								</view>
							</view>
						</view>
					</view>
					<view class="row no-gutters col-12 time-text justify-content-center" style="height: 5%;">
						<text>生产数据</text>
					</view>
					<view class="col-12 no-gutters produce-content" style="overflow: scroll;">
						<u-table class="scrollList GXtableHeight" style="width: 100%;overflow: hidden;" bg-color="transparent" color="#FFFFFF" border-color="#052D84">
							 <u-tr v-for="(item,index) in BJList" :key="index" class="GxTrHeight">
								 <u-td width="20%" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" class="charttitle">
									 {{ item.DEVCODE }}
								 </u-td>
								<u-td class="charttitle">
									 {{ item.MESSAGE }}
								</u-td>
								 <u-td class="charttitle">
									 {{ item.CURRTIME }}
								 </u-td>
							 </u-tr>	
						</u-table>
					</view>
					<view class="row no-gutters col-12 time-text justify-content-center" style="height: 5%;">
						<text>今日综合效率概览</text>
					</view>
					<view class="col-12 no-gutters allrate-content" id="zhxlgl">

					</view>
				</view>
				<!-- 列表区域 -->
				<view class="col-9 row no-gutters tdContent align-content-start">
					<view class="col-3 addpadding setHeight" v-for="item in showdataList" :key="item.id">
						<view class="row no-gutters" :class="item.SY_STATUS  == 3 ? 'shapeGray' : item.SY_STATUS == 2 ? 'shapeGreen' : 'shapeRed'"
						 @click="openPage(item)">
							<view class="row Content-title no-gutters">
								<view class="col-8 list-label">
									{{item.FDEVNAME}}
								</view>
								<view class="col-2 list-label">
									<!-- {{item.zt}} -->
								</view>
								<view class="col-2 delatepadding">
									<u-icon :name="item.SY_STATUS  == 3 ? 'error-circle' : item.SY_STATUS == 2 ? 'checkmark-circle-fill' : 'more-circle-fill'"
									 color="#ffffff" size="15"></u-icon>
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-5 delatepadding">
									<text>产品名称：</text>
								</view>
								<view class="col-7 list-label">
									{{item.FPRD_NAME}}
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-5 delatepadding">
									<text>派工单号：</text>
								</view>
								<view class="col-7 list-label">
									{{item.FJOB_NO}}
								</view>
							</view>
							<!-- <view class="row Content-text no-gutters">
								<view class="col-5 delatepadding">
									<text>物料编号：</text>
								</view>
								<view class="col-7 list-label">
									{{item.FPRD_NO}}
								</view>
							</view> -->
							<!-- <view class="row Content-text no-gutters">
								<view class="col-5 delatepadding">
									<text>模具编号：</text>
								</view>
								<view class="col-7 list-label">
									{{item.FMOLD_NO}}
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-5 delatepadding">
									<text>模次(P/R)：</text>
								</view>
								<view class="col-7 list-label">
									{{item.FJOB_BENUM}} / {{item.FACT_BENUM}}
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-5 delatepadding">
									<text>周期(P/R)：</text>
								</view>
								<view class="col-7 list-label">
									{{item.FPRODCYCLE_STD}} / {{item.FPRODCYCLE_FCT}}
								</view>
							</view> -->
							<view class="row Content-text no-gutters">
								<view class="col-5 delatepadding">
									<text>产量(P/R)：</text>
								</view>
								<view class="col-7 list-label">
									{{item.FJOB_QTY}} / {{item.FQUA_QTY}}
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-5 delatepadding">
									<text>心跳：</text>
								</view>
								<view class="col-7 list-label">
									{{item.HEARTBEATTIME}}
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<u-line-progress :percent="item.FCOMP_RATE" :show-percent="true" style="height: .2rem;" fontSize="0.23" :active-color="item.FCOMP_RATE > 100 ? '#FA3534':'#19be6b'"></u-line-progress>
							</view>
						</view>
					</view>
				</view>

				<view class="row no-gutters bottom-Content">
					<view class="col-10" style="text-align: center;">

					</view>
					<view class="col-1" style="text-align: center;">
						<uni-pagination show-icon="true" :total="dataList.length" pageSize="16" :current="nowCurrent" @change="changPage"></uni-pagination>
					</view>

				</view>
			</view>
		</dv-full-screen-container>
	</view>
</template>

<script>
	var _self = null;
	var timer = null; //创建一个定时器
	var getINFOtimer = null;
	var kjlChart = null; //创建一个开机率的echarts对象，来判断是否存在
	var zhxlChart = null; //综合效率echarts对象
	var zhxlglChart = null; //综合效率概览折线图
	import socket from '@/js_sdk/plus-websocket/index.js'
	export default {
		data() {
			return {
				titleObj: {},
				LOGO: "",
				nowTime: "",
				nowDay: "",
				week:"",
				toastList: [], // 消息列表
				toastString: "", //消息字符串
				isToastShow: 'noToast',
				isfirst: true,
				chartFontSize: "",
				dataList: [],
				showdataList: [],
				nowCurrent: 1, //当前显示第几页
				workNum: 0, //生产机台数
				waitNum: 0, //待机机台数
				stopNum: 0, //停机机台数
				BJList: [], //报警信息列表
				kjl: 0, //开机率
			}
		},
		onLoad(option) {
			_self = this;
			//获取设备信息
			// const res = uni.getSystemInfoSync();
			//  this.sb = res.windowWidth;

			//从路径中获取看板标题等信息
			if (option.ele) {
				const item = JSON.parse(decodeURIComponent(option.ele));
				this.titleObj = item;
			}
			try {
				this.LOGO = this.basePath + this.titleObj.FLOGO;
			} catch (e) {
				//TODO handle the exception
				this.LOGO = "";
			}
			console.log(this.LOGO);
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
				// this.week = "星期" + "日一二三四五六".charAt(time.getDay());
				this.nowTime = getNow(hours) + ':' + getNow(minutes) + ":" + getNow(seconds);
			}, 1000);
		},
		onShow() {
			this.getSBdata();
			this.getToast();
			getINFOtimer = setInterval(() => {
				this.getSBdata();
			}, (this.titleObj.FREFTIME * 1000 || 30000));
		},
		onHide() {
			clearInterval(timer);
			clearInterval(getINFOtimer);
		},
		mounted() {
			// getINFOtimer = setInterval(()=>{
			// 	this.getSBdata();
			// },(this.titleObj.FREFTIME * 1000 || 30000));
			//第一种方式
			//  var wsUrl="ws://192.168.8.77:8080/webSocketRj/SYSTEM/TES";
			// //客户端与服务端建立连接，建立连接以后，它会发出一个ws.open事件
			// var ws=new WebSocket(wsUrl);
			// //连接成功
			// ws.onopen=function(){
			// 	console.info("连接成功")
			// }
			//第二种方式
			// const SocketTaskObj = socket.connectSocket({
			// 							url: 'wss://192.168.8.77:8080/webSocketRj/SYSTEM/TES',
			// 							data() {
			// 								return {
			// 									zhid: '',
			// 									devcode: ''
			// 								};
			// 							},
			// 							header: {
			// 								'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			// 							},
			// 							protocols: ['protocol1'],
			// 							method: 'POST'
			// 						});
			// socket.onSocketOpen(function (res) {
			//   console.log('WebSocket连接已打开！');
			// });
		},
		methods: {
			//暂时使用下列接口
			getSBdata() {
				// debugger;
				uni.request({
					url: this.basePath + '/APP/kanban!devMonitorForWR.action',//'/APP/kanban!devMonitorForZS.action'原来WR
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						dataperm: this.titleObj.FDATAPERMCODE, //车间权限
						addrperm: this.titleObj.FCXCODE, //产线权限
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.dataList = res.data.Data;
							//计算机台数
							this.workNum = 0;
							this.waitNum = 0;
							this.stopNum = 0;
							this.dataList.forEach((ele, index) => {
								if(ele.FJOB_NO || ele.FJOB_NO == '未派工'){
									ele.SY_STATUS = 2
								}
								ele.SY_STATUS == 3 ? this.stopNum++ : ele.SY_STATUS == 2 ? this.workNum++ : this.waitNum++;
								
							});
							//计算开机率，不用拼接百分号
							this.kjl = Math.floor((this.workNum / this.dataList.length) * 100);
							let min = (this.nowCurrent - 1) * 16;
							let max = this.nowCurrent * 16;
							this.showdataList = this.dataList.slice(min, max);
							this.drawKJL(this.kjl);
							console.log(this.waitNum)
						}
					},
				});
				uni.request({
					url: this.basePath + '/APP/device!getDevOEE.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						fdate: "",
						dataperm: this.titleObj.FDATAPERMCODE, //车间权限
						addrperm: this.titleObj.FCXCODE, //产线权限
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.drawZHXL(res.data.Data.OEE_SUM[0].OEE);
							this.drawGL(res.data.Data.OEE_TIMES);
						}
					},
				});
				uni.request({
					url: this.basePath + '/APP/kanban!devAlert.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						dataperm: this.titleObj.FDATAPERMCODE,  //车间权限
						addrperm: this.titleObj.FCXCODE,  //产线权限
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.BJList = res.data.Data;
						}
					},
				});
			},
			//获取看板数据
			// getSBdata() {
			// 	uni.request({
			// 		url: this.basePath + '/APP/kanban!devMonitorForZS.action',//'/APP/kanban!devMonitorForZS.action'原来
			// 		data: {
			// 			zhid: uni.getStorageSync('UserInfo').ZHID,
			// 			dataperm: this.titleObj.FDATAPERMCODE, //车间权限
			// 			addrperm: this.titleObj.FCXCODE, //产线权限
			// 		},
			// 		method: 'POST',
			// 		header: {
			// 			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			// 		},
			// 		success: (res) => {
			// 			if (res.data.IsSuccess) {
			// 				this.dataList = res.data.Data;
			// 				//计算机台数
			// 				this.workNum = 0;
			// 				this.waitNum = 0;
			// 				this.stopNum = 0;
			// 				this.dataList.forEach((ele, index) => {
			// 					ele.SY_STATUS == 3 ? this.stopNum++ : ele.SY_STATUS == 2 ? this.workNum++ : this.waitNum++;
			// 				});
			// 				//计算开机率，不用拼接百分号
			// 				this.kjl = Math.floor((this.workNum / this.dataList.length) * 100);
			// 				let min = (this.nowCurrent - 1) * 16;
			// 				let max = this.nowCurrent * 16;
			// 				this.showdataList = this.dataList.slice(min, max);
			// 				this.drawKJL(this.kjl);
			// 			}
			// 		},
			// 	});
			// 	uni.request({
			// 		url: this.basePath + '/APP/device!getDevOEE.action',
			// 		data: {
			// 			zhid: uni.getStorageSync('UserInfo').ZHID,
			// 			fdate: "",
			// 			dataperm: this.titleObj.FDATAPERMCODE, //车间权限
			// 			addrperm: this.titleObj.FCXCODE, //产线权限
			// 		},
			// 		method: 'POST',
			// 		header: {
			// 			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			// 		},
			// 		success: (res) => {
			// 			if (res.data.IsSuccess) {
			// 				this.drawZHXL(res.data.Data.OEE_SUM[0].OEE);
			// 				this.drawGL(res.data.Data.OEE_TIMES);
			// 			}
			// 		},
			// 	});
			// 	uni.request({
			// 		url: this.basePath + '/APP/kanban!devAlert.action',
			// 		data: {
			// 			zhid: uni.getStorageSync('UserInfo').ZHID,
			// 			dataperm: this.titleObj.FDATAPERMCODE,  //车间权限
			// 			addrperm: this.titleObj.FCXCODE,  //产线权限
			// 		},
			// 		method: 'POST',
			// 		header: {
			// 			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			// 		},
			// 		success: (res) => {
			// 			if (res.data.IsSuccess) {
			// 				this.BJList = res.data.Data;
			// 			}
			// 		},
			// 	});
			// },
			//今日综合效率概览
			drawGL(Datalist){
				if(Datalist.length == 0){
					return;
				}
				let xAixdata = [],
					seriesdata = [];
				Datalist.forEach((ele, index) =>{
					xAixdata.push(ele.TIMES_NAME);
					seriesdata.push(ele.OEE);
				});
				const dom = document.querySelector('#zhxlgl');
				if(!zhxlglChart) {
					zhxlglChart = this.$echarts.init(dom);
				}
				const option = {
					grid: {
						x: 40,
						x2: 10,
						y: 15,
						y2:35
					},
					 xAxis: {
					        type: 'category',
					        data: xAixdata,
							axisLabel: {
								color: '#fff',
								interval: 0,
								fontSize: 10,
								rotate: 45
							},
							axisTick: {
							      interval: 0
							    }
					    },
					    yAxis: {
					        type: 'value',
							axisLabel: {
								formatter: '{value}%',
								color: '#fff',
							},
							min: 0,
							max:100,
					    },
					    series: [{
					        data: seriesdata,
					        type: 'line'
					    }]
				};
				
				// 使用刚指定的配置项和数据显示图表。
				zhxlglChart.setOption(option);
			},
			//画综合效率仪表盘
			drawZHXL(data){
				const dom = document.querySelector('#Wzhxl');
				if(!zhxlChart) {
					zhxlChart = this.$echarts.init(dom);
				}
				const option = {
					 series: [{
							radius: "85%", //控制仪表盘大小，默认是75%
					        type: 'gauge',
					        axisLine: {
					            lineStyle: {
					                width: 10,
					                color: [
					                    [0.3, '#67e0e3'],
					                    [0.7, '#37a2da'],
					                    [1, '#fd666d']
					                ]
					            }
					        },
					        pointer: {
					            itemStyle: {
					                color: 'auto'
					            }
					        },
					        axisTick: {
					            distance: -10,
					            length: 8,
					            lineStyle: {
					                color: '#fff',
					                width: 2
					            }
					        },
					        splitLine: {
					            distance: -10,
					            length: 10,
					            lineStyle: {
					                color: '#fff',
					                width: 4
					            }
					        },
					        axisLabel: {
					            color: 'inherit',
					            distance: 20,
					            fontSize: 8
					        },
					        detail: {
					            valueAnimation: false,
								 offsetCenter: [0, '95%'],
					             formatter: '综合效率: {value}%',
					            color: 'inherit',
								fontSize: 12,
					        },
					        data: [{
					            value: data
					        }]
					    }]
				};
				// 使用刚指定的配置项和数据显示图表。
				zhxlChart.setOption(option);
			},
			//画开机率仪表盘
			drawKJL(data) {
				const dom = document.querySelector('#kjl');
				if(!kjlChart) {
					kjlChart = this.$echarts.init(dom);
				}
				const option = {
					 series: [{
						  radius: "85%",
					        type: 'gauge',
					        axisLine: {
					            lineStyle: {
					                width: 10,
					                color: [
					                    [0.3, '#67e0e3'],
					                    [0.7, '#37a2da'],
					                    [1, '#fd666d']
					                ]
					            }
					        },
					        pointer: {
					            itemStyle: {
					                color: 'auto'
					            }
					        },
					        axisTick: {
					            distance: -10,
					            length: 8,
					            lineStyle: {
					                color: '#fff',
					                width: 2
					            }
					        },
					        splitLine: {
					            distance: -10,
					            length: 10,
					            lineStyle: {
					                color: '#fff',
					                width: 4
					            }
					        },
					        axisLabel: {
					            color: 'inherit',
					            distance: 20,
					            fontSize: 8
					        },
					        detail: {
					            valueAnimation: true,
								 offsetCenter: [0, '95%'],
					             formatter: '开机率: {value}%',
					            color: 'inherit',
								fontSize: 12,
					        },
					        data: [{
					            value: data
					        }]
					    }]
				};
				// 使用刚指定的配置项和数据显示图表。
				kjlChart.setOption(option);
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
			//点击翻页按钮
			changPage(e) {
				this.nowCurrent = e.current;
				let min = (e.current - 1) * 16;
				let max = e.current * 16;
				this.showdataList = this.dataList.slice(min, max);
			},
			openPage(ele) {
				ele.LOGO = this.LOGO;
				ele.titleObj = this.titleObj;
				if(this.titleObj.FCOMPANY.indexOf('心里') == -1){
					uni.navigateTo({
					    // url: '/pages/index/main/zsy/jt/jt?item=' + encodeURIComponent(JSON.stringify(ele))
						url: '/pages/index/main/zsy/jt-one/jt-one?item=' + encodeURIComponent(JSON.stringify(ele))
					});
				}else{
					uni.navigateTo({
					    // url: '/pages/index/main/zsy/jt/jt?item=' + encodeURIComponent(JSON.stringify(ele))
						url: '/pages/index/main/zsy/jt-one/animate-one?item=' + encodeURIComponent(JSON.stringify(ele))
					});
				}
				
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
		background-image: url(../../../../../components/datav/img/bg.png);
		background-size: 100% 100%;
	}

	.addbg {
		background-image: url(../../../../../static/img/titleBG.jpg);
		background-size: 100% 100%;
	}

	.tableContent {
		width: 100%;
		height: 94%;
	}

	.tdContent {
		width: 100%;
	}

	.bottom-Content {
		height: 5%;
		width: 100%;
		position: absolute;
		bottom: 0;
	}

	.dele-padding {
		padding: 0;
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

	.tdSize {
		font-size: .3rem;
	}

	.yddiv {
		width: 100%;
		height: 88%;
	}

	.toastTitle {
		font-size: .3rem;
		width: 100%;
	}

	.titleDec {
		width: 150px;
		height: 50px;
	}

	.addpadding {
		padding: 0 .5%;
	}

	.deletepadding {
		padding: 0;
	}

	.shapeRed {
		background: linear-gradient(-135deg, transparent 20px, rgba(255, 212, 0, 0.8) 0, #C99A7A);
		/* margin: 0 .5%; */
	}

	.shapeGreen {
		background: linear-gradient(-135deg, transparent 20px, rgba(39, 185, 75, 0.75) 0, #116125);
		/* margin: 0 .5%; */
	}

	.shapeGray {
		background: linear-gradient(-135deg, transparent 20px, rgba(241, 241, 241, 0.5) 0, #999AA4);
		/* margin: 0 .5%; */

	}

	.Content-title {
		font-size: .25rem;
		color: #fff;
		font-weight: bold;
		padding: 0 1%;
		height: 100%;
		width: 100%;
		margin: 1% 0;
	}

	.Content-text {
		font-size: .2rem;
		color: #fff;
		padding: 0 1%;
		height: 100%;
		width: 100%;
		margin: .05% 0;
	}

	.delatepadding {
		padding: 0;
	}

	.list-label {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.setHeight {
		height: 21%;
		margin: .5% 0;
	}

	.statu-btn {
		padding: 5px 0px;
		line-height: 1.5;
		font-size: .19rem;
		text-align: center;
		border-radius: 10%;
	}

	.wrap-line {
		height: 93%;
		border: 1px solid #255ABE;
	}

	.charttitle {
		font-size: .18rem !important;
		color: #FFFFFF;
		overflow: hidden;
	}

	.ic-sb {
		width: 24px;
		height: 24px;
		vertical-align: sub;
	}

	/* 右侧设备概览样式 */
	.time-text {
		color: #85FAF6;
		font-size: .3rem;
	}

	.small-text {
		color: #85FAF6;
		font-size: .25rem;
	}

	.rate-content {
		background-color: #001D3A;
		border: 1px solid #00468C;
		height: 35%;
	}

	.produce-content {
		background-color: #001D3A;
		border: 1px solid #00468C;
		height: 20%;
	}

	.allrate-content {
		background-color: #001D3A;
		border: 1px solid #00468C;
		height: 30%;
	}

	/* .right-border::after{
		 content: "";
		  position: absolute;
		  height: 50%;
		  width: 1px;
		  background: #00468C;
		  right: 0;
		  top: 35%;
	} */
	/* 模拟淘宝实现中间小竖线 */
	.right-border {
		border-right: 1px solid #00468C;
		display: inline-block;
		margin-right: 0px;
		padding: 0px 0px 0px 3px;
	}

	.ybp-content {
		height: 75%;
	}

	@media screen and (max-width: 1300px) {
		.titleDec {
			width: 100px;
			height: 35px;
		}

		.ic-sb {
			width: 20px;
			height: 20px;
			vertical-align: sub;
		}
	}
</style>
