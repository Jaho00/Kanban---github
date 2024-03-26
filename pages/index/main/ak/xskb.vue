<template>
	<view class="container-fluid setfull no-gutters">
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
					<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
				</view>
				<view class="col titltTime row align-items-center">
					<u-notice-bar class="toastTitle" mode="horizontal" :volume-icon="false" :volume-size="20" :speed="25" :font-size="20"
					 :padding="0" type='none' :is-circular="true" :list="newtoaList" bg-color='#000000' color='#ffffff'></u-notice-bar>
				</view>
			</view>
			<!-- 内容区 -->
			<view class="row tableContent no-gutters" style="overflow: hidden;margin-top: .5%;padding: 0 0.5%;">
				<view class="row col-12 no-gutters first_content">
					<view class="col-3 add_border allsize" style="max-width: 21%!important;">
						<view class="row no-gutters">
							<text style="color: #ffffff;font-size: .15rem;">月接单统计</text>
						</view>
						<view class="down_charts">
							<!-- chart图表区域 -->
							<canvas canvas-id="ddtjColumn" id="ddtjColumn" style="width: 100%;height: 100%;" class="charts bottomDiv"></canvas>
						</view>
					</view>
					<view class="col allsize" style="max-width: 63.3%!important;">
						
						<view class="row no-gutters add_border" style="height: 100%;">
							<view class="row no-gutters">
								<text style="color: #ffffff;font-size: .15rem;">每日新增订单</text>
							</view>
							<view class="chart_content">
								<!-- chart图表区域 -->
								<canvas canvas-id="xzddColumn" id="xzddColumn" style="width: 100%;height: 100%;" class="charts upMiddleDiv"></canvas>
							</view>
						</view>
					</view>

					<view class="col-2 add_border allsize">
						<view class="chart_content">
							<canvas canvas-id="zzcqRing" style="width: 100%;height: 100%;" id="zzcqRing" class="charts zzcq"></canvas>
						</view>
						<view class="row no-gutters justify-content-center">
							<text style="color: #FFFFFF;font-size: .15rem;">本月合格率</text>
						</view>
					</view>
				</view>
				<view class="row col-12 no-gutters second_content justify-content-around">
					<view class="col-10" style="width: 100%;height: 50%;">
						<view class="row no-gutters allsize">
							<view class="col addpadding allsize">
								<view class="add_border allsize">
									<view class="row no-gutters">
										<text style="color: #ffffff;font-size: .15rem;">今日入库</text>
									</view>
									<view class="chart_content">
										<!-- <canvas canvas-id="jrrkPie" style="width: 100%;height: 100%;" id="jrrkPie" class="charts upAroundDiv"></canvas> -->
										<view class="allsize" id="jrrkPie">
											<u-empty text="暂无数据" mode="data" :icon-size="40" :font-size="14" v-show="isjrrkshow"></u-empty>
										</view>
									</view>
								</view>
							</view>
							<view class="col addpadding allsize">
								<view class="allsize add_border">
									<view class="row no-gutters">
										<text style="color: #ffffff;font-size: .15rem;">月度入库</text>
									</view>
									<view class="down_charts">
										<!-- chart图表区域 -->
										<canvas canvas-id="bzrkColumn" id="bzrkColumn" style="width: 100%;height: 100%;" class="charts upAroundDiv"></canvas>
									</view>
								</view>
							</view>
							<view class="col addpadding allsize">
								<view class="allsize add_border">
									<view class="row no-gutters">
										<text style="color: #ffffff;font-size: .15rem;">今日出库</text>
									</view>
									<view class="down_charts">
										<!-- <canvas canvas-id="xsckColumn" id="xsckColumn" style="width: 100%;height: 100%;" class="charts"></canvas> -->
										<view class="allsize" id="xsckColumn">
											<u-empty text="暂无数据" mode="data" :icon-size="40" :font-size="14" v-show="isjrckshow"></u-empty>
										</view>
									</view>
								</view>
							</view>
							<view class="col addpadding allsize">
								<view class="allsize add_border">
									<view class="row no-gutters">
										<text style="color: #ffffff;font-size: .15rem;">月度出库</text>
									</view>
									<view class="down_charts">
										<!-- chart图表区域 -->
										<canvas canvas-id="hgdcColumn" id="hgdcColumn" style="width: 100%;height: 100%;" class="charts"></canvas>
									</view>
								</view>
							</view>
						</view>
						<view class="row no-gutters" style="width: 100%;height: 95%;">
							<view class="row no-gutters">
								<text style="color: #ffffff;font-size: .15rem;">订单进度</text>
							</view>
							<view style="width: 100%; height: 88%; overflow: hidden;">
								<!-- 重点明细表格区域 -->
								<u-table style="width: 100%;" bg-color="transparent" color="#FFFFFF" border-color="#052D84" :th-style="thStyle">
									<u-tr>
										<u-th width="10%" class="charttitle">
											订单号
										</u-th>
										<u-th width="10%" class="charttitle">
											品名
										</u-th>
										<u-th width="15%" class="charttitle">
											图号
										</u-th>
										<u-th class="charttitle">
											订单数量
										</u-th>
										<u-th class="charttitle">
											合格率
										</u-th>
										<u-th class="charttitle">
											任务完成率
										</u-th>
										<u-th width="25%" class="charttitle">
											进度
										</u-th>
										<u-th class="charttitle">
											交期
										</u-th>
									</u-tr>
								</u-table>
								<view style="width: 100%; height: 85%; overflow: hidden;">
									<view style="width: 100%; height: 100%;" :animation="GDanimate">
										<u-table class="scrollList tableHeight" style="width: 100%;" bg-color="transparent" color="#FFFFFF"
										 border-color="#052D84">
											<u-tr v-for="(item,index) in zdcp" :key="item.FCO" class="GdTrHeight">
												<u-td width="10%" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size: .1rem;padding: 0;">
													{{ item.FCO }}
												</u-td>
												<u-td width="10%" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size: .1rem; padding: 0;">
													{{ item.PRD_NAME }}
												</u-td>
												<u-td width="15%" class="charttitle" style="padding: 0;">
													{{ item.FDRAWINGNO }}
												</u-td>
												<u-td class="charttitle over_text" style="padding: 0;">
													{{ item.FORDER_QTY }}
												</u-td>
												<u-td class="charttitle over_text" style="padding: 0;">
													{{ item.ONCERATE + '%' }}
												</u-td>
												<u-td class="charttitle over_text" style="padding: 0;">
													{{ item.COMPRATE + '%'}}
												</u-td>
												<u-td width="25%" class="charttitle over_text" style="text-align: left;display: block;padding: 0;">
													<text style="text-align: left;display: block;padding: 0;"> {{ item.FSTADESC }} </text>
													<u-line-progress :percent="item.precent" :show-percent="false"></u-line-progress>
												</u-td>
												<u-td class="charttitle over_text" style="padding: 0;">
													{{ item.FDELIVERY_DATE }}
												</u-td>
											</u-tr>
										</u-table>
									</view>
								</view>
							</view>

						</view>
					</view>
					<view class="col-2" style="height: 99%;width: 100%;">
						<view class="row no-gutters" style="height: 100%;">
							<view class="col-12" style="height: 50%;">
								<view class="allsize add_border">
									<view class="row no-gutters">
										<text style="color: #ffffff;font-size: .15rem;">月不良统计</text>
									</view>
									<view class="down_charts">
										<!-- <canvas canvas-id="bltjColumn" id="bltjColumn" style="width: 100%;height: 100%;" class="charts bltjDiv"></canvas> -->
										<view style="height: 100%;width: 100%;" id="bltjColumn">
											<u-empty text="暂无数据" mode="data" :icon-size="40" :font-size="14" v-show="isyblshow"></u-empty>
										</view>
									</view>
								</view>
							</view>
							<view class="col-12" style="height: 48%;">
								<view class="allsize add_border">
									<view class="allsize">
										<view class="row no-gutters">
											<text style="color: #ffffff;font-size: .15rem;">月报废统计</text>
										</view>
										<view class="down_charts">
											<!-- <canvas canvas-id="bftjColumn" id="bftjColumn" style="width: 100%;height: 100%;" class="charts bftjDiv"></canvas> -->
											<view style="height: 100%;width: 100%;" id="bftjColumn">
												<u-empty text="暂无数据" mode="data" :icon-size="40" :font-size="14" v-show="isybfshow"></u-empty>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</dv-full-screen-container>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js'; //引入ucharts图表组件
	var _self = null;
	var timer = null; //创建一个定时器
	var GDtimer = null; //工单滚动定时器
	var getINFOtimer = null;
	var jrrkPie = null; //今日入库canvas对象
	var zzcqRing = null; //在制超期率canvas对象
	var xzddColumn = null; //每日新增订单canvas对象
	var TDColumn = null; //td图表canvas对象
	var ddtjColumn = null; //订单统计canvas对象
	var bzrkColumn = null; //包装入库canvas对象
	var xsckColumn = null; //销售出库canvas对象
	var hgdcColumn = null; //合格达成canvas对象
	var bftjColumn = null; //月报废统计
	var bltjColumn = null; //月不良统计
	export default {
		data() {
			return {
				thStyle: {
					'backgroundColor': 'transparent',
					color: "#ffffff",
					fontSize: '24px'
				},
				titleObj: {},
				LOGO: "",
				nowTime: "",
				nowDay: "",
				toastList: [], // 消息列表
				toastString: "", //消息字符串
				isToastShow: 'noToast',
				chartFontSize: "",
				upAroundDiv: {}, //上方左右charts宽高
				upMiddleDiv: {}, //上方中间charts宽高
				downDiv: {}, //中间小方块charts宽高
				bottomDiv: {}, //下方小方块charts宽高
				bftjDiv: {}, //报废统计大小
				bltjDiv: {}, //不良统计大小
				zzcq: {}, //合格率
				scjy: {}, //生产经营数据
				jrrk: [], //今日入库
				zdcp: [], //重点产品数组
				gxhz: [], //今日工序报工汇总
				GDanimate: {}, //	工单的动画对象
				GDanimation: null, //	工单的动画
				gdTop: 0,
				count: 0,
				isjrrkshow: false,
				isjrckshow: false,
				isyblshow: false,
				isybfshow: false,
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
			timer = setInterval(() => {
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
			this.getToast();
			this.getInfo();
		},
		onShow() {
			getINFOtimer = setInterval(() => {
				this.getInfo();
			}, (this.titleObj.FREFTIME * 1000 || 30000));
			clearInterval(GDtimer);
			GDtimer = setInterval(function() {
				this.scrollGD();
			}.bind(this), 5000);
		},
		onHide() {
			clearInterval(timer);
			clearInterval(getINFOtimer);
			clearInterval(GDtimer);
		},
		methods: {
			scrollGD() {
				setTimeout(() => {
					console.log('高度', _self.gdTop);
					
					if (_self.zdcp.length > 6) {
						this.count++;
						if (this.count == _self.zdcp.length - 6) {
							_self.gdTop = 0;
							this.count = 0;
							_self.setGDAnimation(_self.gdTop, 0);
						} else {
							_self.gdTop = _self.gdTop - _self.GdTrHeight;
							_self.setGDAnimation(_self.gdTop, 1000);
						}
					} else {
						return;
					}
				}, 3000);



			},
			//工单列表运动函数
			setGDAnimation(detaY, time) {
				const animation = uni.createAnimation({
					duration: time,
					timingFunction: 'linear',
				})
				this.GDanimation = animation
				_self.GDanimation.translateY(detaY).step();
				_self.GDanimate = _self.GDanimation.export();
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
			getInfo() {
				uni.request({
					url: this.basePath + '/APP/kanban!SalseForFhzl.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.scjy = res.data.Data[0].detail[0]; // 生产经营数据

							this.zdcp = res.data.Data[4].detail; //重点产品明细

							_self.showRing("zzcqRing", this.scjy.ONCERATE); //渲染在制超期率饼图
							_self.showXZDD("xzddColumn", res.data.Data[2].detail); //渲染每日新增订单柱状图
							_self.showDDTJ("ddtjColumn", res.data.Data[6].detail); //渲染订单统计柱状图
							_self.showBLTJ("bltjColumn", res.data.Data[10].detail); //渲染不良统计柱状图
							_self.showBFTJ("bftjColumn", res.data.Data[11].detail); //渲染报废统计柱状图

							//数据处理
							this.zdcp.forEach((item, index) => {
								let tempArr = item.FSTADESC.split('->');
								item.precent = tempArr.length * 20;
							});
							setTimeout(() => {
								if (this.zdcp.length > 0) {
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
								} else {
									let gdItem = 0;
									let tableHeight = 0;
								}
							}, 300);
						}
					},
				});
				//获取当天入库数据
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
						this.jrrk = res.data.Data; //今日入库数据
						_self.showJRRK("jrrkPie", this.jrrk); //渲染今日入库饼图
					},
				});
				//获取当天出库数据
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
						_self.showXSCK("xsckColumn", res.data.Data); //当天出库数据

					},
				});
				//获取月入库数据
				uni.request({
					url: this.basePath + '/APP/kanban!monthlyBein.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						_self.showBZRK("bzrkColumn", res.data.Data); //月入库数据柱状图
						//获取月出库数据
						uni.request({
							url: this.basePath + '/APP/kanban!monthlyBeout.action',
							data: {
								zhid: uni.getStorageSync('UserInfo').ZHID,
							},
							method: 'POST',
							header: {
								'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
							},
							success: (res) => {
								_self.showHGDC("hgdcColumn", res.data.Data); //月出库数据柱状图
							},
						});
					},
				});
				
			},
			//渲染今日入库饼图
			showJRRK(dom, chartData) {
				//处理数据
				let xAxis = []; //横坐标数组
				let yAxis = []; //纵坐标数组
				let barChart = this.$echarts.init(document.getElementById(dom));
				if (chartData == null) {
					// this.isjrrkshow = true;
					// return;
					barChart.showLoading({
						text: '暂无数据...',
						color: '#c23531',
						effect: "ring", //可选为：'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'
						textColor: '#ffffff',
						maskColor: 'rgba(255, 255, 255, 0)',
						zlevel: 0
					});
				} else {
					this.isjrrkshow = false;
					barChart.hideLoading();
					chartData.forEach((ele, index) => {
						if (index < 6) {
							//图表内只显示6个数据
							xAxis.push(ele.PRD_NAME.slice(0, 4));
							yAxis.push(ele.TRAN_QTY);
						}
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
							axisLabel: {
								formatter: '{value}',
								textStyle: {
									color: '#fff'
								}
							}
						},
						yAxis: {
							type: 'category',
							data: xAxis,
							axisLabel: {
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
							barWidth: 10, //柱图宽度
							itemStyle: {
								normal: {
									label: {
										show: true, //开启显示
										position: 'right', //在右侧显示
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
				}

			},
			//渲染在制超期率饼图
			showRing(canvasId, chartData) {
				let Ring = {
					series: [{
						"name": "",
						"data": Number(chartData) / 100
					}],
					"categories": [{
						"value": 0.2,
						"color": "#1890ff"
					}, {
						"value": 0.8,
						"color": "#2fc25b"
					}, {
						"value": 1,
						"color": "#f04864"
					}],
				};

				setTimeout(() => {
					let zzcq = uni.createSelectorQuery().in(this).select(".zzcq");
					zzcq.fields({
						size: true,
						scrollOffset: true
					}, data => {
						this.zzcq = {
							height: data.height,
							width: data.width
						};
						const currentWidth = screen.width;
						if (currentWidth >= 1920) {
							this.RingSize = 40;
						} else if (currentWidth >= 1280) {
							this.RingSize = 20;
						}
						zzcqRing = new uCharts({
							$this: _self,
							canvasId: canvasId,
							type: 'gauge',
							fontSize: 11,
							legend: false,
							title: {
								name: Math.round(Ring.series[0].data * 100) + '%',
								color: Ring.categories[1].color,
								fontSize: 25,
								offsetY: 50,
							},
							subtitle: {
								name: Ring.series[0].name,
								color: '#ffffff',
								fontSize: 15,
								offsetY: -50,
							},
							extra: {
								gauge: {
									type: 'default',
									width: 15, //仪表盘背景的宽度
									labelColor: '#ffffff', //刻度文字颜色
									startAngle: 0.75,
									endAngle: 0.25,
									startNumber: 0,
									endNumber: 100,
									splitLine: {
										fixRadius: 0,
										splitNumber: 10,
										width: 15, //仪表盘背景的宽度
										color: '#FFFFFF',
										childNumber: 5,
										childWidth: 4, //仪表盘背景的宽度
									},
									pointer: {
										width: 8, //指针宽度
										color: 'auto'
									}
								}
							},
							background: '#FFFFFF',
							pixelRatio: 1,
							categories: Ring.categories,
							series: Ring.series,
							animation: true,
							width: _self.zzcq.width,
							height: _self.zzcq.height,
							dataLabel: true,
						});
					}).exec();
				}, 300);
			},
			//渲染每日新增订单柱状图
			showXZDD(canvasId, chartData) {
				let Column = {
					series: [{
						name: '新增订单数量',
						data: [],
						textColor: '#ffffff'
					}], //纵坐标  tips:柱子数字颜色也在这设置
					categories: [], //横坐标
				};
				chartData.forEach((ele, index) => {
					Column.series[0].data.push(
						ele.FORDER_QTY,
					);
					Column.categories.push(
						ele.FDAY
					);
				});
				setTimeout(() => {
					let upMiddleDiv = uni.createSelectorQuery().in(this).select(".upMiddleDiv");
					upMiddleDiv.fields({
						size: true,
						scrollOffset: true
					}, data => {
						this.upMiddleDiv = {
							height: data.height,
							width: data.width
						};
						xzddColumn = new uCharts({
							$this: _self,
							canvasId: canvasId,
							type: 'column',
							legend: {
								show: false,
								fontColor: '#ffffff'
							},
							fontSize: 11,
							background: '#FFFFFF',
							pixelRatio: 1,
							animation: true,
							categories: Column.categories,
							series: Column.series,
							xAxis: {
								type: 'grid',
								gridColor: '#ffffff',
								gridType: 'dash',
								dashLength: 8,
								fontColor: '#ffffff',
								disableGrid: true
							},
							yAxis: {
								gridType: 'solid',
								gridColor: '#cccccc',
								splitNumber: 5,
								data: [{
									fontColor: '#FFFFFF',
									disabled: false,
									format: (val) => {
										return val.toFixed(0) + '件'
									}
								}],

							},
							dataLabel: true,
							width: _self.upMiddleDiv.width,
							height: _self.upMiddleDiv.height,
							extra: {
								column: {
									type: 'group',
									width: _self.upMiddleDiv.width * 0.65 / Column.categories.length
								}
							}
						});
					}).exec();
				}, 300);
			},
			//渲染TD柱状图
			showTD(canvasId, chartData) {
				let Column = {
					series: [{
						name: 'TD',
						data: [],
						textColor: '#ffffff'
					}], //纵坐标  tips:柱子数字颜色也在这设置
					categories: [], //横坐标
				};
				chartData.forEach((ele, index) => {
					Column.series[0].data.push(
						ele.OTD,
					);
					Column.categories.push(
						ele.FMONTH + '月'
					);
				});
				setTimeout(() => {
					let downDiv = uni.createSelectorQuery().in(this).select(".downDiv");
					downDiv.fields({
						size: true,
						scrollOffset: true
					}, data => {
						this.downDiv = {
							height: data.height,
							width: data.width
						};
						TDColumn = new uCharts({
							$this: _self,
							canvasId: canvasId,
							type: 'line',
							fontSize: 11,
							legend: {
								show: false,
								fontColor: '#ffffff'
							},
							dataLabel: false,
							dataPointShape: true,
							background: '#FFFFFF',
							pixelRatio: 1,
							animation: true,
							categories: Column.categories,
							series: Column.series,
							xAxis: {
								type: 'grid',
								gridColor: '#ffffff',
								gridType: 'dash',
								dashLength: 8,
								fontColor: '#ffffff',
								disableGrid: true,
								fontSize: 8,
							},
							yAxis: {
								title: '准时完成率',
								gridType: 'solid',
								gridColor: '#cccccc',
								splitNumber: 5,
								data: [{
									fontColor: '#FFFFFF',
									disabled: false,
									format: (val) => {
										return val.toFixed(0) + '%'
									},
									fontSize: 9,
								}],

							},
							dataLabel: false,
							width: _self.downDiv.width,
							height: _self.downDiv.height,
							extra: {
								line: {
									type: 'straight'
								}
							}
						});
					}).exec();
				}, 300);
			},
			//渲染订单统计柱状图
			showDDTJ(canvasId, chartData) {
				let Column = {
					series: [{
						name: '订单统计',
						data: [],
						textColor: '#ffffff'
					}], //纵坐标  tips:柱子数字颜色也在这设置
					categories: [], //横坐标
				};
				chartData.forEach((ele, index) => {
					Column.series[0].data.push({
						value: ele.FQTY,
						color: '#4fcb90'
					});
					Column.categories.push(
						ele.FMONTH + '月'
					);
				});
				setTimeout(() => {
					let bottomDiv = uni.createSelectorQuery().in(this).select(".bottomDiv");
					bottomDiv.fields({
						size: true,
						scrollOffset: true
					}, data => {
						this.bottomDiv = {
							height: data.height,
							width: data.width
						};
						ddtjColumn = new uCharts({
							$this: _self,
							canvasId: canvasId,
							type: 'column',
							legend: {
								show: false,
								fontColor: '#ffffff'
							},
							fontSize: 11,
							background: '#FFFFFF',
							pixelRatio: 1,
							animation: true,
							categories: Column.categories,
							series: Column.series,
							xAxis: {
								type: 'grid',
								gridColor: '#ffffff',
								gridType: 'dash',
								dashLength: 8,
								fontColor: '#ffffff',
								disableGrid: true,
								fontSize: 6,
							},
							yAxis: {
								gridType: 'solid',
								gridColor: '#cccccc',
								splitNumber: 5,
								data: [{
									fontColor: '#FFFFFF',
									disabled: false,
									format: (val) => {
										return val.toFixed(0) + '件'
									},
									fontSize: 9,
								}],

							},
							dataLabel: false,
							width: _self.bottomDiv.width,
							height: _self.bottomDiv.height,
							extra: {
								line: {
									type: 'straight'
								}
							}
						});
					}).exec();
				}, 300);
			},
			//渲染不良统计柱状图
			showBLTJ(canvasId, chartData) {
				


				let data = [],
					lengedData = [];
				let barChart = this.$echarts.init(document.getElementById(canvasId));

				// chartData = [
				// 	{
				// 		FBADITEM_CODE: "B06",
				// 		FBADITEM_NAME: "气孔、缩松、冷隔",
				// 		FQTY: 2
				// 	},
				// 	{
				// 		FBADITEM_CODE: "B06",
				// 		FBADITEM_NAME: "气孔、缩",
				// 		FQTY: 2
				// 	},
				// ]
				if (chartData == null || chartData.length == 0) {
					// this.isyblshow = true;
					// return;

					barChart.showLoading({
						text: '暂无数据...',
						color: '#c23531',
						textColor: '#ffffff',
						maskColor: 'rgba(255, 255, 255, 0)',
						zlevel: 0
					});

				} else {
					barChart.hideLoading();
					this.isyblshow = false;
					chartData.forEach((ele, index) => {
						lengedData.push(`${ele.FBADITEM_NAME}:${ele.FQTY}件`);
						data.push({
							name: `${ele.FBADITEM_NAME}:${ele.FQTY}件`,
							value: ele.FQTY
						})
					});

					let option = {
						legend: {
							icon: "circle",
							orient: 'horizontal',
							x: '0%', //图例距离左的距离
							y: '70%', //图例上下居中
							data: lengedData,
							textStyle: {
								color: "#ffffff"
							}
						},
						series: [{
							name: '不良统计',
							type: 'pie',
							radius: '70%',
							center: ['50%', '35%'],
							data: data,
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							},
							label: {
								show: true,
								position: 'inside',
								formatter: `{d}%`,
							},
						}]
					};
					barChart.setOption(option);
				}
			},
			//渲染报废统计柱状图
			showBFTJ(canvasId, chartData) {
				

				let barChart = this.$echarts.init(document.getElementById(canvasId));
				if (chartData == null || chartData.length == 0) {
					// this.isybfshow = true;
					// return;
					barChart.showLoading({
						text: '暂无数据...',
						color: '#c23531',
						effect: "ring", //可选为：'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'
						textColor: '#ffffff',
						maskColor: 'rgba(255, 255, 255, 0)',
						zlevel: 0
					});
				} else {
					let data = [],
						lengedData = [];
					this.isybfshow = false;
					barChart.hideLoading();
					chartData.forEach((ele, index) => {
						lengedData.push(`${ele.FSCRAP_NAME}:${ele.FQTY}件`);
						data.push({
							name: `${ele.FSCRAP_NAME}:${ele.FQTY}件`,
							value: ele.FQTY
						})
					});

					let option = {
						legend: {
							icon: "circle",
							orient: 'horizontal',
							x: '30%', //图例距离左的距离
							y: 'bottom', //图例上下居中
							data: lengedData,
							textStyle: {
								color: "#ffffff"
							}
						},
						series: [{
							name: '不良统计',
							type: 'pie',
							radius: '70%',
							center: ['50%', '35%'],
							data: data,
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							},
							itemStyle: {
								normal: {
									label: {
										show: false //隐藏标示文字
									},
									labelLine: {
										show: false //隐藏标示线
									}
								}
							}
						}]
					};
					barChart.setOption(option);
				}
			},
			//渲染包装入库柱状图
			showBZRK(canvasId, chartData) {
				let Column = {
					series: [{
						name: '包装入库',
						data: [],
						textColor: '#ffffff'
					}], //纵坐标  tips:柱子数字颜色也在这设置
					categories: [], //横坐标
				};
				chartData.forEach((ele, index) => {
					Column.series[0].data.push({
						value: ele.TRAN_QTY,
						color: '#830082'
					});
					Column.categories.push(
						ele.FMONTH + '月'
					);
				});
				setTimeout(() => {
					let upAroundDiv = uni.createSelectorQuery().in(this).select(".upAroundDiv");
					upAroundDiv.fields({
						size: true,
						scrollOffset: true
					}, data => {
						this.upAroundDiv = {
							height: data.height,
							width: data.width
						};
						bzrkColumn = new uCharts({
							$this: _self,
							canvasId: canvasId,
							type: 'column',
							legend: {
								show: false,
								fontColor: '#ffffff'
							},
							fontSize: 11,
							background: '#FFFFFF',
							pixelRatio: 1,
							animation: true,
							categories: Column.categories,
							series: Column.series,
							xAxis: {
								type: 'grid',
								gridColor: '#ffffff',
								gridType: 'dash',
								dashLength: 8,
								fontColor: '#ffffff',
								disableGrid: true,
								fontSize: 6,
							},
							yAxis: {
								gridType: 'solid',
								gridColor: '#cccccc',
								splitNumber: 5,
								data: [{
									fontColor: '#FFFFFF',
									disabled: false,
									format: (val) => {
										return val.toFixed(0) + '件'
									},
									fontSize: 9,
								}],

							},
							dataLabel: false,
							width: _self.upAroundDiv.width,
							height: _self.upAroundDiv.height,
							extra: {
								line: {
									type: 'straight'
								}
							}
						});
					}).exec();
				}, 300);
			},
			//今日出库饼图
			showXSCK(canvasId, chartData) {
				//处理数据
				let xAxis = []; //横坐标数组
				let yAxis = []; //纵坐标数组
				let barChart = this.$echarts.init(document.getElementById(canvasId));
				if (chartData == null) {
					// this.isjrckshow = true;
					// return;
					barChart.showLoading({
						text: '暂无数据...',
						color: '#c23531',
						effect: "ring", //可选为：'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'
						textColor: '#ffffff',
						maskColor: 'rgba(255, 255, 255, 0)',
						zlevel: 0
					});
				} else {
					this.isjrckshow = false;
					barChart.hideLoading();
					chartData.forEach((ele, index) => {
						if (index < 6) {
							//图表内只显示6个数据
							xAxis.push(ele.PRD_NAME.slice(0, 4));
							yAxis.push(ele.TRAN_QTY);
						}
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
							axisLabel: {
								formatter: '{value}',
								textStyle: {
									color: '#fff'
								}
							}
						},
						yAxis: {
							type: 'category',
							data: xAxis,
							axisLabel: {
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
							barWidth: 10, //柱图宽度
							itemStyle: {
								normal: {
									label: {
										show: true, //开启显示
										position: 'right', //在右侧显示
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
				}

			},
			//渲染生产报废柱状图
			showHGDC(canvasId, chartData) {
				let Column = {
					series: [{
						name: '月度出库',
						data: [],
						textColor: '#ffffff'
					}], //纵坐标  tips:柱子数字颜色也在这设置
					categories: [], //横坐标
				};
				chartData.forEach((ele, index) => {
					Column.series[0].data.push({
						value: ele.TRAN_QTY,
						color: '#7eff00'
					});
					Column.categories.push(
						ele.FMONTH + '月'
					);
				});
				setTimeout(() => {
					hgdcColumn = new uCharts({
						$this: _self,
						canvasId: canvasId,
						type: 'column',
						legend: {
							show: false,
							fontColor: '#ffffff'
						},
						fontSize: 11,
						background: '#FFFFFF',
						pixelRatio: 1,
						animation: true,
						categories: Column.categories,
						series: Column.series,
						xAxis: {
							type: 'grid',
							gridColor: '#ffffff',
							gridType: 'dash',
							dashLength: 8,
							fontColor: '#ffffff',
							disableGrid: true,
							fontSize: 6,
						},
						yAxis: {
							gridType: 'solid',
							gridColor: '#cccccc',
							splitNumber: 5,
							data: [{
								fontColor: '#FFFFFF',
								disabled: false,
								format: (val) => {
									return val.toFixed(0) + '件'
								},
								fontSize: 9,
							}],

						},
						dataLabel: false,
						width: _self.upAroundDiv.width,
						height: _self.upAroundDiv.height,
						extra: {
							line: {
								type: 'straight'
							}
						}
					});
				}, 300);
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

	.deletepadding {
		padding: 0;
	}

	.first_content {
		height: 30%;
	}

	.second_content {
		height: 63%;
	}

	.color_text {
		font-size: .5rem;
		text-align: center;
	}

	.type_text {
		font-size: .15rem;
		text-align: center;
	}

	.add_border {
		border: 1px solid #2A82E4;
	}

	.allsize {
		width: 100%;
		height: 100%;
	}

	.addpadding {
		padding-right: .5%;
	}

	.type_box {
		color: #526496;
		height: 40%;
	}

	.chart_content {
		width: 100%;
		height: 85%;
	}

	.down_charts {
		width: 100%;
		height: 88%;
		overflow: scroll;
	}

	.charttitle {
		font-size: .1rem !important;
		color: #FFFFFF;
		overflow: hidden;
	}

	.tdSize {
		font-size: .3rem;
	}

	.GdTrHeight {
		height: 26px;
	}

	.scrollList {
		overflow: scroll;
	}
</style>
