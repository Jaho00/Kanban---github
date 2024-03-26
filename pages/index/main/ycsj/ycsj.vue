<template>
	<view class="container-fluid setfull">
		<view class="row align-items-center" style="background-color: #000000;color: #ffffff;" v-if="isToastShow == 'noToast'">
			<view class="col row align-items-center align-self-center">
				<image :src="LOGO" mode="scaleToFill" style="width: 50px;height: 50px;margin-left: 5%;"></image>
				<!-- <dv-border-box-8 style="width:49%;height:50px;font-size: .2rem;margin-left: 25%;" v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</dv-border-box-8> -->
			</view>
			<view class="col-6 pageTitle row justify-content-center" style="font-size: .5rem;text-align: center;">
				<dv-decoration-8 class="titleDec" />
				<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
				<dv-decoration-8 :reverse="true" class="titleDec" />
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
		<view class="row tableContent tableHeight dele-padding" style="overflow: hidden;">
			<view class="col add-margin addbg">
				<view class="Content-box">
					<text class="line-name">异常时长</text>
					<text class="reason-text">168&nbsp;<span class="detail-text" style="margin-left:5px;">H</span> </text>
				</view>
			</view>
			<view class="col add-margin addbg">
				<view class="Content-box">
					<text class="line-name add-color">严重次数</text>
					<text class="reason-text">27</span> </text>
				</view>
			</view>
			<view class="col add-margin addbg">
				<view class="Content-box">
					<text class="line-name add-color">警告次数</text>
					<text class="reason-text add-color">24</text>
				</view>
			</view>
		</view>
		<view class="row mt-1 dele-padding second-height">
			<view class="col-4 dele-padding">
				<view class="row no-gutters allsize">
					<view class="col md-box add-margin addbg dele-padding">
						<view class="row no-gutters" style="background-color: rgba(160,59,28,0.9);padding: .1rem;">
							<text style="color: #FFFFFF;font-size: .25rem;">严重时长</text>
						</view>
						<view class="row no-gutters justify-content-center mt-1">
							<text class="reason-text add-color">24<span class="detail-text" style="margin-left:5px;">H</span> </text>
						</view>
					</view>
					<view class="col md-box add-margin addbg dele-padding">
						<view class="row no-gutters" style="background-color: rgba(167,146,24,0.9);padding: .1rem;">
							<text style="color: #FFFFFF;font-size: .25rem;">警告时长</text>
						</view>
						<view class="row no-gutters justify-content-center mt-1">
							<text class="reason-text add-color">68<span class="detail-text" style="margin-left:5px;">H</span> </text>
						</view>
					</view>
					<view class="col-12 addbg" style="height: 75%;">
						<view class="row no-gutters" style="padding: .1rem;">
							<text style="color: #FFFFFF;font-size: .25rem;">异常事件分析</text>
						</view>
						<canvas canvas-id="LDT" id="LDT" class="charts lddiv" style="width: 100%;height: 95%;"></canvas>
					</view>
				</view>
			</view>
			<view class="col-8">
				<view class="row no-gutters allsize">
					<view class="col md-chart add-margin addbg dele-padding">
						<view class="row no-gutters" style="padding: .1rem;">
							<text style="color: #FFFFFF;font-size: .25rem;">异常原因TOP10(时长)</text>
						</view>
						<view class="row no-gutters justify-content-center" style="height: 43%;">
							<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts yddiv allsize"></canvas>
						</view>
						<view class="row no-gutters justify-content-center" style="height: 43%;font-size: .18rem;color: #FFFFFF;">
							<table class="fsui-table text-sm">
								<colgroup>
									<col style="width:30%">
									<col style="width:55%">
									<col style="width:25%">
								</colgroup>
								<tbody>
									<tr>
										<td>11/15 14:14</td>
										<td>产线质量异常，缺口异常频发</td>
										<td class="text-danger">待处理</td>
									</tr>
									<tr>
										<td>11/16 18:36</td>
										<td>产线质量异常，缺口异常频发</td>
										<td class="text-warning">处理中</td>
									</tr>
									<tr>
										<td>11/16 08:13</td>
										<td>产线质量异常，缺口异常频发</td>
										<td class="text-warning">处理中</td>
									</tr>
									<tr>
										<td>11/18 21:55</td>
										<td>产线质量异常，缺口异常频发</td>
										<td class="text-danger">待处理</td>
									</tr>
									<tr>
										<td>11/20 15:13</td>
										<td>产线质量异常，缺口异常频发</td>
										<td class="text-danger">待处理</td>
									</tr>
								</tbody>
							</table>
						</view>
					</view>
					<view class="col md-chart add-margin addbg dele-padding">
						<view class="row no-gutters" style="padding: .1rem;">
							<text style="color: #FFFFFF;font-size: .25rem;">异常原因TOP10(次数)</text>
						</view>
						<view class="row no-gutters justify-content-center" style="height: 43%;">
							<canvas canvas-id="BF" id="BF" class="charts bfdiv allsize"></canvas>
						</view>
						<view class="row no-gutters justify-content-center" style="height: 43%;font-size: .18rem;color: #FFFFFF;">
							<table class="fsui-table text-sm">
								<colgroup>
									<col style="width:30%">
									<col style="width:55%">
									<col style="width:25%">
								</colgroup>
								<tbody>
									<tr>
										<td>11/15 14:14</td>
										<td>产线质量异常，缺口异常频发</td>
										<td class="text-danger">待处理</td>
									</tr>
									<tr>
										<td>11/16 18:36</td>
										<td>产线质量异常，缺口异常频发</td>
										<td class="text-warning">处理中</td>
									</tr>
									<tr>
										<td>11/16 08:13</td>
										<td>产线质量异常，缺口异常频发</td>
										<td class="text-warning">处理中</td>
									</tr>
									<tr>
										<td>11/18 21:55</td>
										<td>产线质量异常，缺口异常频发</td>
										<td class="text-danger">待处理</td>
									</tr>
									<tr>
										<td>11/20 15:13</td>
										<td>产线质量异常，缺口异常频发</td>
										<td class="text-danger">待处理</td>
									</tr>
								</tbody>
							</table>
						</view>
					</view>
					<view class="col-12 addbg" style="height: 30%;">
						<view class="row no-gutters" style="padding: .1rem;">
							<text style="color: #FFFFFF;font-size: .25rem;">10日异常时长/次数</text>
						</view>
						<canvas canvas-id="JD" id="JD" class="charts jddiv" style="width: 100%;height: 95%;"></canvas>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js'; //引入ucharts图表组件
	var _self = null;
	var getINFOtimer = null;
	var canvaLineA = null;
	var BF = null;
	var JD = null;
	var LDT = null;
	export default {
		data() {
			return {
				toastList: [], // 消息列表
				toastString: "", //消息字符串
				isToastShow: 'noToast',
				nowTime: "",
				nowDay: "",
				titleObj: {},
				LOGO: "",
				ydDIV: "",
				bfDIV: '',
				jdDIV: '',
				lddiv: "",
			}
		},
		onLoad(option) {
			_self = this;
			//获取设备信息
			const res = uni.getSystemInfoSync();
			this.sb = res.windowWidth;
			try {
				//从路径中获取看板标题等信息
				const item = JSON.parse(decodeURIComponent(option.ele));
				this.titleObj = item;
			} catch (e) {
				//TODO handle the exception
				//如果没有title信息，则不显示

			}

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
			// this.DayPZJKoption.data = this.DayPZJKoption.data.concat(this.DayPZJKoption.data.slice(0,10));
		},
		onHide() {
			clearInterval(getINFOtimer);
		},
		created() {
			getINFOtimer = setInterval(() => {

			}, (this.titleObj.FREFTIME * 1000 || 30000));
		},
		mounted() {
			var md = {
				"categories": ['外观不良', '漏气', '涂层不均', '尺寸不良', '披锋'],
				"series": [{
					"name": "上一批次",
					"data": [15, 20, 45, 37, 43],
					textColor: '#ffffff'
				}, {
					"name": "当前批次",
					"data": [30, 40, 25, 14, 34],
					textColor: '#ffffff'
				}]
			}
			this.drawmd("canvasLineA", md);
			//报废项目图表
			var bf = {
				"categories": ['严重变形', '次品', '残缺', '龟裂', '烧焊损坏'],
				"series": [{
					"name": "上一批次",
					"data": [25, 18, 23, 27, 43],
					textColor: '#ffffff'
				}, {
					"name": "当前批次",
					"data": [30, 35, 15, 16, 34],
					textColor: '#ffffff'
				}]
			}
			this.drawbf("BF", bf);
			//下方折线图
			var jd = {
				"categories": ['08', '12', '14', '16', '18', '20', '22'],
				"series": [{
					"name": "稼动力",
					"data": [120, 132, 101, 134, 90, 230, 210],
					textColor: '#ffffff'
				}, {
					"name": "UPH波动",
					"data": [220, 182, 191, 234, 290, 330, 310],
					textColor: '#ffffff'
				}]
			}
			this.drawjd("JD", jd);
			//雷达图
			var ld = {
				categories:  ['外观不良', '漏气', '涂层不均', '尺寸不良', '披锋'],
				series: [{
					name: '不良项',
					data: [90, 110, 165, 195, 187]
				}, {
					name: '报废项',
					data: [190, 210, 105, 35, 27]
				}]
			}
			this.drawld("LDT", ld);
		},
		methods: {
			drawmd(canvasId, chartData) {
				setTimeout(() => {
					let ydDIV = uni.createSelectorQuery().in(this).select(".yddiv");
					ydDIV.fields({
						size: true,
						scrollOffset: true
					}, data => {
						_self.ydDIV = {
							height: data.height,
							width: data.width
						};
						canvaLineA = new uCharts({
							$this: _self,
							canvasId: canvasId,
							type: 'column',
							legend: {
								show: true,
								fontColor: '#ffffff'
							},
							fontSize: 11,
							background: '#FFFFFF',
							pixelRatio: 1,
							animation: true,
							// rotate:true,// 用来控制横向或侧向
							categories: chartData.categories,
							series: chartData.series,
							colors: ['#3FB1E3', '#6BE6C1'],
							xAxis: {
								type: 'grid',
								gridColor: '#ffffff',
								gridType: 'dash',
								dashLength: 8,
								fontColor: '#ffffff',
								disableGrid: true,
							},
							yAxis: {
								gridType: 'solid',
								gridColor: '#cccccc',
								splitNumber: 5,
								data: [{
									fontColor: '#FFFFFF',
									disabled: false,
								}],
							},
							width: _self.ydDIV.width,
							height: _self.ydDIV.height,
							extra: {
								column: {
									type: 'group',
									width: 50, //每个柱子的宽度
									meter: {
										//这个是外层边框的宽度
										border: 4,
										//这个是内部填充颜色
										fillColor: '#E5FDC3'
									}
								}
							}
						});
					}).exec();
				}, 300);
			},
			drawbf(canvasId, chartData) {
				setTimeout(() => {
					let bfDIV = uni.createSelectorQuery().in(this).select(".bfdiv");
					bfDIV.fields({
						size: true,
						scrollOffset: true
					}, data => {
						_self.bfDIV = {
							height: data.height,
							width: data.width
						};
						BF = new uCharts({
							$this: _self,
							canvasId: canvasId,
							type: 'column',
							legend: {
								show: true,
								fontColor: '#ffffff'
							},
							fontSize: 11,
							background: '#FFFFFF',
							pixelRatio: 1,
							animation: true,
							// rotate:true,// 用来控制横向或侧向
							categories: chartData.categories,
							series: chartData.series,
							colors: ['#3FB1E3', '#6BE6C1'],
							xAxis: {
								type: 'grid',
								gridColor: '#ffffff',
								gridType: 'dash',
								dashLength: 8,
								fontColor: '#ffffff',
								disableGrid: true,
							},
							yAxis: {
								gridType: 'solid',
								gridColor: '#cccccc',
								splitNumber: 5,
								data: [{
									fontColor: '#FFFFFF',
									disabled: false,
								}],
							},
							width: _self.bfDIV.width,
							height: _self.bfDIV.height,
							extra: {
								column: {
									type: 'group',
									width: 50, //每个柱子的宽度
									meter: {
										//这个是外层边框的宽度
										border: 4,
										//这个是内部填充颜色
										fillColor: '#E5FDC3'
									}
								}
							}
						});
					}).exec();
				}, 300);
			},
			drawjd(canvasId, chartData) {
				setTimeout(() => {
					let jdDIV = uni.createSelectorQuery().in(this).select(".jddiv");
					jdDIV.fields({
						size: true,
						scrollOffset: true
					}, data => {
						_self.jdDIV = {
							height: data.height,
							width: data.width
						};
						BF = new uCharts({
							$this: _self,
							canvasId: canvasId,
							type: 'line',
							legend: {
								show: true,
								fontColor: '#ffffff'
							},
							fontSize: 11,
							background: '#FFFFFF',
							pixelRatio: 1,
							animation: true,
							dataLabel: false,
							dataPointShape: true,
							// rotate:true,// 用来控制横向或侧向
							categories: chartData.categories,
							series: chartData.series,
							colors: ['#3FB1E3', '#6BE6C1'],
							xAxis: {
								type: 'grid',
								gridColor: '#ffffff',
								gridType: 'dash',
								dashLength: 8,
								fontColor: '#ffffff',
								disableGrid: true,
							},
							yAxis: {
								gridType: 'solid',
								gridColor: '#cccccc',
								splitNumber: 5,
								data: [{
									fontColor: '#FFFFFF',
									disabled: false,
								}],
							},
							width: _self.jdDIV.width,
							height: _self.jdDIV.height,
							extra: {
								line: {
									type: 'straight'
								}
							}
						});
					}).exec();
				}, 300);
			},
			drawld(canvasId, chartData) {
				setTimeout(() => {
					let lddiv = uni.createSelectorQuery().in(this).select(".lddiv");
					lddiv.fields({
						size: true,
						scrollOffset: true
					}, data => {
						_self.lddiv = {
							height: data.height,
							width: data.width
						};
						LDT = new uCharts({
							$this: _self,
							canvasId: canvasId,
							type: 'radar',
							fontSize: 11,
							legend: {
								show: true,
								fontColor: '#ffffff'
							},
							background: '#FFFFFF',
							pixelRatio: _self.pixelRatio,
							animation: true,
							dataLabel: true,
							categories: chartData.categories,
							series: chartData.series,
							width: _self.lddiv.width,
							height: _self.lddiv.height,
							extra: {
								radar: {
									max: 200 ,//雷达数值的最大值
									labelColor: "#FFFFFF"
								}
							}
						});
					}).exec();
				}, 300);
			}
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
		overflow: hidden;
	}

	.dele-margin {
		margin: 0;
	}

	.add-margin {
		margin: 0 10px;
	}

	.dele-padding {
		padding: 0;
	}

	.titltTime {
		font-size: .2rem;
		text-align: right;
	}

	.charttitle {
		font-size: .3rem !important;
		color: #FFFFFF;
	}

	.tdSize {
		font-size: .3rem;
	}

	.toastTitle {
		font-size: .3rem;
		width: 100%;
	}

	.titleDec {
		width: 150px;
		height: 50px;
	}

	.Content-box {
		color: rgba(148, 206, 244, 0.8);
		text-align: center;
	}

	.line-name {
		font-size: .32rem;
		display: block;
		line-height: 1.2;
		padding: .2rem 0;
	}

	.reason-text {
		font-size: .42rem;
		display: block;
		color: #FFFFFF;
	}

	.detail-text {
		font-size: .19rem;
		color: rgba(148, 206, 244, 0.8);
	}

	.addbg {
		background: rgba(28, 78, 151, 0.2);
		;
	}

	.second-height {
		height: 80%;
		color: rgba(148, 206, 244, 0.8);
	}

	.allsize {
		width: 100%;
		height: 100%;
	}

	.md-box {
		height: 20%;
	}

	.md-chart {
		height: 60%;
	}

	.fsui-table {
		width: 100%;
		overflow: hidden;
	}

	.fsui-table.text-sm tbody td {
		padding: 0.06rem 0.03rem;
	}
</style>
